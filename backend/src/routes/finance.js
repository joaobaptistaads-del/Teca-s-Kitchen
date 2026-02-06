import express from 'express';
import { body } from 'express-validator';
import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getFinancialSummary,
  getExpenseCategories
} from '../controllers/financeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

// All finance routes require authentication
router.use(authMiddleware);

router.get('/expenses', getAllExpenses);
router.get('/expenses/categories', getExpenseCategories);
router.get('/expenses/:id', getExpenseById);
router.get('/summary', getFinancialSummary);

router.post('/expenses', [
  body('description').notEmpty().withMessage('Description is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Valid amount is required'),
  body('category').notEmpty().withMessage('Category is required'),
  validateRequest
], createExpense);

router.put('/expenses/:id', [
  body('description').notEmpty().withMessage('Description is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Valid amount is required'),
  body('category').notEmpty().withMessage('Category is required'),
  validateRequest
], updateExpense);

router.delete('/expenses/:id', deleteExpense);

export default router;
