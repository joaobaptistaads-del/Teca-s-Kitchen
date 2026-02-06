import express from 'express';
import { body } from 'express-validator';
import {
  getAllSettings,
  getSettingByKey,
  upsertSetting,
  updateMultipleSettings,
  deleteSetting
} from '../controllers/settingsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

// Public route - get all settings
router.get('/', getAllSettings);
router.get('/:key', getSettingByKey);

// Protected routes
router.post('/', [
  authMiddleware,
  body('key').notEmpty().withMessage('Setting key is required'),
  body('value').notEmpty().withMessage('Setting value is required'),
  validateRequest
], upsertSetting);

router.put('/bulk', authMiddleware, updateMultipleSettings);
router.delete('/:key', authMiddleware, deleteSetting);

export default router;
