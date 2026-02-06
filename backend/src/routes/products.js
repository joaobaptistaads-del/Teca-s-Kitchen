import express from 'express';
import { body } from 'express-validator';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
  createCategory
} from '../controllers/productController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/categories', getAllCategories);
router.get('/:id', getProductById);

// Protected routes (require authentication)
router.post('/', [
  authMiddleware,
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  validateRequest
], createProduct);

router.put('/:id', [
  authMiddleware,
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  validateRequest
], updateProduct);

router.delete('/:id', authMiddleware, deleteProduct);

// Category routes
router.post('/categories', [
  authMiddleware,
  body('name').notEmpty().withMessage('Category name is required'),
  body('slug').notEmpty().withMessage('Category slug is required'),
  validateRequest
], createCategory);

export default router;
