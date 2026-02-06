import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supabase from '../config/supabase.js';
import { config } from '../config/env.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get admin user from database
    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);
    
    if (!isValidPassword) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        name: admin.name
      },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    // Remove password from response
    delete admin.password_hash;

    return successResponse(res, {
      token,
      user: admin
    }, 'Login successful');
    
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse(res, 'Login failed', 500);
  }
};

export const getProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, email, name, created_at')
      .eq('id', id)
      .single();

    if (error) {
      return errorResponse(res, 'User not found', 404);
    }

    return successResponse(res, admin);
    
  } catch (error) {
    console.error('Get profile error:', error);
    return errorResponse(res, 'Failed to get profile', 500);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { currentPassword, newPassword } = req.body;

    // Get current user
    const { data: admin, error: fetchError } = await supabase
      .from('admins')
      .select('password_hash')
      .eq('id', id)
      .single();

    if (fetchError) {
      return errorResponse(res, 'User not found', 404);
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, admin.password_hash);
    
    if (!isValidPassword) {
      return errorResponse(res, 'Current password is incorrect', 401);
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    const { error: updateError } = await supabase
      .from('admins')
      .update({ 
        password_hash: hashedPassword,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (updateError) {
      return errorResponse(res, 'Failed to update password', 500);
    }

    return successResponse(res, null, 'Password updated successfully');
    
  } catch (error) {
    console.error('Update password error:', error);
    return errorResponse(res, 'Failed to update password', 500);
  }
};
