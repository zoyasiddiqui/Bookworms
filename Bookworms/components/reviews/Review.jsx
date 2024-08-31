import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { getBook } from '../../lib/supabase'
import { useGlobalContext } from "../../context/GlobalProvider";
import icons from '../../constants/icons'

const Review = ({name, description, rating, bookID}) => {
  // added a blank placeholder image as default to avoid the empty string error on android
  const {coverPlaceholder} = useGlobalContext();

  const [cover, setCover] = useState(coverPlaceholder)
  const [title, setTitle]  = useState('')

  async function getBookInfo(bookID) {
    const book = await getBook(bookID)

    // return if error (Alert done in getBook)
    if (book === null) return

    setTitle(book.name)
    setCover(book.thumbnail_url)
  }
  
  console.log("Title",title)
  console.log("Image URL", cover)

  useEffect(() => {
    getBookInfo(bookID);
  }, [bookID]);

  return (
    <View className="flex-row flex-1 border-t">

      <View className="w-[30%] h-[80%]">
        <View className="flex-col items-center justify-start ml-2">
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
            <TouchableOpacity
            activeOpacity={0.6}>
              <Text className="font-inknutthin text-sm py-2 mt-4 px-1">
                {`${title}`}
              </Text>
            </TouchableOpacity>
            <Text className="font-inknutbold text-base py-2 px-1">
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