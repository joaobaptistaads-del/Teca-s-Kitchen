import supabase from '../config/supabase.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';

export const getAllExpenses = async (req, res) => {
  try {
    const { page = 1, limit = 50, start_date, end_date, category } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('expenses')
      .select('*', { count: 'exact' });

    // Apply filters
    if (start_date) {
      query = query.gte('date', start_date);
    }
    
    if (end_date) {
      query = query.lte('date', end_date);
    }
    
    if (category) {
      query = query.eq('category', category);
    }

    // Apply pagination
    query = query
      .range(offset, offset + limit - 1)
      .order('date', { ascending: false });

    const { data, error, count } = await query;

    if (error) {
      return errorResponse(res, 'Failed to fetch expenses', 500);
    }

    return paginatedResponse(res, data, page, limit, count);
    
  } catch (error) {
    console.error('Get expenses error:', error);
    return errorResponse(res, 'Failed to fetch expenses', 500);
  }
};

export const getExpense = async (req, res) => {
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

    return successResponse(res, data);
    
  } catch (error) {
    console.error('Get expense error:', error);
    return errorResponse(res, 'Failed to fetch expense', 500);
  }
};

export const createExpense = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;

    const { data, error } = await supabase
      .from('expenses')
      .insert([{
        description,
        amount,
        category,
        date
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

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, category, date } = req.body;

    const updateData = {};

    // Only update provided fields
    if (description !== undefined) updateData.description = description;
    if (amount !== undefined) updateData.amount = amount;
    if (category !== undefined) updateData.category = category;
    if (date !== undefined) updateData.date = date;

    const { data, error } = await supabase
      .from('expenses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return errorResponse(res, 'Failed to update expense', 500);
    }

    if (!data) {
      return errorResponse(res, 'Expense not found', 404);
    }

    return successResponse(res, data, 'Expense updated successfully');
    
  } catch (error) {
    console.error('Update expense error:', error);
    return errorResponse(res, 'Failed to update expense', 500);
  }
};

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

export const getFinancialSummary = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    // Calculate date range
    let startDate;
    const endDate = new Date();
    
    switch (period) {
      case 'today':
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'year':
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
    }

    // Get sales (revenue)
    const { data: sales, error: salesError } = await supabase
      .from('sales')
      .select('total_amount')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (salesError) {
      return errorResponse(res, 'Failed to fetch sales data', 500);
    }

    // Get expenses
    const { data: expenses, error: expensesError } = await supabase
      .from('expenses')
      .select('amount, category')
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', endDate.toISOString().split('T')[0]);

    if (expensesError) {
      return errorResponse(res, 'Failed to fetch expenses data', 500);
    }

    // Calculate totals
    const totalRevenue = sales.reduce((sum, sale) => sum + parseFloat(sale.total_amount), 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const netProfit = totalRevenue - totalExpenses;

    // Group expenses by category
    const expensesByCategory = {};
    expenses.forEach(expense => {
      const category = expense.category || 'Other';
      if (!expensesByCategory[category]) {
        expensesByCategory[category] = 0;
      }
      expensesByCategory[category] += parseFloat(expense.amount);
    });

    return successResponse(res, {
      period,
      start_date: startDate,
      end_date: endDate,
      revenue: totalRevenue,
      expenses: totalExpenses,
      net_profit: netProfit,
      expenses_by_category: expensesByCategory
    });
    
  } catch (error) {
    console.error('Get financial summary error:', error);
    return errorResponse(res, 'Failed to fetch financial summary', 500);
  }
};

export const getExpenseCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select('category')
      .order('category');

    if (error) {
      return errorResponse(res, 'Failed to fetch expense categories', 500);
    }

    // Get unique categories
    const categories = [...new Set(data.map(item => item.category).filter(Boolean))];

    return successResponse(res, categories);
    
  } catch (error) {
    console.error('Get expense categories error:', error);
    return errorResponse(res, 'Failed to fetch expense categories', 500);
  }
};
