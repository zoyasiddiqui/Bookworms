import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native'

// safe to be exposed because of Supabase's security
const supabaseUrl = "https://rcufxvsfblvrxhcvptvd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjdWZ4dnNmYmx2cnhoY3ZwdHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExNzY4MjMsImV4cCI6MjAzNjc1MjgyM30.wF4NDMlupk-tZD7--UwGfXpvt6VeuBk4F-L-_SivdvA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // how auth data is stored
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Supabase Auth continuously refreshes to check state changes (token refreshed or signed out)
AppState.addEventListener('change', (state) => {
  // app is in the foreground
  if (state === 'active') {
    supabase.auth.startAutoRefresh()

  // app is in the background/inactive
  } else {
    supabase.auth.stopAutoRefresh() // to save resources
  }
})
