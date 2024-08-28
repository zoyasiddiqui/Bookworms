import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import CreateReview from '../../components/reviews/CreateReview'
import { StatusBar } from 'expo-status-bar'

const create_review = () => {
  return (
    <SafeAreaView className="bg-bglight h-full flex">
        <StatusBar/>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            <CreateReview/>

        </ScrollView>
    </SafeAreaView>
  )
}

export default create_review