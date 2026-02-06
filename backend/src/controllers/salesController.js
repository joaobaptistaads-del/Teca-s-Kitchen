import supabase from '../config/supabase.js';
import { successResponse, errorResponse } from '../utils/response.js';

// Get all sales with optional filters
export const getAllSales = async (req, res) => {
  try {
    const { startDate, endDate, status, limit = 50 } = req.query;

    let query = supabase
      .from('sales')
      .select(`
        *,
        sale_items (
          id,
          quantity,
          unit_price,
          subtotal,
          products (
            id,
            name
          )
        )
      `);

    if (startDate) {
      query = query.gte('created_at', startDate);
    }

    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    if (status) {
      query = query.eq('status', status);
    }

    query = query.order('created_at', { ascending: false }).limit(parseInt(limit));

    const { data, error } = await query;

    if (error) {
      return errorResponse(res, 'Failed to fetch sales', 500);
    }

    return successResponse(res, data, 'Sales retrieved successfully');
  } catch (error) {
    console.error('Get sales error:', error);
    return errorResponse(res, 'Failed to fetch sales', 500);
  }
};

// Get sale by ID
export const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('sales')
      .select(`
        *,
        sale_items (
          id,
          quantity,
          unit_price,
          subtotal,
          products (
            id,
            name,
            image_url
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      return errorResponse(res, 'Sale not found', 404);
    }

    return successResponse(res, data, 'Sale retrieved successfully');
  } catch (error) {
    console.error('Get sale error:', error);
    return errorResponse(res, 'Failed to fetch sale', 500);
  }
};

// Create new sale
export const createSale = async (req, res) => {
  try {
    const { items, payment_method, notes } = req.body;

    // Calculate total amount
    const total_amount = items.reduce((sum, item) => {
      return sum + (item.unit_price * item.quantity);
    }, 0);

    // Insert sale
    const { data: sale, error: saleError } = await supabase
      .from('sales')
      .insert([{
        total_amount,
        payment_method,
        notes,
        status: 'completed'
      }])
      .select()
      .single();

    if (saleError) {
      return errorResponse(res, 'Failed to create sale', 500);
    }

    // Insert sale items
    const saleItems = items.map(item => ({
      sale_id: sale.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.unit_price * item.quantity
    }));

    const { error: itemsError } = await supabase
      .from('sale_items')
      .insert(saleItems);

    if (itemsError) {
      // Rollback sale if items insertion fails
      await supabase.from('sales').delete().eq('id', sale.id);
      return errorResponse(res, 'Failed to create sale items', 500);
    }

    // Fetch complete sale with items
    const { data: completeSale } = await supabase
      .from('sales')
      .select(`
        *,
        sale_items (
          id,
          quantity,
          unit_price,
          subtotal,
          products (
            id,
            name
          )
        )
      `)
      .eq('id', sale.id)
      .single();

    return successResponse(res, completeSale, 'Sale created successfully', 201);
  } catch (error) {
    console.error('Create sale error:', error);
    return errorResponse(res, 'Failed to create sale', 500);
  }
};

// Get sales statistics
export const getSalesStats = async (req, res) => {
  try {
    const { period = 'today' } = req.query;
    const now = new Date();
    let startDate;

    switch (period) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(now.setHours(0, 0, 0, 0));
    }

    // Get sales in period
    const { data: sales, error } = await supabase
      .from('sales')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .eq('status', 'completed');

    if (error) {
      return errorResponse(res, 'Failed to fetch sales statistics', 500);
    }

    const totalSales = sales.reduce((sum, sale) => sum + parseFloat(sale.total_amount), 0);
    const totalOrders = sales.length;
    const averageTicket = totalOrders > 0 ? totalSales / totalOrders : 0;

    return successResponse(res, {
      period,
      totalSales,
      totalOrders,
      averageTicket
    }, 'Sales statistics retrieved successfully');
  } catch (error) {
    console.error('Get sales stats error:', error);
    return errorResponse(res, 'Failed to fetch sales statistics', 500);
  }
};

// Get top selling products
export const getTopProducts = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const { data, error } = await supabase
      .from('sale_items')
      .select(`
        product_id,
        quantity,
        products (
          id,
          name,
          image_url,
          price
        )
      `);

    if (error) {
      return errorResponse(res, 'Failed to fetch top products', 500);
    }

    // Aggregate quantities by product
    const productMap = {};
    data.forEach(item => {
      if (item.products) {
        const productId = item.product_id;
        if (!productMap[productId]) {
          productMap[productId] = {
            ...item.products,
            totalQuantity: 0
          };
        }
        productMap[productId].totalQuantity += item.quantity;
      }
    });

    // Convert to array and sort
    const topProducts = Object.values(productMap)
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, parseInt(limit));

    return successResponse(res, topProducts, 'Top products retrieved successfully');
  } catch (error) {
    console.error('Get top products error:', error);
    return errorResponse(res, 'Failed to fetch top products', 500);
  }
};
