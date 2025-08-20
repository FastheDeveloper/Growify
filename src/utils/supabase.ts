import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://bgbbampgqzzbesgkzzbp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYmJhbXBncXp6YmVzZ2t6emJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MTUwODAsImV4cCI6MjA3MTI5MTA4MH0.J7HVC50ZF1FC7nmgoas9IjNQ8lVJmB2xXqt4ATei5mE"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
