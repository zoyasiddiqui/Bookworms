import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import icons from "../../../Bookworms/constants/icons.js";

const ShelvesView = () => {
  return (
    <View>
        {/* Button to handle adding a review */}
        <TouchableOpacity className="justify-center items-center top-5">
            <Image
                source={icons.plus}
                className="w-8 h-8"
                resizeMode="contain"
            />
        </TouchableOpacity>
    </View>
  )
}

export default ShelvesView

const styles = StyleSheet.create({})