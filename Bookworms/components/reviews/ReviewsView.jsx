import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import icons from "../../constants/icons.js"
import Review from './Review.jsx'
import { NativeWindStyleSheet } from "nativewind"
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from 'react'
import { supabase, getProfile, updateProfile } from '../../lib/supabase.js'
import { useGlobalContext } from "../../context/GlobalProvider.js"

NativeWindStyleSheet.setOutput({
  default: "native",
});

const ReviewsView = ({userID, handleClick}) => {

  const [reviews, setReviews] = useState([])

  async function getReviews(userID) {

    const { data: reviews, reviewError } = await supabase
      .from('reviews')
      .select('name, review, rating, book_id')
      .eq('user_id', userID);

    if (reviewError) {
      Alert.alert(reviewError)
      return;
    }

    setReviews(reviews)
  }

  useEffect(() => {
    getReviews(userID);
  }, [userID]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, flexShrink: 1}}>
        <TouchableOpacity 
        className="justify-center items-center bg-accentdark pt-5 mb-5"
        activeOpacity={0.4}
        onPress={handleClick}>
            <Image
                source={icons.plus}
                className="w-8 h-8"
                resizeMode="contain"
            />
        </TouchableOpacity>

        {reviews.map((review, index) => (
        <Review
          key={index}
          name={review.name}
          description={review.review}
          rating={review.rating}
          bookID={review.book_id}
        />
      ))}

    </ScrollView>
  )
};

export default ReviewsView

const styles = StyleSheet.create({})
