import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeWindStyleSheet } from "nativewind";
import OpenButton from "../../Bookworms/components/OpenButton";
import { useState, useEffect } from "react";
import { supabase } from '../lib/supabase'

NativeWindStyleSheet.setOutput({
  default: "native",
});

const index = () => {
  // will eventually use to prevent the user from relogging in everytime they open the app
  const [session, setSession] = useState(null) 

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return(
    <SafeAreaView className="bg-bglight h-full flex">
      <StatusBar/>
      <ScrollView contentContainerStyle={{ height: "100%", flexGrow: 1, }}>

        {/* This will contain all of the elements */}
        <View className="px-4 items-center flex-1 justify-between">
          {/* This view will contain the title and the logo */}
          <View className="justify-center items-centers flex-1">
            <Text className="text-6xl text-plight font-bodoniitalic text-center 
            py-4 mt-5"
            style={styles.headerShadow}>
              Bookworms
            </Text>

            <View className="justify-center items-center pb-8">
              <Image
                source={require('../assets/images/Logo.png')}
                style={{ width: 240, height: 160 }}
              />
            </View>

            <Text className="font-inknut text-base text-center pt-8 px-10 text-accentlight">
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
              textSize={"text-xl"}
              textColor={"text-accentdark"}
            />
            <OpenButton title={ "Log In" }
              handlePress={() => router.push("/login")}
              buttonSize={"px-20 py-3"}
              buttonColor={"bg-plight"}
              textSize={"text-xl"}
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
    textShadowColor: '#1B0B01', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
})

export default index;