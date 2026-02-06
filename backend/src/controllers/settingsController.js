import supabase from '../config/supabase.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getAllSettings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .order('key');

    if (error) {
      return errorResponse(res, 'Failed to fetch settings', 500);
    }

    // Convert array to object for easier access
    const settingsObj = {};
    data.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });

    return successResponse(res, settingsObj);
    
  } catch (error) {
    console.error('Get settings error:', error);
    return errorResponse(res, 'Failed to fetch settings', 500);
  }
};

export const getSetting = async (req, res) => {
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

    return successResponse(res, data);
    
  } catch (error) {
    console.error('Get setting error:', error);
    return errorResponse(res, 'Failed to fetch setting', 500);
  }
};

export const updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    // Check if setting exists
    const { data: existing } = await supabase
      .from('settings')
      .select('id')
      .eq('key', key)
      .single();

    let data, error;

    if (existing) {
      // Update existing setting
      const result = await supabase
        .from('settings')
        .update({
          value,
          updated_at: new Date().toISOString()
        })
        .eq('key', key)
        .select()
        .single();
      
      data = result.data;
      error = result.error;
    } else {
      // Create new setting
      const result = await supabase
        .from('settings')
        .insert([{ key, value }])
        .select()
        .single();
      
      data = result.data;
      error = result.error;
    }

    if (error) {
      return errorResponse(res, 'Failed to update setting', 500);
    }

    return successResponse(res, data, 'Setting updated successfully');
    
  } catch (error) {
    console.error('Update setting error:', error);
    return errorResponse(res, 'Failed to update setting', 500);
  }
};

export const updateMultipleSettings = async (req, res) => {
  try {
    const settings = req.body;

    if (!settings || typeof settings !== 'object') {
      return errorResponse(res, 'Invalid settings data', 400);
    }

    const updates = [];
    
    for (const [key, value] of Object.entries(settings)) {
      // Check if setting exists
      const { data: existing } = await supabase
        .from('settings')
        .select('id')
        .eq('key', key)
        .single();

      if (existing) {
        // Update existing
        updates.push(
          supabase
            .from('settings')
            .update({
              value,
              updated_at: new Date().toISOString()
            })
            .eq('key', key)
        );
      } else {
        // Insert new
        updates.push(
          supabase
            .from('settings')
            .insert([{ key, value }])
        );
      }
    }

    // Execute all updates
    await Promise.all(updates);

    // Fetch updated settings
    const { data: updatedSettings } = await supabase
      .from('settings')
      .select('*')
      .order('key');

    const settingsObj = {};
    updatedSettings.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });

    return successResponse(res, settingsObj, 'Settings updated successfully');
    
  } catch (error) {
    console.error('Update multiple settings error:', error);
    return errorResponse(res, 'Failed to update settings', 500);
  }
};

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
