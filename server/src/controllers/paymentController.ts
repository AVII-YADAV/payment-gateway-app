import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth';
import { sendEmail } from '../services/emailService';
import { createAuditLog } from '../services/auditService';
import { PaymentMethod, TransactionStatus, RefundStatus } from '@prisma/client';

export const paymentController = {
  // Create a new payment
  async createPayment(req: AuthRequest, res: Response) {
    try {
      const { amount, currency = 'INR', customerDetails, description, metadata } = req.body;
      const merchantId = req.user!.merchantId!;

      // Validate merchant limits
      const merchant = await prisma.merchant.findUnique({
        where: { id: merchantId }
      });

      if (!merchant || !merchant.isActive) {
        return res.status(403).json({
          success: false,
          error: {
            message: 'Merchant account is inactive'
          }
        });
      }

      if (amount < merchant.minAmount || amount > merchant.maxAmount) {
        return res.status(400).json({
          success: false,
          error: {
            message: `Amount must be between ₹${merchant.minAmount} and ₹${merchant.maxAmount}`
          }
        });
      }

      // Check daily limit
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const todayTransactions = await prisma.transaction.aggregate({
        where: {
          merchantId,
          createdAt: {
            gte: today,
            lt: tomorrow
          },
          status: 'COMPLETED'
        },
        _sum: {
          amount: true
        }
      });

      const todayTotal = todayTransactions._sum.amount || 0;
      if (todayTotal + amount > merchant.dailyLimit) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Daily transaction limit exceeded'
          }
        });
      }

      // Generate order ID
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Calculate fees
      const commission = (amount * merchant.commissionRate) / 100;
      const netAmount = amount - commission;

      // Create transaction
      const transaction = await prisma.transaction.create({
        data: {
          merchantId,
          orderId,
          amount,
          currency,
          status: 'PENDING',
          paymentMethod: 'UPI', // Default, will be updated during processing
          paymentDetails: {},
          customerDetails,
          metadata,
          fees: commission,
          commission,
          netAmount
        }
      });

      // Create audit log
      await createAuditLog({
        userId: req.user!.id,
        action: 'PAYMENT_CREATED',
        resource: 'Transaction',
        resourceId: transaction.id,
        details: { orderId, amount, currency }
      });

      res.status(201).json({
        success: true,
        data: {
          transaction: {
            id: transaction.id,
            orderId: transaction.orderId,
            amount: transaction.amount,
            currency: transaction.currency,
            status: transaction.status,
            customerDetails: transaction.customerDetails,
            createdAt: transaction.createdAt
          },
          paymentUrl: `${process.env.CLIENT_URL}/pay/${transaction.orderId}`
        },
        message: 'Payment created successfully'
      });
    } catch (error) {
      console.error('Create payment error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Internal server error'
        }
      });
    }
  },

  // Process payment
  async processPayment(req: Request, res: Response) {
    try {
      const { orderId, paymentMethod, paymentDetails } = req.body;

      // Find transaction
      const transaction = await prisma.transaction.findUnique({
        where: { orderId },
        include: {
          merchant: {
            include: {
              user: true
            }
          }
        }
      });

      if (!transaction) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Transaction not found'
          }
        });
      }

      if (transaction.status !== 'PENDING') {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Transaction is not in pending status'
          }
        });
      }

      // Update transaction status to processing
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: 'PROCESSING',
          paymentMethod: paymentMethod as PaymentMethod,
          paymentDetails
        }
      });

      // Simulate payment processing (in real implementation, this would integrate with actual payment gateways)
      const isSuccess = Math.random() > 0.1; // 90% success rate for demo

      let finalStatus: TransactionStatus;
      let failureReason: string | null = null;
      let processedAt: Date | null = null;
      let completedAt: Date | null = null;
      let failedAt: Date | null = null;

      if (isSuccess) {
        finalStatus = 'COMPLETED';
        processedAt = new Date();
        completedAt = new Date();
      } else {
        finalStatus = 'FAILED';
        failureReason = 'Payment gateway error';
        failedAt = new Date();
      }

      // Update transaction with final status
      const updatedTransaction = await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: finalStatus,
          failureReason,
          processedAt,
          completedAt,
          failedAt,
          gatewayResponse: {
            success: isSuccess,
            transactionId: isSuccess ? `TXN_${Date.now()}` : null,
            responseCode: isSuccess ? 'SUCCESS' : 'FAILED',
            responseMessage: isSuccess ? 'Transaction successful' : failureReason
          }
        }
      });

      // Update merchant stats if successful
      if (isSuccess) {
        await prisma.merchant.update({
          where: { id: transaction.merchantId },
          data: {
            totalProcessed: {
              increment: transaction.amount
            },
            totalFees: {
              increment: transaction.fees
            }
          }
        });
      }

      // Send email notifications
      const customerEmail = (transaction.customerDetails as any).email;
      if (customerEmail) {
        if (isSuccess) {
          await sendEmail({
            to: customerEmail,
            subject: 'Payment Successful',
            template: 'paymentSuccess',
            data: {
              customerName: (transaction.customerDetails as any).name,
              amount: transaction.amount,
              transactionId: updatedTransaction.id,
              orderId: transaction.orderId,
              date: new Date().toLocaleDateString()
            }
          });
        } else {
          await sendEmail({
            to: customerEmail,
            subject: 'Payment Failed',
            template: 'paymentFailed',
            data: {
              customerName: (transaction.customerDetails as any).name,
              amount: transaction.amount,
              orderId: transaction.orderId,
              reason: failureReason,
              date: new Date().toLocaleDateString()
            }
          });
        }
      }

      // Create audit log
      await createAuditLog({
        userId: transaction.merchant.userId,
        action: isSuccess ? 'PAYMENT_COMPLETED' : 'PAYMENT_FAILED',
        resource: 'Transaction',
        resourceId: transaction.id,
        details: { orderId, status: finalStatus, amount: transaction.amount }
      });

      res.json({
        success: true,
        data: {
          transaction: {
            id: updatedTransaction.id,
            orderId: updatedTransaction.orderId,
            status: updatedTransaction.status,
            amount: updatedTransaction.amount,
            gatewayResponse: updatedTransaction.gatewayResponse
          }
        },
        message: isSuccess ? 'Payment processed successfully' : 'Payment failed'
      });
    } catch (error) {
      console.error('Process payment error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Internal server error'
        }
      });
    }
  },

  // Get payment status
  async getPaymentStatus(req: Request, res: Response) {
    try {
      const { orderId } = req.params;

      const transaction = await prisma.transaction.findUnique({
        where: { orderId },
        select: {
          id: true,
          orderId: true,
          amount: true,
          currency: true,
          status: true,
          paymentMethod: true,
          customerDetails: true,
          gatewayResponse: true,
          createdAt: true,
          completedAt: true,
          failedAt: true
        }
      });

      if (!transaction) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Transaction not found'
          }
        });
      }

      res.json({
        success: true,
        data: { transaction }
      });
    } catch (error) {
      console.error('Get payment status error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Internal server error'
        }
      });
    }
  },

  // Create refund
  async createRefund(req: AuthRequest, res: Response) {
    try {
      const { transactionId, amount, reason } = req.body;
      const merchantId = req.user!.merchantId!;

      // Find transaction
      const transaction = await prisma.transaction.findUnique({
        where: { id: transactionId },
        include: {
          merchant: true
        }
      });

      if (!transaction) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Transaction not found'
          }
        });
      }

      if (transaction.merchantId !== merchantId) {
        return res.status(403).json({
          success: false,
          error: {
            message: 'Access denied'
          }
        });
      }

      if (transaction.status !== 'COMPLETED') {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Only completed transactions can be refunded'
          }
        });
      }

      if (amount > transaction.amount - transaction.refundedAmount) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Refund amount exceeds available amount'
          }
        });
      }

      // Generate refund ID
      const refundId = `REFUND_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Create refund
      const refund = await prisma.refund.create({
        data: {
          transactionId,
          merchantId,
          userId: req.user!.id,
          refundId,
          amount,
          reason,
          status: 'PENDING'
        }
      });

      // Update transaction refunded amount
      await prisma.transaction.update({
        where: { id: transactionId },
        data: {
          refundedAmount: {
            increment: amount
          },
          status: amount === transaction.amount - transaction.refundedAmount ? 'REFUNDED' : 'COMPLETED'
        }
      });

      // Simulate refund processing
      setTimeout(async () => {
        await prisma.refund.update({
          where: { id: refund.id },
          data: {
            status: 'COMPLETED',
            processedAt: new Date()
          }
        });
      }, 2000);

      // Create audit log
      await createAuditLog({
        userId: req.user!.id,
        action: 'REFUND_CREATED',
        resource: 'Refund',
        resourceId: refund.id,
        details: { transactionId, amount, reason }
      });

      res.status(201).json({
        success: true,
        data: {
          refund: {
            id: refund.id,
            refundId: refund.refundId,
            amount: refund.amount,
            reason: refund.reason,
            status: refund.status,
            createdAt: refund.createdAt
          }
        },
        message: 'Refund created successfully'
      });
    } catch (error) {
      console.error('Create refund error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Internal server error'
        }
      });
    }
  },

  // Get refund status
  async getRefundStatus(req: AuthRequest, res: Response) {
    try {
      const { refundId } = req.params;

      const refund = await prisma.refund.findUnique({
        where: { id: refundId },
        include: {
          transaction: {
            select: {
              orderId: true,
              amount: true,
              currency: true
            }
          }
        }
      });

      if (!refund) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Refund not found'
          }
        });
      }

      res.json({
        success: true,
        data: { refund }
      });
    } catch (error) {
      console.error('Get refund status error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Internal server error'
        }
      });
    }
  },

  // Create payment link
  async createPaymentLink(req: AuthRequest, res: Response) {
    try {
      const { amount, currency = 'INR', description, expiresAt, customerDetails } = req.body;
      const merchantId = req.user!.merchantId!;

      // Generate link ID
      const linkId = `LINK_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Create payment link (you might want to create a separate table for this)
      const paymentLink = {
        id: linkId,
        merchantId,
        amount,
        currency,
        description,
        expiresAt: expiresAt ? new Date(expiresAt) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days default
        customerDetails,
        isActive: true,
        createdAt: new Date()
      };

      // Create audit log
      await createAuditLog({
        userId: req.user!.id,
        action: 'PAYMENT_LINK_CREATED',
        resource: 'PaymentLink',
        resourceId: linkId,
        details: { amount, currency, description }
      });

      res.status(201).json({
        success: true,
        data: {
          paymentLink: {
            id: paymentLink.id,
            amount: paymentLink.amount,
            currency: paymentLink.currency,
            description: paymentLink.description,
            expiresAt: paymentLink.expiresAt,
            paymentUrl: `${process.env.CLIENT_URL}/pay/link/${paymentLink.id}`
          }
        },
        message: 'Payment link created successfully'
      });
    } catch (error) {
      console.error('Create payment link error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Internal server error'
        }
      });
    }
  },

  // Get payment link
  async getPaymentLink(req: Request, res: Response) {
    try {
      const { linkId } = req.params;

      // In a real implementation, you would fetch from database
      const paymentLink = {
        id: linkId,
        amount: 1000,
        currency: 'INR',
        description: 'Sample payment link',
        isActive: true
      };

      if (!paymentLink || !paymentLink.isActive) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Payment link not found or inactive'
          }
        });
      }

      res.json({
        success: true,
        data: { paymentLink }
      });
    } catch (error) {
      console.error('Get payment link error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Internal server error'
        }
      });
    }
  },

  // Create QR code
  async createQRCode(req: AuthRequest, res: Response) {
    try {
      const { name, amount, description } = req.body;
      const merchantId = req.user!.merchantId!;

      // Generate QR code data
      const qrData = {
        merchantId,
        amount,
        description,
        timestamp: Date.now()
      };

      // Generate QR code image
      const qrImageUrl = await QRCode.toDataURL(JSON.stringify(qrData));

      // Create QR code record
      const qrCode = await prisma.qRCode.create({
        data: {
          merchantId,
          name,
          amount,
          description,
          imageUrl: qrImageUrl
        }
      });

      // Create audit log
      await createAuditLog({
        userId: req.user!.id,
        action: 'QR_CODE_CREATED',
        resource: 'QRCode',
        resourceId: qrCode.id,
        details: { name, amount }
      });

      res.status(201).json({
        success: true,
        data: {
          qrCode: {
            id: qrCode.id,
            name: qrCode.name,
            amount: qrCode.amount,
            description: qrCode.description,
            imageUrl: qrCode.imageUrl,
            scanCount: qrCode.scanCount
          }
        },
        message: 'QR code created successfully'
      });
    } catch (error) {
      console.error('Create QR code error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Internal server error'
        }
      });
    }
  },

  // Get QR code
  async getQRCode(req: Request, res: Response) {
    try {
      const { qrId } = req.params;

      const qrCode = await prisma.qRCode.findUnique({
        where: { id: qrId }
      });

      if (!qrCode || !qrCode.isActive) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'QR code not found or inactive'
          }
        });
      }

      // Increment scan count
      await prisma.qRCode.update({
        where: { id: qrId },
        data: {
          scanCount: {
            increment: 1
          }
        }
      });

      res.json({
        success: true,
        data: { qrCode }
      });
    } catch (error) {
      console.error('Get QR code error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Internal server error'
        }
      });
    }
  },

  // Handle payment callback
  async handleCallback(req: Request, res: Response) {
    try {
      const callbackData = req.body;

      // Verify webhook signature (implement based on your payment gateway)
      // const signature = req.headers['x-signature'];
      // if (!verifyWebhookSignature(callbackData, signature)) {
      //   return res.status(400).json({ error: 'Invalid signature' });
      // }

      // Process callback data
      const { orderId, status, transactionId, amount } = callbackData;

      const transaction = await prisma.transaction.findUnique({
        where: { orderId }
      });

      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      // Update transaction status
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: status as TransactionStatus,
          gatewayResponse: callbackData,
          processedAt: new Date(),
          ...(status === 'COMPLETED' && { completedAt: new Date() }),
          ...(status === 'FAILED' && { failedAt: new Date() })
        }
      });

      res.json({ success: true });
    } catch (error) {
      console.error('Callback error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Simulate payment (for testing)
  async simulatePayment(req: AuthRequest, res: Response) {
    try {
      const { orderId, status, failureReason } = req.body;

      const transaction = await prisma.transaction.findUnique({
        where: { orderId }
      });

      if (!transaction) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Transaction not found'
          }
        });
      }

      // Update transaction status
      const updateData: any = {
        status: status as TransactionStatus,
        processedAt: new Date()
      };

      if (status === 'COMPLETED') {
        updateData.completedAt = new Date();
        updateData.gatewayResponse = {
          success: true,
          transactionId: `TXN_${Date.now()}`,
          responseCode: 'SUCCESS',
          responseMessage: 'Transaction successful'
        };
      } else if (status === 'FAILED') {
        updateData.failedAt = new Date();
        updateData.failureReason = failureReason;
        updateData.gatewayResponse = {
          success: false,
          responseCode: 'FAILED',
          responseMessage: failureReason
        };
      }

      await prisma.transaction.update({
        where: { id: transaction.id },
        data: updateData
      });

      res.json({
        success: true,
        message: `Payment ${status.toLowerCase()} successfully`
      });
    } catch (error) {
      console.error('Simulate payment error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Internal server error'
        }
      });
    }
  },

  // Get merchant payments
  async getMerchantPayments(req: AuthRequest, res: Response) {
    try {
      const { merchantId } = req.params;
      const { page = 1, limit = 20, status, startDate, endDate } = req.query;

      const where: any = { merchantId };

      if (status) where.status = status;
      if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) where.createdAt.gte = new Date(startDate as string);
        if (endDate) where.createdAt.lte = new Date(endDate as string);
      }

      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

      const [transactions, total] = await Promise.all([
        prisma.transaction.findMany({
          where,
          select: {
            id: true,
            orderId: true,
            amount: true,
            currency: true,
            status: true,
            paymentMethod: true,
            customerDetails: true,
            fees: true,
            netAmount: true,
            createdAt: true,
            completedAt: true
          },
          orderBy: {
            createdAt: 'desc'
          },
          skip,
          take: parseInt(limit as string)
        }),
        prisma.transaction.count({ where })
      ]);

      res.json({
        success: true,
        data: {
          transactions,
          pagination: {
            page: parseInt(page as string),
            limit: parseInt(limit as string),
            total,
            pages: Math.ceil(total / parseInt(limit as string))
          }
        }
      });
    } catch (error) {
      console.error('Get merchant payments error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Internal server error'
        }
      });
    }
  }
}; 