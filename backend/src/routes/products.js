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

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/categories', getCategories);
router.get('/:id', uuidValidation, validateRequest, getProduct);

// Protected routes (admin only)
router.post('/', authMiddleware, productValidation, validateRequest, createProduct);
router.put('/:id', authMiddleware, uuidValidation, validateRequest, updateProduct);
router.delete('/:id', authMiddleware, uuidValidation, validateRequest, deleteProduct);

export default router;
