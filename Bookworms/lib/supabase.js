import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native'
import fetchBooksFromGoogle from './getBooks';

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

// get any user's profile table information
// could add an options parameter later if we want to only get specific information, not all of it
export async function getProfile(userId) {
  const { data: profile, error: profileRetrievalError, } = await supabase
  .from("profiles")
  .select('first_name, last_name, avatar_url')
  .eq('id', userId)
  .single(); // Expecting a single row since id is unique

  if (profileRetrievalError) {
    Alert.alert(profileRetrievalError.message)
    return;
  }

  return profile
}

/**
 *  Update a user's profile table.
 * 
 * @updates - a javascript object of updates. i.e. {id: 1, first_name: "bob"}
 */
export async function updateProfile(updates) {
  try {
    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      throw error
    }
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message)
    }
  }
}

export async function uploadBooksToSupabase(query, maxResults = 40) {
  const books = fetchBooksFromGoogle(query, maxResults);

  const formattedBooks = books.map(book => ({
    title: book.volumeInfo.title,
    authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : null,
    publisher: book.volumeInfo.publisher,
    publishedDate: book.volumeInfo.publishedDate,
    description: book.volumeInfo.description,
    thumbnail: book.volumeInfo.imageLinks?.thumbnail,
    googleBooksId: book.id,
  }));

  try {
    const { data, error } = await supabase.from('books').insert(formattedBooks);

    if (error) {
      console.error('Error uploading books to Supabase:', error);
    } else {
      console.log('Books uploaded successfully:', data);
    }
  } catch (error) {
    console.error('Error uploading books to Supabase:', error);
  }

}