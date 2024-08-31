import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { getBook } from '../../lib/supabase'
import { useGlobalContext } from "../../context/GlobalProvider";

const Cover = ({bookID}) => {
  const {coverPlaceholder} = useGlobalContext();
  const [cover, setCover] = useState(coverPlaceholder)

  async function getCover(bookID) {
    const book = await getBook(bookID)

    // return if error (Alert done in getBook)
    if (book === null) return

    setCover(book.thumbnail_url)
  }  

  useEffect(() => {
    getCover(bookID);
  }, [bookID]);

  console.log("Cover", cover)

  return (
    <TouchableOpacity
    className="justify-start items-center m-2"
    activeOpacity={0.4}>
        <Image
            source={{ uri: cover }}
            className="w-40 h-40"
            resizeMode="contain"
        />
    </TouchableOpacity>
  )
}

export default Cover