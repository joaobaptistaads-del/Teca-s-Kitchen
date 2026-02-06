import express from 'express';
import { login, getProfile, updatePassword } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { loginValidation } from '../utils/validation.js';
import { authLimiter, writeLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public routes
router.post('/login', authLimiter, loginValidation, validateRequest, login);

// Protected routes
router.get('/profile', authMiddleware, getProfile);
router.put('/password', authMiddleware, writeLimiter, updatePassword);

export default router;
