import supabase from '../config/supabase.js';
import { successResponse, errorResponse } from '../utils/response.js';

// Get all expenses with optional filters
export const getAllExpenses = async (req, res) => {
  try {
    const { startDate, endDate, category, limit = 50 } = req.query;

    let query = supabase
      .from('expenses')
      .select('*');

    if (startDate) {
      query = query.gte('date', startDate);
    }

    if (endDate) {
      query = query.lte('date', endDate);
    }

    if (category) {
      query = query.eq('category', category);
    }

    query = query.order('date', { ascending: false }).limit(parseInt(limit));

    const { data, error } = await query;

    if (error) {
      return errorResponse(res, 'Failed to fetch expenses', 500);
    }

    return successResponse(res, data, 'Expenses retrieved successfully');
  } catch (error) {
    console.error('Get expenses error:', error);
    return errorResponse(res, 'Failed to fetch expenses', 500);
  }
};

// Get expense by ID
export const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return errorResponse(res, 'Expense not found', 404);
    }

    return successResponse(res, data, 'Expense retrieved successfully');
  } catch (error) {
    console.error('Get expense error:', error);
    return errorResponse(res, 'Failed to fetch expense', 500);
  }
};

// Create new expense
export const createExpense = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;

    const { data, error } = await supabase
      .from('expenses')
      .insert([{
        description,
        amount,
        category,
        date: date || new Date().toISOString().split('T')[0]
      }])
      .select()
      .single();

    if (error) {
      return errorResponse(res, 'Failed to create expense', 500);
    }

    return successResponse(res, data, 'Expense created successfully', 201);
  } catch (error) {
    console.error('Create expense error:', error);
    return errorResponse(res, 'Failed to create expense', 500);
  }
};

// Update expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, category, date } = req.body;

    const { data, error } = await supabase
      .from('expenses')
      .update({
        description,
        amount,
        category,
        date
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      return errorResponse(res, 'Expense not found or update failed', 404);
    }

    return successResponse(res, data, 'Expense updated successfully');
  } catch (error) {
    console.error('Update expense error:', error);
    return errorResponse(res, 'Failed to update expense', 500);
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) {
      return errorResponse(res, 'Failed to delete expense', 500);
    }

    return successResponse(res, null, 'Expense deleted successfully');
  } catch (error) {
    console.error('Delete expense error:', error);
    return errorResponse(res, 'Failed to delete expense', 500);
  }
};

// Get financial summary
export const getFinancialSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const now = new Date();
    
    const start = startDate || new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const end = endDate || new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

    // Get total revenue from sales
    const { data: sales, error: salesError } = await supabase
      .from('sales')
      .select('total_amount')
      .gte('created_at', start)
      .lte('created_at', end)
      .eq('status', 'completed');

    if (salesError) {
      return errorResponse(res, 'Failed to fetch sales data', 500);
    }

    const totalRevenue = sales.reduce((sum, sale) => sum + parseFloat(sale.total_amount), 0);

    // Get total expenses
    const { data: expenses, error: expensesError } = await supabase
      .from('expenses')
      .select('amount, category')
      .gte('date', start.split('T')[0])
      .lte('date', end.split('T')[0]);

    if (expensesError) {
      return errorResponse(res, 'Failed to fetch expenses data', 500);
    }

    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

    // Calculate expenses by category
    const expensesByCategory = expenses.reduce((acc, expense) => {
      const category = expense.category || 'Outros';
      acc[category] = (acc[category] || 0) + parseFloat(expense.amount);
      return acc;
    }, {});

    const netProfit = totalRevenue - totalExpenses;

    return successResponse(res, {
      period: {
        startDate: start,
        endDate: end
      },
      totalRevenue,
      totalExpenses,
      netProfit,
      expensesByCategory
    }, 'Financial summary retrieved successfully');
  } catch (error) {
    console.error('Get financial summary error:', error);
    return errorResponse(res, 'Failed to fetch financial summary', 500);
  }
};

// Get expense categories
export const getExpenseCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select('category')
      .not('category', 'is', null);

    if (error) {
      return errorResponse(res, 'Failed to fetch expense categories', 500);
    }

    // Get unique categories
    const categories = [...new Set(data.map(item => item.category))];

    return successResponse(res, categories, 'Expense categories retrieved successfully');
  } catch (error) {
    console.error('Get expense categories error:', error);
    return errorResponse(res, 'Failed to fetch expense categories', 500);
  }
};
