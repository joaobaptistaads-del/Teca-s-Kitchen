import supabase from '../config/supabase.js';
import { successResponse, errorResponse } from '../utils/response.js';

// Get all products with optional filters
export const getAllProducts = async (req, res) => {
  try {
    const { category, isActive, search } = req.query;

    let query = supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `);

    if (category) {
      query = query.eq('category_id', category);
    }

    if (isActive !== undefined) {
      query = query.eq('is_active', isActive === 'true');
    }

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      return errorResponse(res, 'Failed to fetch products', 500);
    }

    return successResponse(res, data, 'Products retrieved successfully');
  } catch (error) {
    console.error('Get products error:', error);
    return errorResponse(res, 'Failed to fetch products', 500);
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
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

    return successResponse(res, data, 'Product retrieved successfully');
  } catch (error) {
    console.error('Get product error:', error);
    return errorResponse(res, 'Failed to fetch product', 500);
  }
};

// Create new product
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

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category_id, image_url, is_active } = req.body;

    const { data, error } = await supabase
      .from('products')
      .update({
        name,
        description,
        price,
        category_id,
        image_url,
        is_active,
        updated_at: new Date()
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      return errorResponse(res, 'Product not found or update failed', 404);
    }

    return successResponse(res, data, 'Product updated successfully');
  } catch (error) {
    console.error('Update product error:', error);
    return errorResponse(res, 'Failed to update product', 500);
  }
};

// Delete product
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

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('order_position', { ascending: true });

    if (error) {
      return errorResponse(res, 'Failed to fetch categories', 500);
    }

    return successResponse(res, data, 'Categories retrieved successfully');
  } catch (error) {
    console.error('Get categories error:', error);
    return errorResponse(res, 'Failed to fetch categories', 500);
  }
};

// Create category
export const createCategory = async (req, res) => {
  try {
    const { name, slug, order_position } = req.body;

    const { data, error } = await supabase
      .from('categories')
      .insert([{ name, slug, order_position }])
      .select()
      .single();

    if (error) {
      return errorResponse(res, 'Failed to create category', 500);
    }

    return successResponse(res, data, 'Category created successfully', 201);
  } catch (error) {
    console.error('Create category error:', error);
    return errorResponse(res, 'Failed to create category', 500);
  }
};
