import supabase from '../config/supabase.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';

export const getAllSales = async (req, res) => {
  try {
    const { page = 1, limit = 50, start_date, end_date, payment_method } = req.query;
    const offset = (page - 1) * limit;

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
      `, { count: 'exact' });

    // Apply filters
    if (start_date) {
      query = query.gte('created_at', start_date);
    }
    
    if (end_date) {
      query = query.lte('created_at', end_date);
    }
    
    if (payment_method) {
      query = query.eq('payment_method', payment_method);
    }

    // Apply pagination
    query = query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) {
      return errorResponse(res, 'Failed to fetch sales', 500);
    }

    return paginatedResponse(res, data, page, limit, count);
    
  } catch (error) {
    console.error('Get sales error:', error);
    return errorResponse(res, 'Failed to fetch sales', 500);
  }
};

export const getSale = async (req, res) => {
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

    return successResponse(res, data);
    
  } catch (error) {
    console.error('Get sale error:', error);
    return errorResponse(res, 'Failed to fetch sale', 500);
  }
};

export const createSale = async (req, res) => {
  try {
    const { items, payment_method } = req.body;

    // Calculate total
    let totalAmount = 0;
    const productIds = items.map(item => item.product_id);

    // Get product prices
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, price')
      .in('id', productIds);

    if (productsError) {
      return errorResponse(res, 'Failed to fetch product prices', 500);
    }

    // Create price map
    const priceMap = {};
    products.forEach(product => {
      priceMap[product.id] = product.price;
    });

    // Calculate total and prepare sale items
    const saleItems = items.map(item => {
      const unitPrice = priceMap[item.product_id];
      const subtotal = unitPrice * item.quantity;
      totalAmount += subtotal;

      return {
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: unitPrice,
        subtotal
      };
    });

    // Create sale
    const { data: sale, error: saleError } = await supabase
      .from('sales')
      .insert([{
        total_amount: totalAmount,
        payment_method,
        status: 'completed'
      }])
      .select()
      .single();

    if (saleError) {
      return errorResponse(res, 'Failed to create sale', 500);
    }

    // Add sale_id to items
    const itemsToInsert = saleItems.map(item => ({
      ...item,
      sale_id: sale.id
    }));

    // Insert sale items
    const { error: itemsError } = await supabase
      .from('sale_items')
      .insert(itemsToInsert);

    if (itemsError) {
      // Rollback: delete the sale
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

export const getSalesStats = async (req, res) => {
  try {
    const { period = 'today' } = req.query;
    
    // Calculate date range based on period
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
        startDate.setHours(0, 0, 0, 0);
    }

    // Get sales data
    const { data: sales, error } = await supabase
      .from('sales')
      .select('total_amount, created_at')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (error) {
      return errorResponse(res, 'Failed to fetch sales stats', 500);
    }

    // Calculate stats
    const totalSales = sales.reduce((sum, sale) => sum + parseFloat(sale.total_amount), 0);
    const salesCount = sales.length;
    const averageTicket = salesCount > 0 ? totalSales / salesCount : 0;

    return successResponse(res, {
      period,
      total_sales: totalSales,
      sales_count: salesCount,
      average_ticket: averageTicket,
      start_date: startDate,
      end_date: endDate
    });
    
  } catch (error) {
    console.error('Get sales stats error:', error);
    return errorResponse(res, 'Failed to fetch sales stats', 500);
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

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

    // Aggregate by product
    const productMap = {};
    data.forEach(item => {
      const productId = item.product_id;
      if (!productMap[productId]) {
        productMap[productId] = {
          product: item.products,
          total_quantity: 0,
          total_revenue: 0
        };
      }
      productMap[productId].total_quantity += item.quantity;
      productMap[productId].total_revenue += item.quantity * parseFloat(item.products.price);
    });

    // Convert to array and sort
    const topProducts = Object.values(productMap)
      .sort((a, b) => b.total_quantity - a.total_quantity)
      .slice(0, limit);

    return successResponse(res, topProducts);
    
  } catch (error) {
    console.error('Get top products error:', error);
    return errorResponse(res, 'Failed to fetch top products', 500);
  }
};
