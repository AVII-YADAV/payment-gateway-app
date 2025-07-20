import { Router } from 'express';
import { body, query } from 'express-validator';
import { validateRequest } from '../middleware/validate';
import { authenticate, AuthRequest, requireMerchant } from '../middleware/auth';
import { paymentController } from '../controllers/paymentController';

const router = Router();

/**
 * @swagger
 * /api/v1/payments/create:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - currency
 *               - customerDetails
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 1
 *               currency:
 *                 type: string
 *                 default: "INR"
 *               customerDetails:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   phone:
 *                     type: string
 *               description:
 *                 type: string
 *               metadata:
 *                 type: object
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Validation error
 */
router.post('/create', [
  authenticate,
  requireMerchant,
  body('amount').isFloat({ min: 1 }),
  body('currency').optional().isIn(['INR', 'USD', 'EUR']),
  body('customerDetails.name').notEmpty(),
  body('customerDetails.email').isEmail(),
  body('customerDetails.phone').optional().isMobilePhone(),
  body('description').optional().isLength({ max: 500 }),
  validateRequest
], paymentController.createPayment);

/**
 * @swagger
 * /api/v1/payments/process:
 *   post:
 *     summary: Process a payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - paymentMethod
 *               - paymentDetails
 *             properties:
 *               orderId:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *                 enum: [UPI, CARD, NETBANKING, WALLET, EMI, PAYLATER]
 *               paymentDetails:
 *                 type: object
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *       400:
 *         description: Payment failed
 */
router.post('/process', [
  body('orderId').notEmpty(),
  body('paymentMethod').isIn(['UPI', 'CARD', 'NETBANKING', 'WALLET', 'EMI', 'PAYLATER']),
  body('paymentDetails').isObject(),
  validateRequest
], paymentController.processPayment);

/**
 * @swagger
 * /api/v1/payments/status/{orderId}:
 *   get:
 *     summary: Get payment status
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment status retrieved successfully
 *       404:
 *         description: Payment not found
 */
router.get('/status/:orderId', paymentController.getPaymentStatus);

/**
 * @swagger
 * /api/v1/payments/refund:
 *   post:
 *     summary: Create a refund
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transactionId
 *               - amount
 *               - reason
 *             properties:
 *               transactionId:
 *                 type: string
 *               amount:
 *                 type: number
 *                 minimum: 1
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Refund created successfully
 *       400:
 *         description: Validation error
 */
router.post('/refund', [
  authenticate,
  requireMerchant,
  body('transactionId').notEmpty(),
  body('amount').isFloat({ min: 1 }),
  body('reason').notEmpty(),
  validateRequest
], paymentController.createRefund);

/**
 * @swagger
 * /api/v1/payments/refund/{refundId}:
 *   get:
 *     summary: Get refund status
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: refundId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Refund status retrieved successfully
 *       404:
 *         description: Refund not found
 */
router.get('/refund/:refundId', authenticate, paymentController.getRefundStatus);

/**
 * @swagger
 * /api/v1/payments/link:
 *   post:
 *     summary: Create a payment link
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - description
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 1
 *               currency:
 *                 type: string
 *                 default: "INR"
 *               description:
 *                 type: string
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *               customerDetails:
 *                 type: object
 *     responses:
 *       201:
 *         description: Payment link created successfully
 */
router.post('/link', [
  authenticate,
  requireMerchant,
  body('amount').isFloat({ min: 1 }),
  body('currency').optional().isIn(['INR', 'USD', 'EUR']),
  body('description').notEmpty(),
  body('expiresAt').optional().isISO8601(),
  validateRequest
], paymentController.createPaymentLink);

/**
 * @swagger
 * /api/v1/payments/link/{linkId}:
 *   get:
 *     summary: Get payment link details
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: linkId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment link details retrieved successfully
 *       404:
 *         description: Payment link not found
 */
router.get('/link/:linkId', paymentController.getPaymentLink);

/**
 * @swagger
 * /api/v1/payments/qr:
 *   post:
 *     summary: Create a QR code for payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: QR code created successfully
 */
router.post('/qr', [
  authenticate,
  requireMerchant,
  body('name').notEmpty(),
  body('amount').optional().isFloat({ min: 1 }),
  body('description').optional().isLength({ max: 500 }),
  validateRequest
], paymentController.createQRCode);

/**
 * @swagger
 * /api/v1/payments/qr/{qrId}:
 *   get:
 *     summary: Get QR code details
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: qrId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: QR code details retrieved successfully
 *       404:
 *         description: QR code not found
 */
router.get('/qr/:qrId', paymentController.getQRCode);

/**
 * @swagger
 * /api/v1/payments/callback:
 *   post:
 *     summary: Payment gateway callback
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Callback processed successfully
 */
router.post('/callback', paymentController.handleCallback);

/**
 * @swagger
 * /api/v1/payments/simulate:
 *   post:
 *     summary: Simulate payment processing (for testing)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - status
 *             properties:
 *               orderId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [COMPLETED, FAILED, CANCELLED]
 *               failureReason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment simulation completed
 */
router.post('/simulate', [
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  body('orderId').notEmpty(),
  body('status').isIn(['COMPLETED', 'FAILED', 'CANCELLED']),
  body('failureReason').optional().notEmpty(),
  validateRequest
], paymentController.simulatePayment);

/**
 * @swagger
 * /api/v1/payments/merchant/{merchantId}:
 *   get:
 *     summary: Get merchant payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: merchantId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, PROCESSING, COMPLETED, FAILED, CANCELLED, REFUNDED]
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Merchant payments retrieved successfully
 */
router.get('/merchant/:merchantId', [
  authenticate,
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().isIn(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED']),
  query('startDate').optional().isISO8601(),
  query('endDate').optional().isISO8601(),
  validateRequest
], paymentController.getMerchantPayments);

export default router; 