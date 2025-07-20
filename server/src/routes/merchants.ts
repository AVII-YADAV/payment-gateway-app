import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate';
import { authenticate, AuthRequest, requireMerchant } from '../middleware/auth';
import { merchantController } from '../controllers/merchantController';

const router = Router();

/**
 * @swagger
 * /api/v1/merchants/register:
 *   post:
 *     summary: Register as a merchant
 *     tags: [Merchants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - businessName
 *               - businessType
 *               - address
 *             properties:
 *               businessName:
 *                 type: string
 *               businessType:
 *                 type: string
 *                 enum: [INDIVIDUAL, PARTNERSHIP, PRIVATE_LIMITED, PUBLIC_LIMITED, LLP, PROPRIETORSHIP]
 *               gstin:
 *                 type: string
 *               pan:
 *                 type: string
 *               address:
 *                 type: object
 *               bankDetails:
 *                 type: object
 *     responses:
 *       201:
 *         description: Merchant registered successfully
 */
router.post('/register', [
  authenticate,
  body('businessName').notEmpty(),
  body('businessType').isIn(['INDIVIDUAL', 'PARTNERSHIP', 'PRIVATE_LIMITED', 'PUBLIC_LIMITED', 'LLP', 'PROPRIETORSHIP']),
  body('gstin').optional().isLength({ min: 15, max: 15 }),
  body('pan').optional().isLength({ min: 10, max: 10 }),
  body('address').isObject(),
  body('bankDetails').optional().isObject(),
  validateRequest
], merchantController.register);

/**
 * @swagger
 * /api/v1/merchants/profile:
 *   get:
 *     summary: Get merchant profile
 *     tags: [Merchants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Merchant profile retrieved successfully
 */
router.get('/profile', authenticate, requireMerchant, merchantController.getProfile);

/**
 * @swagger
 * /api/v1/merchants/profile:
 *   put:
 *     summary: Update merchant profile
 *     tags: [Merchants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Merchant profile updated successfully
 */
router.put('/profile', [
  authenticate,
  requireMerchant,
  body('businessName').optional().notEmpty(),
  body('address').optional().isObject(),
  body('bankDetails').optional().isObject(),
  validateRequest
], merchantController.updateProfile);

/**
 * @swagger
 * /api/v1/merchants/kyc:
 *   post:
 *     summary: Submit KYC documents
 *     tags: [Merchants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: KYC submitted successfully
 */
router.post('/kyc', [
  authenticate,
  requireMerchant,
  body('documents').isObject(),
  validateRequest
], merchantController.submitKYC);

/**
 * @swagger
 * /api/v1/merchants/kyc/status:
 *   get:
 *     summary: Get KYC status
 *     tags: [Merchants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: KYC status retrieved successfully
 */
router.get('/kyc/status', authenticate, requireMerchant, merchantController.getKYCStatus);

/**
 * @swagger
 * /api/v1/merchants/stats:
 *   get:
 *     summary: Get merchant statistics
 *     tags: [Merchants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Merchant statistics retrieved successfully
 */
router.get('/stats', authenticate, requireMerchant, merchantController.getStats);

export default router; 