import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';

interface EmailData {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  private getTemplate(templateName: string, data: Record<string, any>): EmailTemplate {
    const templates: Record<string, EmailTemplate> = {
      emailVerification: {
        subject: 'Verify your email address',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Verify your email</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to PaymentGateway!</h1>
              </div>
              <div class="content">
                <h2>Hi ${data.name},</h2>
                <p>Thank you for registering with PaymentGateway. To complete your registration, please verify your email address by clicking the button below:</p>
                <a href="${data.verificationUrl}" class="button">Verify Email Address</a>
                <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                <p>${data.verificationUrl}</p>
                <p>This link will expire in 24 hours.</p>
                <p>If you didn't create an account with us, please ignore this email.</p>
              </div>
              <div class="footer">
                <p>&copy; 2024 PaymentGateway. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
          Welcome to PaymentGateway!
          
          Hi ${data.name},
          
          Thank you for registering with PaymentGateway. To complete your registration, please verify your email address by visiting this link:
          
          ${data.verificationUrl}
          
          This link will expire in 24 hours.
          
          If you didn't create an account with us, please ignore this email.
          
          Best regards,
          The PaymentGateway Team
        `
      },
      passwordReset: {
        subject: 'Reset your password',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Reset your password</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Password Reset Request</h1>
              </div>
              <div class="content">
                <h2>Hi ${data.name},</h2>
                <p>We received a request to reset your password. Click the button below to create a new password:</p>
                <a href="${data.resetUrl}" class="button">Reset Password</a>
                <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                <p>${data.resetUrl}</p>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request a password reset, please ignore this email.</p>
              </div>
              <div class="footer">
                <p>&copy; 2024 PaymentGateway. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
          Password Reset Request
          
          Hi ${data.name},
          
          We received a request to reset your password. Click the link below to create a new password:
          
          ${data.resetUrl}
          
          This link will expire in 1 hour.
          
          If you didn't request a password reset, please ignore this email.
          
          Best regards,
          The PaymentGateway Team
        `
      },
      paymentSuccess: {
        subject: 'Payment Successful',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Payment Successful</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .amount { font-size: 24px; font-weight: bold; color: #4CAF50; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Payment Successful!</h1>
              </div>
              <div class="content">
                <h2>Hi ${data.customerName},</h2>
                <p>Your payment of <span class="amount">₹${data.amount}</span> has been processed successfully.</p>
                <p><strong>Transaction ID:</strong> ${data.transactionId}</p>
                <p><strong>Order ID:</strong> ${data.orderId}</p>
                <p><strong>Date:</strong> ${data.date}</p>
                <p>Thank you for using PaymentGateway!</p>
              </div>
              <div class="footer">
                <p>&copy; 2024 PaymentGateway. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
          Payment Successful!
          
          Hi ${data.customerName},
          
          Your payment of ₹${data.amount} has been processed successfully.
          
          Transaction ID: ${data.transactionId}
          Order ID: ${data.orderId}
          Date: ${data.date}
          
          Thank you for using PaymentGateway!
          
          Best regards,
          The PaymentGateway Team
        `
      },
      paymentFailed: {
        subject: 'Payment Failed',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Payment Failed</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .amount { font-size: 24px; font-weight: bold; color: #f44336; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Payment Failed</h1>
              </div>
              <div class="content">
                <h2>Hi ${data.customerName},</h2>
                <p>We're sorry, but your payment of <span class="amount">₹${data.amount}</span> has failed.</p>
                <p><strong>Order ID:</strong> ${data.orderId}</p>
                <p><strong>Reason:</strong> ${data.reason}</p>
                <p><strong>Date:</strong> ${data.date}</p>
                <p>Please try again or contact support if you continue to experience issues.</p>
              </div>
              <div class="footer">
                <p>&copy; 2024 PaymentGateway. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
          Payment Failed
          
          Hi ${data.customerName},
          
          We're sorry, but your payment of ₹${data.amount} has failed.
          
          Order ID: ${data.orderId}
          Reason: ${data.reason}
          Date: ${data.date}
          
          Please try again or contact support if you continue to experience issues.
          
          Best regards,
          The PaymentGateway Team
        `
      },
      kycApproved: {
        subject: 'KYC Approved',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>KYC Approved</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>KYC Approved!</h1>
              </div>
              <div class="content">
                <h2>Hi ${data.name},</h2>
                <p>Great news! Your KYC verification has been approved.</p>
                <p>Your merchant account is now fully activated and you can start accepting payments.</p>
                <p>If you have any questions, please don't hesitate to contact our support team.</p>
              </div>
              <div class="footer">
                <p>&copy; 2024 PaymentGateway. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
          KYC Approved!
          
          Hi ${data.name},
          
          Great news! Your KYC verification has been approved.
          
          Your merchant account is now fully activated and you can start accepting payments.
          
          If you have any questions, please don't hesitate to contact our support team.
          
          Best regards,
          The PaymentGateway Team
        `
      },
      kycRejected: {
        subject: 'KYC Rejected',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>KYC Rejected</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>KYC Rejected</h1>
              </div>
              <div class="content">
                <h2>Hi ${data.name},</h2>
                <p>We're sorry, but your KYC verification has been rejected.</p>
                <p><strong>Reason:</strong> ${data.reason}</p>
                <p>Please review the feedback and resubmit your KYC documents. If you have any questions, please contact our support team.</p>
              </div>
              <div class="footer">
                <p>&copy; 2024 PaymentGateway. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
          KYC Rejected
          
          Hi ${data.name},
          
          We're sorry, but your KYC verification has been rejected.
          
          Reason: ${data.reason}
          
          Please review the feedback and resubmit your KYC documents. If you have any questions, please contact our support team.
          
          Best regards,
          The PaymentGateway Team
        `
      }
    };

    const template = templates[templateName];
    if (!template) {
      throw new Error(`Email template '${templateName}' not found`);
    }

    return template;
  }

  async sendEmail(emailData: EmailData): Promise<void> {
    try {
      const template = this.getTemplate(emailData.template, emailData.data);

      const mailOptions = {
        from: process.env.SMTP_FROM,
        to: emailData.to,
        subject: emailData.subject || template.subject,
        html: template.html,
        text: template.text
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${emailData.to}`);
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendCustomEmail(to: string, subject: string, html: string, text?: string): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM,
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, '') // Strip HTML tags for text version
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Custom email sent successfully to ${to}`);
    } catch (error) {
      console.error('Custom email sending failed:', error);
      throw new Error('Failed to send custom email');
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('Email service connection verified');
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();

export const sendEmail = (emailData: EmailData): Promise<void> => {
  return emailService.sendEmail(emailData);
};

export const sendCustomEmail = (to: string, subject: string, html: string, text?: string): Promise<void> => {
  return emailService.sendCustomEmail(to, subject, html, text);
}; 