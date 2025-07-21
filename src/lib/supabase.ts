import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_anon_key_here'

// Create a mock client if using placeholder values
const isPlaceholder = supabaseUrl === 'https://placeholder.supabase.co'

if (isPlaceholder) {
  console.warn('Using placeholder Supabase configuration. Please set up proper Supabase credentials.')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)