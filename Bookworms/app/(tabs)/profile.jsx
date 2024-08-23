import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeWindStyleSheet } from "nativewind";
import { Avatar } from 'react-native-elements';
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import OpenButton from "../../../Bookworms/components/OpenButton";
import Header from "../../../Bookworms/components/Header";
import Review from "../../../Bookworms/components/Review";
import icons from "../../../Bookworms/constants/icons.js";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Profile = () => {

  // setting up user info
  const [curUser, setCurUser] = useState({
    firstName: '',
    lastName: '',
    tag: 'Reader',
    avatar: null,
  })

  //function to retrieve user info
  async function getInfo() {
    
    const { data : {user}, error: userRetrievalError, } = await supabase.auth.getUser()

    if (userRetrievalError){
      Alert.alert(userRetrievalError.message)
      return;
    } 

    const userId = user?.id;

    const { data: profile, error: profileRetrievalError, } = await supabase
      .from("profiles")
      .select('first_name, last_name, avatar_url')
      .eq('id', userId)
      .single(); // Expecting a single row since id is unique

    if (profileRetrievalError) {
      Alert.alert(profileRetrievalError.message)
      return;
    }

    console.log(profile);

    // updating state with info about current user
    setCurUser({
      firstName: profile.first_name || 'First',
      lastName: profile.last_name || 'Last',
      tag: 'Reader', // You might want to get this from the database as well if it's dynamic
      avatar: profile.avatar_url || null, // Assuming your profile has an avatar_url field
    });

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
                title={`${curUser.firstName[0]} ${curUser.lastName[0]}`}
                showEditButton={true}
                containerStyle={styles.avatarContainer}
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
                buttonSize={"w-full h-[100%] px-10"}
                buttonColor={"bg-plight"}
                buttonPadding={""}
                textSize={"text-sm"}
                textColor={"text-accentdark"}
                shadow={true}
                additionalStyling={"flex-2"}
              />
              
              <OpenButton title={"Shelves"}
                buttonSize={"w-full h-[100%] px-10"}
                buttonColor={"bg-plight"}
                buttonPadding={""}
                textSize={"text-sm"}
                textColor={"text-accentdark"}
                shadow={true}
                additionalStyling={"flex-2"}
              />

              <OpenButton title={"Quotes"}
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
              <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
              </ScrollView>
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