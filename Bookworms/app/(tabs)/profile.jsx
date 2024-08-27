import { StatusBar } from "expo-status-bar";
import * as ImagePicker from 'expo-image-picker'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { Avatar } from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeWindStyleSheet } from "nativewind";
import { useState, useEffect } from 'react'
import { supabase, getProfile, updateProfile, uploadBooksToSupabase } from '../../lib/supabase'
import { useGlobalContext } from "../../context/GlobalProvider";
import OpenButton from "../../../Bookworms/components/OpenButton";
import Header from "../../../Bookworms/components/Header";
import ReviewsView from "../../../Bookworms/components/profile/ReviewsView.jsx";
import icons from "../../../Bookworms/constants/icons.js";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Profile = () => {
  const {session, uploading, setUploading} = useGlobalContext();
  const [selectedTab, setSelectedTab] = useState('Reviews'); // Default to 'Reviews'

  // setting up user info
  const [curUser, setCurUser] = useState({
    firstName: '',
    lastName: '',
    tag: 'Reader',
    avatar: null,
  })

  useEffect(() => {
    if (session) getInfo()
  }, [session])

  // function to retrieve user info
  async function getInfo() {
    if (!session?.user) throw new Error('No user on the session!')

    // COMMENT THIS OUT LATER
    uploadBooksToSupabase("harry+potter", 10)

    const profile = await getProfile(session.user.id)
    console.log("Current Profile", profile)

    setCurUser({
      firstName: profile.first_name || 'First',
      lastName: profile.last_name || 'Last',
      tag: 'Reader', // You might want to get this from the database as well if it's dynamic
      avatar: profile.avatar_url || null,
    });
  }

  // upload the image to supabase
  async function uploadAvatar(size = 80) {
    try {
      setUploading(true)

      // maybe should check/ask user's permissions first?
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to only images
        allowsMultipleSelection: false, // Can only select one image
        aspect: [size, size],
        allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
        quality: 1, // of compression
        exif: false, // don't need EXIF data
      })

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log('User cancelled image picker.')
        setUploading(false)
        return
      }

      const image = result.assets[0]

      if (!image.uri) {
        throw new Error('No image uri!') // this should never happen, just in case
      }

      const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer())
      const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpg' // get file extension
      const path = `${Date.now()}.${fileExt}` // so file paths are unique

      // send to Supabase storage
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? 'image/jpeg',
        })

      if (uploadError) {
        console.log("upload error", uploadError.message)
        throw uploadError
      }

      // Store the path of the old profile picture
      const oldAvatarPath = curUser.avatar;

      // update profile table
      const updates = {
        id: session.user.id,
        first_name: session.user.first_name,
        last_name: session.user.last_name,
        avatar_url: data.path
      }

      try {
        updateProfile(updates)
      } catch (error) {
        console.log("Update profile error", error.message)
        Alert.alert(error.message)
      }

      // delete the old profile picture from Supabase storage
      if (oldAvatarPath) {
        const { error: deleteError } = await supabase.storage
          .from('avatars')
          .remove([oldAvatarPath]);

        if (deleteError) {
          console.log('Error deleting old profile picture:', deleteError.message);
        }
      }

      // updating state with new profile picture
      try {
        getInfo()
      } catch (error) {
        console.log("Set Cur User error", error.message)
        Alert.alert(error.message)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Catch portion error", error.message)
        Alert.alert(error.message)
      } else {
        throw error
      }
    } finally {
      setUploading(false)
    }
  } 

  function getProfilePic(path) {
      const { data, error } = supabase.storage.from('avatars').getPublicUrl(path)

      if (error) {
        console.log('Error getting profile pic: ', error.message)
        Alert.alert(error.message)
      }

      return data.publicUrl
  }

  return (
    <SafeAreaView className="bg-bglight h-full flex">
      <StatusBar/>
      <ScrollView contentContainerStyle={{ height: "100%", flexGrow: 1, }}>

        {/* This will contain all of the elements */}
        <View className="px-4 items-center flex-1 justify-between">

          <TouchableOpacity className="absolute top-5 right-6">
            <Image
              source={icons.settings}
              className="w-8 h-8"
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Header title={`${curUser.firstName} ${curUser.lastName}`}
            font="font-bodoni"
            size="text-2xl"
            padding="py-2"
            margin="mt-10 mb-5"
          />

          {/* This view will contain the title and the logo */}
          <View className="h-[20%] flex-col items-center justify-start flex-1">

            {/* This will hold the profile picture, the followers and following stuff, and the tag */}
            <View className="flex-row justify-center items-center">

              <Avatar size={80}
                  title={`${curUser.firstName[0]} ${curUser.lastName[0]}`} // for when user doesn't have a pfp
                  showEditButton={true}
                  containerStyle={styles.avatarContainer}
                  source={{uri: getProfilePic(curUser.avatar)}}
                  onPress={() => uploadAvatar()}
              />

              <View className="flex-row justify-center items-center">
                <View className="flex-col justify-center items-center">
                  <Text className="font-inknutbold text-sm pt-2">45</Text>
                  <Text className="font-inknutthin text-sm px-2 pt-2">Followers</Text>
                </View>
                <View className="flex-col justify-center items-center">
                  <Text className="font-inknutbold text-sm pt-2">47</Text>
                  <Text className="font-inknutthin text-sm px-2 pt-2">Following</Text>
                </View>

                <OpenButton title={"Reader"}
                  handlePress={getInfo}
                  buttonSize={"w-20 h-10 mx-2"}
                  buttonColor={"bg-plight"}
                  buttonPadding={"py-6"}
                  buttonRound={true}
                  textSize={"text-sm"}
                  textColor={"text-accentdark"}
                  shadow={true}
                />
              </View>
              
            </View>


          </View>

          {/* This will hold the posts and the buttons to switch between Reviews, Shelves, and Quotes */}
          <View className="h-[70%] justify-end">           
            <View className="flex-row h-[10%] justify-center">
              
              <OpenButton title={"Reviews"}
                onPress={() => setSelectedTab("Reviews")}
                buttonSize={"w-full h-[100%] px-10"}
                buttonColor={"bg-plight"}
                buttonPadding={""}
                textSize={"text-sm"}
                textColor={"text-accentdark"}
                shadow={true}
                additionalStyling={"flex-2"}
              />
              
              <OpenButton title={"Shelves"}
                onPress={() => setSelectedTab("Shelves")}
                buttonSize={"w-full h-[100%] px-10"}
                buttonColor={"bg-plight"}
                buttonPadding={""}
                textSize={"text-sm"}
                textColor={"text-accentdark"}
                shadow={true}
                additionalStyling={"flex-2"}
              />

              <OpenButton title={"Quotes"}
                onPress={() => setSelectedTab("Quotes")}
                buttonSize={"w-full h-[100%] px-10"}
                buttonColor={"bg-plight"}
                buttonPadding={""}
                textSize={"text-sm"}
                textColor={"text-accentdark"}
                shadow={true}
                additionalStyling={"flex-2"}
              />

            </View>

            <View className="h-[90%] justify-center bg-accentdark">
              <ReviewsView
                userID={session.user.id}/>
            </View>

          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    borderWidth: 1,        // Thickness of the border
    borderColor: '#670A0A',
    color: '#670A0A', // White border color
    padding: 2,            // Optional: Adds some padding inside the border
    margin: 10,
  },
})  

export default Profile