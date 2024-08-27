import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import icons from '../../constants/icons'

const Review = ({name, description, rating, bookID}) => {

  const [title, setTitle]  = useState('')
  const [cover, setCover] = useState('')

  async function getBookTitle(bookID) {
    const { data: bookTitle, error } = await supabase.from('books')
    .select('name')
    .eq('id', bookID)
    .single()

    if (error) {
      Alert.alert(error)
      return;
    }

    setTitle(bookTitle.name)
  }

  async function getBookImage(bookID) {
    const { data: bookCover, error } = await supabase.from('books')
    .select('thumbnail_url')
    .eq('id', bookID)
    .single()

    if (error) {
      console.error(error)
      return;
    }

    setCover(bookCover.thumbnail_url)
  }

  console.log("Title",title)
  console.log("Image URL", cover)

  useEffect(() => {
    getBookTitle(bookID);
  }, [bookID]);

  useEffect(() => {
    getBookImage(bookID);
  }, [bookID]);

  return (
    <View className="flex-row flex-1 border-t">

      <View className="w-[30%] h-[80%]">
        <View className="flex-col items-center justify-start">
          <TouchableOpacity className="my-2">
            <Image
              source={{uri: cover}}
              className="w-40 h-40"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View className="flex-row mt-1">
            {Array.from({ length: rating }).map((_, index) => (
              <Image
                key={index} // Ensure each image has a unique key
                source={icons.fullStar} // The source of the image
                className="w-4 h-4" // Styling for the images (adjust as needed)
                resizeMode="contain" // Resize mode for the image
              />
            ))}
            {Array.from({ length: (5 - rating) }).map((_, index) => (
              <Image
                key={index} // Ensure each image has a unique key
                source={icons.emptyStar} // The source of the image
                className="w-4 h-4" // Styling for the images (adjust as needed)
                resizeMode="contain" // Resize mode for the image
              />
            ))}
          </View>
        </View>
      </View>

      <View className="w-[70%] h-[80%] justify-end">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-col ml-5 justify-start">
            <Text className="font-inknutthin text-sm py-2 mt-4">
              {`${title}`}
            </Text>
            <Text className="font-inknutbold text-base py-2">
              {`${name}`}
            </Text>
            <Text className="font-inknutthin text-sm py-1 px-1">
                {`${description}`}
            </Text>
          </View>
        </ScrollView>
      </View>

    </View>
  )
}

export default Review

const styles = StyleSheet.create({})