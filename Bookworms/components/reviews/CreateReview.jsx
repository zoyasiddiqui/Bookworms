import { View, Text } from 'react-native'
import React from 'react'

// need a search bar for users to find the book that they'll link to the review and need it to not be atricously slow
// two formfield: name and descriptoin
// an image view that will initially be empty, and then after they pick the book it'll have its cover
// a rating thingy. will figure out hwo to conditiionally render with the stars, i have an idea of how to do that
// a done button. when this done button is clicked, we take the info from the page, create a review to send to supabase, 
//  and then re-route back to the profile page OR to the full review page

const CreateReview = () => {
  return (
    <View>
      <Text>CreateReview</Text>
    </View>
  )
}

export default CreateReview