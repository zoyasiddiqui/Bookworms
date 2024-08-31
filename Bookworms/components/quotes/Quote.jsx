import { View, Text, ScrollView } from 'react-native'
import { getProfile } from '../../lib/supabase'
import React, {useEffect, useState} from 'react'

const Quote = ({userID, quote}) => {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => { // so we can await for the profile
      try {
        const prof = await getProfile(userID);
        setProfile(prof);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (userID) fetchProfile(); // in return, will need to check if profile is null (error occured in getProfile)
  }, [userID])

  console.log(profile)

  return (
    <View className="flex-row flex-1 border-t">
        {/* This view contains profile information */}
        <View>

        </View>
        {/* This will contain the quote */}
        <ScrollView>
          <Text className="font-inknutthin text-sm py-2 mt-4 px-1">{quote}</Text>
        </ScrollView>
        {/* Maybe another view at the bottom for other things like book the user is referencing? and in future would have likes and stuff */}

    </View>
  )
}

export default Quote