import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react'
import {SearchBar} from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../Header'
import FormField from '../FormField'

// need a search bar for users to find the book that they'll link to the review and need it to not be atricously slow
// two formfield: name and descriptoin
// an image view that will initially be empty, and then after they pick the book it'll have its cover
// a rating thingy. will figure out hwo to conditiionally render with the stars, i have an idea of how to do that
// a done button. when this done button is clicked, we take the info from the page, create a review to send to supabase, 
//  and then re-route back to the profile page OR to the full review page

const CreateReview = () => {

  const [searchQuery, setSearchQuery] = useState('')

  const [form, setForm] = useState({
    name: '',
    review: '',
    rating: 0,
    bookID: null
  })

  const handleSearch = (query) => {
    setSearchQuery(query)
  } 

  return (
    <View>
      <Header title={"Create a Review"}
        font="font-bodoni"
        size="text-2xl"
        padding="py-2"
        margin="mt-6"
      />

      <SearchBar
        placeholder='Search for a book...'
        onChangeText={handleSearch}
        value={searchQuery}
      />

      <FormField
        title={"Review Title"}
        handleChangeText={(e) => setForm({...form, name: e})}
        otherStyles="py-4"
        multilineVal={true}
        numOfLines={6}
      />
    </View>
  )
}

export default CreateReview