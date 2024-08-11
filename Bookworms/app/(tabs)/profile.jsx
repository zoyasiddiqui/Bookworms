import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeWindStyleSheet } from "nativewind";
import { Avatar } from 'react-native-elements';

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Profile = () => {
  return (
    <SafeAreaView className="bg-bglight h-full flex">
      <StatusBar/>
      <ScrollView contentContainerStyle={{ height: "100%", flexGrow: 1, }}>

      <View>

        <View>
          <Avatar rounded title="MD" />
        </View>
        <View>
          {/* Text */}
          <View>
            {/* Top line of text */}
            <View>
              {/* Followers, following */}
            </View>
          </View>
          <View>
            {/* Edit Profile button */}
          </View>
        </View>

      </View>
       
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile