import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate';
import { authenticate, AuthRequest, authorize } from '../middleware/auth';
import { userController } from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * /api/v1/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.put('/profile', [
  authenticate,
  body('firstName').optional().trim().notEmpty(),
  body('lastName').optional().trim().notEmpty(),
  body('phone').optional().isMobilePhone(),
  validateRequest
], userController.updateProfile);

/**
 * @swagger
 * /api/v1/users/settings:
 *   get:
 *     summary: Get user settings
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User settings retrieved successfully
 */
router.get('/settings', authenticate, userController.getSettings);

/**
 * @swagger
 * /api/v1/users/settings:
 *   put:
 *     summary: Update user settings
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               twoFactorEnabled:
 *                 type: boolean
 *               ipWhitelist:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Settings updated successfully
 */
router.put('/settings', [
  authenticate,
  body('twoFactorEnabled').optional().isBoolean(),
  body('ipWhitelist').optional().isArray(),
  validateRequest
], userController.updateSettings);

/**
 * @swagger
 * /api/v1/users/notifications:
 *   get:
 *     summary: Get user notifications
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 */
router.get('/notifications', authenticate, userController.getNotifications);

/**
 * @swagger
 * /api/v1/users/notifications/{notificationId}/read:
 *   put:
 *     summary: Mark notification as read
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked as read
 */
router.put('/notifications/:notificationId/read', authenticate, userController.markNotificationRead);

/**
 * @swagger
 * /api/v1/users/notifications/read-all:
 *   put:
 *     summary: Mark all notifications as read
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 */
router.put('/notifications/read-all', authenticate, userController.markAllNotificationsRead);

/**
 * @swagger
 * /api/v1/users/transactions:
 *   get:
 *     summary: Get user transactions
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User transactions retrieved successfully
 */
router.get('/transactions', authenticate, userController.getTransactions);

/**
 * @swagger
 * /api/v1/users/admin:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 */
router.get('/admin', [
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN')
], userController.getAllUsers);

/**
 * @swagger
 * /api/v1/users/admin/{userId}:
 *   put:
 *     summary: Update user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put('/admin/:userId', [
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  body('isActive').optional().isBoolean(),
  body('role').optional().isIn(['USER', 'MERCHANT', 'ADMIN', 'SUPER_ADMIN']),
  validateRequest
], userController.updateUser);

export default router; 