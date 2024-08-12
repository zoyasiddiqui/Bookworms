import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeWindStyleSheet } from "nativewind";
import { Avatar } from 'react-native-elements';
import OpenButton from "../../../Bookworms/components/OpenButton";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Profile = () => {
  return (
    <SafeAreaView className="bg-bglight h-full flex">
      <StatusBar/>
      <ScrollView contentContainerStyle={{ height: "100%", flexGrow: 1, }}>

        {/* This will contain all of the elements */}
        <View className="px-4 items-center flex-1 justify-between">
          {/* This view will contain the title and the logo */}
          <View className="flex-row justify-center items-centers flex-1">
            
            <Avatar 
              rounded={true}
              size={64}
              title="MD"
              showEditButton={true}
              containerStyle={styles.avatarContainer}
            />

            {/* This view will contain all the text/buttons */}
            <View className="flex-col items-center justify-beg">
              {/* This view will contain all the top text */}
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
                  buttonSize={"w-20 h-10 mx-2"}
                  buttonColor={"bg-plight rounded-full"}
                  buttonPadding={"py-6"}
                  textSize={"text-sm"}
                  textColor={"text-accentdark"}
                  shadow={true}
                />
              </View>

              <OpenButton title={ "Edit Profile" }
                handlePress={() => login()}
                buttonSize={"w-40 h-10"}
                buttonColor={"bg-slight"}
                buttonPadding={""}
                textSize={"text-sm"}
                textColor={"text-accentdark"}
              />
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