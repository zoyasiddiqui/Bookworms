import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
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
        <View className="px-4 items-center flex-1 justify-between">
          {/* This view will contain the title and the logo */}
          <View className="justify-center items-centers flex-1">
            <Text className="text-5xl text-plight font-bodoniitalic text-center 
            py-4 mt-5"
            style={styles.headerShadow}>
              Bookworms
            </Text>

            <View className="justify-center items-center">
              <Image
                source={require('../assets/images/Logo.png')}
                style={{ width: 240, height: 160 }}
              />
            </View>

            <Text className="font-inknut text-accentlight text-lg text-center 
            py-2">
              "A reader lives a thousand lives before he dies"
            </Text>
            <Text className="font-inknut text-accentlight text-sm text-center 
            py-2">
              George R.R. Martin
            </Text>
          </View>

          {/* This view will contain both of the buttons */}
          <View className="h-30 justify-end mb-10">

            <OpenButton title={ "Sign Up" }
              handlePress={() => router.push("/signup")}
              buttonSize={"px-20 pb-2 pt-5"}
              buttonColor={"bg-plight"}
              textSize={"text-xl pt-3"}
              textColor={"text-accentdark"}
            />
            <OpenButton title={ "Log In" }
              handlePress={() => router.push("/login")}
              buttonSize={"px-20 pb-2 pt-5"}
              buttonColor={"bg-plight"}
              textSize={"text-xl pt-3"}
              textColor={"text-accentdark"}
            />

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
  headerShadow: {
    textShadowColor: '#1B0B01', // White shadow color
    textShadowOffset: { width: 0, height: 11 },
    textShadowRadius: 33,
  },
  quoteShadow: {}
})

export default index;