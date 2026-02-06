import express from 'express';
import {
  getAllSettings,
  getSetting,
  updateSetting,
  updateMultipleSettings,
  deleteSetting
} from '../controllers/settingsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for getting settings (needed for public site)
router.get('/', getAllSettings);
router.get('/:key', getSetting);

// Protected routes (admin only)
router.put('/batch', authMiddleware, updateMultipleSettings);
router.put('/:key', authMiddleware, updateSetting);
router.delete('/:key', authMiddleware, deleteSetting);

export default router;
