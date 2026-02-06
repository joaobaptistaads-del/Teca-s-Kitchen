import express from 'express';
import { body } from 'express-validator';
import { login, getProfile, changePassword } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

// Login route
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest
], login);

// Get profile (protected)
router.get('/profile', authMiddleware, getProfile);

// Change password (protected)
router.post('/change-password', [
  authMiddleware,
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  validateRequest
], changePassword);

export default router;
