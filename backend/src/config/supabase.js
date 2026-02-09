import { createClient } from '@supabase/supabase-js';
import { config } from './env.js';

// Create Supabase client with service role key for backend operations
export const supabase = createClient(
  config.supabaseUrl,
  config.supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export default supabase;
