import { Router } from 'express';
import { query } from 'express-validator';
import { validateRequest } from '../middleware/validate';
import { authenticate, AuthRequest, requireMerchant } from '../middleware/auth';
import { analyticsController } from '../controllers/analyticsController';

const router = Router();

/**
 * @swagger
 * /api/v1/analytics/overview:
 *   get:
 *     summary: Get analytics overview
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics overview retrieved successfully
 */
router.get('/overview', authenticate, requireMerchant, analyticsController.getOverview);

/**
 * @swagger
 * /api/v1/analytics/transactions:
 *   get:
 *     summary: Get transaction analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [7d, 30d, 90d, 1y]
 *           default: 30d
 *       - in: query
 *         name: groupBy
 *         schema:
 *           type: string
 *           enum: [day, week, month]
 *           default: day
 *     responses:
 *       200:
 *         description: Transaction analytics retrieved successfully
 */
router.get('/transactions', [
  authenticate,
  requireMerchant,
  query('period').optional().isIn(['7d', '30d', '90d', '1y']),
  query('groupBy').optional().isIn(['day', 'week', 'month']),
  validateRequest
], analyticsController.getTransactionAnalytics);

/**
 * @swagger
 * /api/v1/analytics/revenue:
 *   get:
 *     summary: Get revenue analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Revenue analytics retrieved successfully
 */
router.get('/revenue', [
  authenticate,
  requireMerchant,
  query('period').optional().isIn(['7d', '30d', '90d', '1y']),
  validateRequest
], analyticsController.getRevenueAnalytics);

/**
 * @swagger
 * /api/v1/analytics/payment-methods:
 *   get:
 *     summary: Get payment method analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment method analytics retrieved successfully
 */
router.get('/payment-methods', [
  authenticate,
  requireMerchant,
  query('period').optional().isIn(['7d', '30d', '90d', '1y']),
  validateRequest
], analyticsController.getPaymentMethodAnalytics);

/**
 * @swagger
 * /api/v1/analytics/refunds:
 *   get:
 *     summary: Get refund analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Refund analytics retrieved successfully
 */
router.get('/refunds', [
  authenticate,
  requireMerchant,
  query('period').optional().isIn(['7d', '30d', '90d', '1y']),
  validateRequest
], analyticsController.getRefundAnalytics);

export default router; 