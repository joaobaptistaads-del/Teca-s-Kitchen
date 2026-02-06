import supabase from '../config/supabase.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';

export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 50, category_id, is_active } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `, { count: 'exact' });

    // Apply filters
    if (category_id) {
      query = query.eq('category_id', category_id);
    }
    
    if (is_active !== undefined) {
      query = query.eq('is_active', is_active === 'true');
    }

    // Apply pagination
    query = query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) {
      return errorResponse(res, 'Failed to fetch products', 500);
    }

    return paginatedResponse(res, data, page, limit, count);
    
  } catch (error) {
    console.error('Get products error:', error);
    return errorResponse(res, 'Failed to fetch products', 500);
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      return errorResponse(res, 'Product not found', 404);
    }

    return successResponse(res, data);
    
  } catch (error) {
    console.error('Get product error:', error);
    return errorResponse(res, 'Failed to fetch product', 500);
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category_id, image_url, is_active } = req.body;

    const { data, error } = await supabase
      .from('products')
      .insert([{
        name,
        description,
        price,
        category_id,
        image_url,
        is_active: is_active !== undefined ? is_active : true
      }])
      .select()
      .single();

    if (error) {
      return errorResponse(res, 'Failed to create product', 500);
    }

    return successResponse(res, data, 'Product created successfully', 201);
    
  } catch (error) {
    console.error('Create product error:', error);
    return errorResponse(res, 'Failed to create product', 500);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category_id, image_url, is_active } = req.body;

    const updateData = {
      updated_at: new Date().toISOString()
    };

    // Only update provided fields
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (category_id !== undefined) updateData.category_id = category_id;
    if (image_url !== undefined) updateData.image_url = image_url;
    if (is_active !== undefined) updateData.is_active = is_active;

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return errorResponse(res, 'Failed to update product', 500);
    }

    if (!data) {
      return errorResponse(res, 'Product not found', 404);
    }

    return successResponse(res, data, 'Product updated successfully');
    
  } catch (error) {
    console.error('Update product error:', error);
    return errorResponse(res, 'Failed to update product', 500);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      return errorResponse(res, 'Failed to delete product', 500);
    }

    return successResponse(res, null, 'Product deleted successfully');
    
  } catch (error) {
    console.error('Delete product error:', error);
    return errorResponse(res, 'Failed to delete product', 500);
  }
};

export const getCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('order_position', { ascending: true });

    if (error) {
      return errorResponse(res, 'Failed to fetch categories', 500);
    }

    return successResponse(res, data);
    
  } catch (error) {
    console.error('Get categories error:', error);
    return errorResponse(res, 'Failed to fetch categories', 500);
  }
};
