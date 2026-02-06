import express from 'express';
import {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getFinancialSummary,
  getExpenseCategories
} from '../controllers/financeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { expenseValidation, uuidValidation } from '../utils/validation.js';

const router = express.Router();

// All finance routes require authentication
router.use(authMiddleware);

router.get('/expenses', getAllExpenses);
router.get('/expenses/categories', getExpenseCategories);
router.get('/expenses/:id', uuidValidation, validateRequest, getExpense);
router.post('/expenses', expenseValidation, validateRequest, createExpense);
router.put('/expenses/:id', authMiddleware, uuidValidation, validateRequest, updateExpense);
router.delete('/expenses/:id', authMiddleware, uuidValidation, validateRequest, deleteExpense);
router.get('/summary', getFinancialSummary);

export default router;
