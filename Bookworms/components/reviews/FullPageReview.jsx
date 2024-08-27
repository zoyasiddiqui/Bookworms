import { View, Text } from 'react-native'
import React from 'react'

//RIGHT NOW i've just copy pasted everything from Review.jsx in here. it just needs some minor editing. 

const FullPageReview = (name, review, rating, bookCover, bookTitle) => {
  return (

    <View className="flex-row flex-1 border-t">

      <View className="w-[30%]">
        <View className="flex-col items-center justify-start">
          <TouchableOpacity className="my-2">
            <Image
              source={{uri: bookCover}}
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

      <View className="w-[70%] justify-end">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-col ml-5 justify-start">
            <Text className="font-inknutthin text-sm py-2 mt-4">
              {`${bookTitle}`}
            </Text>
            <Text className="font-inknutbold text-base py-2">
              {`${name}`}
            </Text>
            <Text className="font-inknutthin text-sm py-1 px-1">
                {`${review}`}
            </Text>
          </View>
        </ScrollView>
      </View>

    </View>

  )
}

export default FullPageReview