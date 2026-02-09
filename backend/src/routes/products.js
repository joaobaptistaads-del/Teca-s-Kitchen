import express from 'express';
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
} from '../controllers/productController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { productValidation, uuidValidation } from '../utils/validation.js';
import { writeLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/categories', getCategories);
router.get('/:id', uuidValidation, validateRequest, getProduct);

// Protected routes (admin only)
router.post('/', authMiddleware, writeLimiter, productValidation, validateRequest, createProduct);
router.put('/:id', authMiddleware, writeLimiter, uuidValidation, validateRequest, updateProduct);
router.delete('/:id', authMiddleware, writeLimiter, uuidValidation, validateRequest, deleteProduct);

export default router;
