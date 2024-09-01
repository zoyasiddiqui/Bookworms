import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { getBook, supabase } from '../../lib/supabase'
import { useGlobalContext } from "../../context/GlobalProvider";
import Cover from './Cover'

const Shelf = ({title, shelfID}) => {
  const {coverPlaceholder} = useGlobalContext();

  const [books, setBooks] = useState([])
  const [bookTitle, setTitle] = useState('')  
  const [cover, setCover] = useState(coverPlaceholder)

  async function getBooks(shelfID) {
    const { data: books, getBooksError } = await supabase
      .from('shelf_books')
      .select('book_id')
      .eq('shelf_id', shelfID)

    if (getBooksError) {
      Alert.alert(getBooksError)
      return;
    }

    setBooks(books || [])
  }

  async function getBookInfo(bookID) {
    const book = await getBook(bookID)

    // return if error (Alert done in getBook)
    if (book === null) return

    setTitle(book.name)
    setCover(book.thumbnail_url)
  }

  useEffect(() => {
    if (shelfID) getBooks(shelfID);
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