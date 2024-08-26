import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import icons from "../../../Bookworms/constants/icons.js"
import Review from './Review.jsx'
import { NativeWindStyleSheet } from "nativewind"
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from 'react'
import { supabase, getProfile, updateProfile } from '../../lib/supabase'
import { useGlobalContext } from "../../context/GlobalProvider"

NativeWindStyleSheet.setOutput({
  default: "native",
});

const ReviewsView = ({userID}) => {

  async function getReviews(userID) {

    const { data: reviews, reviewError } = await supabase
      .from('reviews')
      .select('name, review, rating, book_id')
      .eq('user_id', userID);

    if (reviewError) {
      Alert.alert(reviewError)
      return;
    }

    return reviews
  }

  getReviews(userID).then((reviews) => console.log(reviews))

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1}}>
        <TouchableOpacity 
        className="justify-center items-center top-5">
            <Image
                source={icons.plus}
                className="w-8 h-8"
                resizeMode="contain"
            />
        </TouchableOpacity>

    </ScrollView>
  )
};

export default ReviewsView

const styles = StyleSheet.create({})
