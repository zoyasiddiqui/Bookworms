import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeWindStyleSheet } from "nativewind";
import OpenButton from "../../Bookworms/components/OpenButton";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const index = () => {

  return(
    <SafeAreaView className="bg-bglight h-full flex">
      <StatusBar/>
      <ScrollView contentContainerStyle={{ height: "100%", flexGrow: 1, }}>

        {/* This will contain all of the elements */}
        <View className="w-full h-full px-4 items-center py-6">
          {/* This view will contain the title and the logo */}
          <View className="h-30 justify-center">
            <Text className="text-5xl text-plight font-bodoniitalic text-center py-8">
              Bookworms
            </Text>
            <Image
              source={require('../assets/images/Logo.png')}
              style={{ width: 300, height: 200 }}
            />
          </View>

          {/* This view will contain both of the buttons */}
          <View className="h-70 justify-center">
            <OpenButton title={ "Sign Up" }
              handlePress={() => router.push("/signup")}
            />
            <OpenButton title={ "Log In" }
              handlePress={() => router.push("/login")}
            />

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
};

export default index;