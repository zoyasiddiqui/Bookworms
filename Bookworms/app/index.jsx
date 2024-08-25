import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeWindStyleSheet } from "nativewind";
import OpenButton from "../../Bookworms/components/OpenButton";
import Header from "../../Bookworms/components/Header";
import { useGlobalContext } from "../context/GlobalProvider";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const index = () => {
  // if user is logged in, redirect
  const {session} = useGlobalContext();
  
  if (session && session.user) {
    return <Redirect href={"/profile"}/> // unless we want to redirect somewhere else
  }

  return(
    <SafeAreaView className="bg-bglight h-full flex">
      <StatusBar/>
      <ScrollView contentContainerStyle={{ height: "100%", flexGrow: 1, }}>

        {/* This will contain all of the elements */}
        <View className="px-4 items-center flex-1 justify-between">
          {/* This view will contain the title and the logo */}
          <View className="justify-center items-centers flex-1">

            <Header
              title="Bookworms"
              font="font-bodoniitalic"
              size="text-6xl"
              padding="py-4"
              margin="mb-8"
            />

            <View className="justify-center items-center pb-8">
              <Image
                source={require('../assets/images/Logo.png')}
                style={{ width: 240, height: 160 }}
              />
            </View>

            <Text className="font-inknut text-sm text-center pt-8 text-accentlight">
              "A reader lives a thousand lives before he dies."
            </Text>
            <Text className="font-inknut text-accentlight text-sm text-center 
            py-2">
              George R.R. Martin
            </Text>
          </View>

          {/* This view will contain both of the buttons */}
          <View className="h-40 justify-end mb-10">

            <OpenButton title={ "Sign Up" }
              handlePress={() => router.push("/signup")}
              buttonSize={"px-20 py-3"}
              buttonColor={"bg-plight"}
              buttonPadding={"py-4"}
              buttonRound={true}
              textSize={"text-xl"}
              textColor={"text-accentdark"}
              shadow={true}
            />
            <OpenButton title={ "Log In" }
              handlePress={() => router.push("/login")}
              buttonSize={"px-20 py-3"}
              buttonColor={"bg-plight"}
              buttonPadding={"py-4"}
              buttonRound={true}
              textSize={"text-xl"}
              textColor={"text-accentdark"}
              shadow={true}
            />

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
};

export default index;