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

        <View className="flex-row items-center">
          <Avatar 
            rounded={true}
            size={64}
            title="MD"
            showEditButton={true}
            containerStyle={styles.avatarContainer}
          />

          <View className="flex-col">
            <View className="flex-row">
              <Text className="font-inknutthin text-sm">
                Followers</Text>
              <Text className="font-inknutthin text-sm">
                Following</Text>

              <View>
                <OpenButton title={"Reader"}
                  buttonSize={"w-20 h-10"}
                  buttonColor={"bg-plight rounded-full"}
                  buttonPadding={"py-6"}
                  textSize={"text-sm"}
                  textColor={"text-accentdark"}
                  shadow={true}
                />
              </View>

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
       
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    borderWidth: 2,        // Thickness of the border
    borderColor: '#FFFFFF', // White border color
    padding: 2,            // Optional: Adds some padding inside the border
    margin: 10,
  },
})

export default Profile