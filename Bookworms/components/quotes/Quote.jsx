import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements';
import { supabase, getProfile, getProfilePic } from '../../lib/supabase'
import React, {useEffect, useState} from 'react'
import OpenButton from "../../../Bookworms/components/OpenButton";

const Quote = ({userID, quote, quoteID}) => {
  const [profile, setProfile] = useState(null)
  const [books, setBooks] = useState([])
  const [bookString, setBookString] = useState('')

  async function getBooks(quoteID) {
    // get ids of all books referenced
    const { data: bookIDs, getBooksError } = await supabase
      .from('quote_books')
      .select('book_id')
      .eq('quote_id', quoteID)

    if (getBooksError) {
      Alert.alert(getBooksError)
      return;
    }

    // now fetch these books from the books table
    const { data: bookRows, error } = await supabase
    .from('books')
    .select('*')
    .in('id', bookIDs.map((book) => book.book_id))
  
    if (error) {
      Alert.alert(error)
      return;
    }

    setBooks(bookRows || [])
  }

  function createBookString() {
    let bookStr = ''

    for (const book of books) {
      bookStr += `#${book.name}  `
    }

    setBookString(bookStr.slice(0, -1)) // to get rid of last space
  }

  // get user's profile
  useEffect(() => {
    const fetchProfile = async () => { // so we can await for the profile
      try {
        const prof = await getProfile(userID);
        setProfile(prof);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (userID) fetchProfile();
  }, [userID])

  // get referenced book(s) by this quote
  useEffect(() => {
    if (quoteID) getBooks(quoteID)
  }, [quoteID])

  // create string from referenced books
  useEffect(() => {
    if (books) createBookString()
  }, [books])

  return (
    <View className="flex-1 border-t">
        {/* This view contains profile information */}
        <View className="w-full h-[25%]">
          <View className="flex-row justify-start items-center ml-1 mt-1">
          <Avatar size={45}
                  title={profile? `${profile.first_name[0]} ${profile.last_name[0]}` : 'F L'}
                  containerStyle={styles.avatarContainer}
                  source={profile ? {uri: getProfilePic(profile.avatar_url)} : {uri: 'https://dummyimage.com/45x45/b5b5b5/b5b5b5.png&text=+'}}
          />

          <Text className='font-inknutbold'>{profile ? profile.first_name + ' ' + profile.last_name : 'First Last'}</Text>

          <OpenButton title={profile? profile.tag : 'Reader'}
                  buttonSize={"w-16 ml-2"}
                  buttonColor={"bg-slight"}
                  buttonPadding={""}
                  buttonRound={true}
                  textSize={"text-xs py-1"}
                  textColor={"text-accentdark"}
                  shadow={true}
                  font={"font-bodoniitalic"}
          />
          </View>
        </View>
        {/* This will contain the quote */}
        <View className='w-full h-[50%]'>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <Text className="font-inknutthin text-sm mt-2 py-1 px-1">{quote}</Text>
          </ScrollView>
        </View>
        {/* in future would have likes and stuff below referenced books */}
        <View className='w-full h-[25%]'>
          <View className='flex-row justify-start items-center ml-1 mt-2'>
            <ScrollView contentContainerStyle={{ flexGrow: 1}} horizontal={true}>
              <Text className='font-inknutthin text-plight'>{bookString}</Text>
            </ScrollView>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    marginRight: 10
  },
})  

export default Quote