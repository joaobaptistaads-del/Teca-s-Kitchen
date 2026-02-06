import supabase from '../config/supabase.js';
import { successResponse, errorResponse } from '../utils/response.js';

// Get all settings
export const getAllSettings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*');

    if (error) {
      return errorResponse(res, 'Failed to fetch settings', 500);
    }

    // Convert array to object for easier access
    const settingsObject = data.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {});

    return successResponse(res, settingsObject, 'Settings retrieved successfully');
  } catch (error) {
    console.error('Get settings error:', error);
    return errorResponse(res, 'Failed to fetch settings', 500);
  }
};

// Get setting by key
export const getSettingByKey = async (req, res) => {
  try {
    const { key } = req.params;

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('key', key)
      .single();

    if (error || !data) {
      return errorResponse(res, 'Setting not found', 404);
    }

    return successResponse(res, data, 'Setting retrieved successfully');
  } catch (error) {
    console.error('Get setting error:', error);
    return errorResponse(res, 'Failed to fetch setting', 500);
  }
};

// Update or create setting
export const upsertSetting = async (req, res) => {
  try {
    const { key, value } = req.body;

    const { data, error } = await supabase
      .from('settings')
      .upsert([{
        key,
        value,
        updated_at: new Date()
      }], {
        onConflict: 'key'
      })
      .select()
      .single();

    if (error) {
      return errorResponse(res, 'Failed to update setting', 500);
    }

    return successResponse(res, data, 'Setting updated successfully');
  } catch (error) {
    console.error('Update setting error:', error);
    return errorResponse(res, 'Failed to update setting', 500);
  }
};

// Update multiple settings
export const updateMultipleSettings = async (req, res) => {
  try {
    const settings = req.body; // Expected to be an object with key-value pairs

    if (!settings || typeof settings !== 'object') {
      return errorResponse(res, 'Invalid settings format', 400);
    }

    const settingsArray = Object.entries(settings).map(([key, value]) => ({
      key,
      value,
      updated_at: new Date()
    }));

    const { data, error } = await supabase
      .from('settings')
      .upsert(settingsArray, {
        onConflict: 'key'
      })
      .select();

    if (error) {
      return errorResponse(res, 'Failed to update settings', 500);
    }

    return successResponse(res, data, 'Settings updated successfully');
  } catch (error) {
    console.error('Update multiple settings error:', error);
    return errorResponse(res, 'Failed to update settings', 500);
  }
};

// Delete setting
export const deleteSetting = async (req, res) => {
  try {
    const { key } = req.params;

    const { error } = await supabase
      .from('settings')
      .delete()
      .eq('key', key);

    if (error) {
      return errorResponse(res, 'Failed to delete setting', 500);
    }

    return successResponse(res, null, 'Setting deleted successfully');
  } catch (error) {
    console.error('Delete setting error:', error);
    return errorResponse(res, 'Failed to delete setting', 500);
  }
};
