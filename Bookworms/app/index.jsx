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
        <View className="px-4 items-center py-6 flex-1 justify-between">
          {/* This view will contain the title and the logo */}
          <View className="justify-center flex-1">
            <Text className="text-5xl text-plight font-bodoniitalic text-center py-8">
              Bookworms
            </Text>
            <Image
              source={require('../assets/images/Logo.png')}
              style={{ width: 300, height: 200 }}
            />
          </View>

          {/* This view will contain both of the buttons */}
          <View className="h-30 justify-end mb-4">
            <OpenButton title={ "Sign Up" }
              handlePress={() => router.push("/signup")}
              buttonSize={"px-20 pb-2 pt-5"}
              buttonColor={"bg-plight"}
              textSize={"text-2xl pt-3"}
              textColor={"text-accentdark"}
            />
            <OpenButton title={ "Log In" }
              handlePress={() => router.push("/login")}
              buttonSize={"px-20 pb-2 pt-5"}
              buttonColor={"bg-plight"}
              textSize={"text-2xl pt-3"}
              textColor={"text-accentdark"}
            />

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
};

export default index;