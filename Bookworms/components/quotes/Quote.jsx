import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements';
import { getProfile, getProfilePic } from '../../lib/supabase'
import React, {useEffect, useState} from 'react'
import OpenButton from "../../../Bookworms/components/OpenButton";

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

    if (userID) fetchProfile();
  }, [userID])

  return (
    <View className="flex-row flex-1 border-t">
        {/* This view contains profile information */}
        <View className="w-[100%] h-[25%]">
          <View className="flex-row justify-start items-center ml-1 mt-1">
          <Avatar size={45}
                  title={profile? `${profile.first_name[0]} ${profile.last_name[0]}` : 'F L'}
                  containerStyle={styles.avatarContainer}
                  source={profile ? {uri: getProfilePic(profile.avatar_url)} : {uri: 'https://dummyimage.com/45x45/b5b5b5/b5b5b5.png&text=+'}}
          />

          <Text className='font-inknutbold'>{profile ? profile.first_name + ' ' + profile.last_name : 'First Last'}</Text>

          <OpenButton title={profile? profile.tag : 'Reader'}
                  buttonSize={"w-20 ml-2"}
                  buttonColor={"bg-slight"}
                  buttonPadding={""}
                  buttonRound={true}
                  textSize={"text-sm py-1"}
                  textColor={"text-accentdark"}
                  shadow={true}
                  font={"font-bodoniitalic"}
          />
          </View>
        </View>
        {/* This will contain the quote */}
        <View className='w-[100%] h-[75%] border-2'>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <Text className="font-inknutthin text-sm py-2 mt-4 px-1">{quote}</Text>
          </ScrollView>
        </View>
        {/* Maybe another view at the bottom for other things like book the user is referencing? and in future would have likes and stuff */}

    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    marginRight: 10
  },
})  

export default Quote