import express from 'express';
import {
  getAllSales,
  getSale,
  createSale,
  getSalesStats,
  getTopProducts
} from '../controllers/salesController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { saleValidation, uuidValidation } from '../utils/validation.js';
import { writeLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// All sales routes require authentication
router.use(authMiddleware);

router.get('/', getAllSales);
router.get('/stats', getSalesStats);
router.get('/top-products', getTopProducts);
router.get('/:id', uuidValidation, validateRequest, getSale);
router.post('/', writeLimiter, saleValidation, validateRequest, createSale);

export default router;
