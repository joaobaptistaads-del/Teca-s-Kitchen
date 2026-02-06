import express from 'express';
import {
  getAllSettings,
  getSetting,
  updateSetting,
  updateMultipleSettings,
  deleteSetting
} from '../controllers/settingsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { writeLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public route for getting settings (needed for public site)
router.get('/', getAllSettings);
router.get('/:key', getSetting);

// Protected routes (admin only)
router.put('/batch', authMiddleware, writeLimiter, updateMultipleSettings);
router.put('/:key', authMiddleware, writeLimiter, updateSetting);
router.delete('/:key', authMiddleware, writeLimiter, deleteSetting);

export default router;
