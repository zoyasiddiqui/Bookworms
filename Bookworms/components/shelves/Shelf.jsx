import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import Cover from './Cover'

const Shelf = ({title, shelfID}) => {

  const [books, setBooks] = useState([])
  const [bookTitle, setTitle] = useState('')
  const [bookCover, setCover] = useState('')

  async function getBooks(shelfID) {
    const { data: books, getBooksError } = await supabase
      .from('shelf_books')
      .select('book_id')
      .eq('shelf_id', shelfID)

    if (getBooksError) {
      Alert.alert(getBooksError)
      return;
    }

    setBooks(books)
  }

  async function getBookInfo(bookID) {
    const { data: book, bookError } = await supabase
      .from('books')
      .select('name, thumbnail_url')
      .eq('book_id', bookID)
      .single()

    if (bookError) {
      Alert.alert(bookError)
      return;
    }

    setTitle(book.name)
    setCover(book.thumbnail_url)
  }

  useEffect(() => {
    getBooks(shelfID);
  }, [shelfID]);

  console.log("BOOKS", books)

  return (
    <View className="border-t">
      <Text className="font-inknutbold p-2 mt-2 text-base">
        {`${title}`}
      </Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1}} horizontal={true}>
        {books.map((book, index) => (
          <Cover
            key={index}
            bookID={book.book_id}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default Shelf

const styles = StyleSheet.create({})