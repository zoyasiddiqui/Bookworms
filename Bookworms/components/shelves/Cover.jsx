import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const Cover = ({bookID}) => {

  const [cover, setCover] = useState('')  

  async function getCover(bookID) {
    const { data, error } = await supabase
        .from('books')
        .select('thumbnail_url')
        .eq('id', bookID)
        .single()

    if (error) {
        Alert.alert(error)
        return;
    }

    setCover(data.thumbnail_url)
  }  

  useEffect(() => {
    getCover(bookID);
  }, [bookID]);

  console.log("Sover", cover)

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