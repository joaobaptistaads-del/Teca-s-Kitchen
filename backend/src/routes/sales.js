import express from 'express';
import { body } from 'express-validator';
import {
  getAllSales,
  getSaleById,
  createSale,
  getSalesStats,
  getTopProducts
} from '../controllers/salesController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

// All sales routes require authentication
router.use(authMiddleware);

router.get('/', getAllSales);
router.get('/stats', getSalesStats);
router.get('/top-products', getTopProducts);
router.get('/:id', getSaleById);

router.post('/', [
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.product_id').notEmpty().withMessage('Product ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Valid quantity is required'),
  body('items.*.unit_price').isFloat({ min: 0 }).withMessage('Valid unit price is required'),
  body('payment_method').notEmpty().withMessage('Payment method is required'),
  validateRequest
], createSale);

export default router;
