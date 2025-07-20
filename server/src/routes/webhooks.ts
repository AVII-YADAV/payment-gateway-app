import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate';
import { authenticate, AuthRequest, requireMerchant } from '../middleware/auth';
import { webhookController } from '../controllers/webhookController';

const router = Router();

/**
 * @swagger
 * /api/v1/webhooks:
 *   post:
 *     summary: Create webhook
 *     tags: [Webhooks]
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
 *               - url
 *               - events
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string
 *                 format: uri
 *               events:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Webhook created successfully
 */
router.post('/', [
  authenticate,
  requireMerchant,
  body('name').notEmpty(),
  body('url').isURL(),
  body('events').isArray(),
  validateRequest
], webhookController.createWebhook);

/**
 * @swagger
 * /api/v1/webhooks:
 *   get:
 *     summary: Get webhooks
 *     tags: [Webhooks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Webhooks retrieved successfully
 */
router.get('/', authenticate, requireMerchant, webhookController.getWebhooks);

/**
 * @swagger
 * /api/v1/webhooks/{webhookId}:
 *   put:
 *     summary: Update webhook
 *     tags: [Webhooks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Webhook updated successfully
 */
router.put('/:webhookId', [
  authenticate,
  requireMerchant,
  body('name').optional().notEmpty(),
  body('url').optional().isURL(),
  body('events').optional().isArray(),
  body('isActive').optional().isBoolean(),
  validateRequest
], webhookController.updateWebhook);

/**
 * @swagger
 * /api/v1/webhooks/{webhookId}:
 *   delete:
 *     summary: Delete webhook
 *     tags: [Webhooks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Webhook deleted successfully
 */
router.delete('/:webhookId', authenticate, requireMerchant, webhookController.deleteWebhook);

/**
 * @swagger
 * /api/v1/webhooks/test/{webhookId}:
 *   post:
 *     summary: Test webhook
 *     tags: [Webhooks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Webhook test completed
 */
router.post('/test/:webhookId', authenticate, requireMerchant, webhookController.testWebhook);

export default router; 