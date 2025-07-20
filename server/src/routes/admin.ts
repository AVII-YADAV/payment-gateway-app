import { Router } from 'express';
import { body, query } from 'express-validator';
import { validateRequest } from '../middleware/validate';
import { authenticate, AuthRequest, authorize } from '../middleware/auth';
import { adminController } from '../controllers/adminController';

const router = Router();

/**
 * @swagger
 * /api/v1/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard stats
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats retrieved successfully
 */
router.get('/dashboard', [
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN')
], adminController.getDashboard);

/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 */
router.get('/users', [
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('role').optional().isIn(['USER', 'MERCHANT', 'ADMIN', 'SUPER_ADMIN']),
  query('status').optional().isIn(['active', 'inactive']),
  validateRequest
], adminController.getUsers);

/**
 * @swagger
 * /api/v1/admin/merchants:
 *   get:
 *     summary: Get all merchants
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Merchants retrieved successfully
 */
router.get('/merchants', [
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('kycStatus').optional().isIn(['PENDING', 'SUBMITTED', 'APPROVED', 'REJECTED']),
  validateRequest
], adminController.getMerchants);

/**
 * @swagger
 * /api/v1/admin/kyc/{merchantId}:
 *   put:
 *     summary: Update KYC status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: KYC status updated successfully
 */
router.put('/kyc/:merchantId', [
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  body('status').isIn(['APPROVED', 'REJECTED']),
  body('reason').optional().notEmpty(),
  validateRequest
], adminController.updateKYCStatus);

/**
 * @swagger
 * /api/v1/admin/disputes:
 *   get:
 *     summary: Get all disputes
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Disputes retrieved successfully
 */
router.get('/disputes', [
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().isIn(['OPEN', 'UNDER_REVIEW', 'RESOLVED', 'CLOSED']),
  validateRequest
], adminController.getDisputes);

/**
 * @swagger
 * /api/v1/admin/disputes/{disputeId}:
 *   put:
 *     summary: Update dispute status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dispute status updated successfully
 */
router.put('/disputes/:disputeId', [
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  body('status').isIn(['UNDER_REVIEW', 'RESOLVED', 'CLOSED']),
  body('resolution').optional().notEmpty(),
  validateRequest
], adminController.updateDisputeStatus);

/**
 * @swagger
 * /api/v1/admin/logs:
 *   get:
 *     summary: Get audit logs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Audit logs retrieved successfully
 */
router.get('/logs', [
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('action').optional().notEmpty(),
  query('resource').optional().notEmpty(),
  query('startDate').optional().isISO8601(),
  query('endDate').optional().isISO8601(),
  validateRequest
], adminController.getAuditLogs);

export default router; 