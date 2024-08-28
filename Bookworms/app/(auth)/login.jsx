import { View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import { supabase } from '../../lib/supabase'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";
import FormField from "../../../Bookworms/components/FormField"
import OpenButton from "../../../Bookworms/components/OpenButton";
import Header from "../../../Bookworms/components/Header";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Login = () => {

  // == Setting up Auth ==
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const {loading, setLoading} = useGlobalContext();

  // for when user presses the login button
  async function login() {
    setLoading(true)

    // sends a sign-in request to Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (error) {
      Alert.alert(error.message)
      setLoading(false)
      return;
    }
    setLoading(false)

    router.push("../(tabs)/profile")
  }

  // == Components to Return ==
  return ( 
    <SafeAreaView className="bg-bglight h-full flex">
      <StatusBar/>
      <ScrollView contentContainerStyle={{ flexGrow: 1, }}>

      <Header
          title="Log In"
          font="font-bodonibold"
          size="text-4xl"
          padding="pt-4 pb-2"
          margin="mt-10"
        />

      <FormField
        title="Email"
        value={form.email}
        handleChangeText={(e) => setForm({...form, email: e})}
        otherStyles="py-8"
        keyboardType="email-address"
      />

      <FormField
        title="Password"
        value={form.password}
        handleChangeText={(e) => setForm({...form, password: e})}
        otherStyles="pt-4 pb-12"
      />

      <OpenButton title={ "Submit" }
        handlePress={() => login()}
        buttonSize={"w-80 h-16"}
        buttonColor={"bg-plight"}
        buttonPadding={"py-6"}
        buttonRound={true}
        textSize={"text-base pt-4"}
        textColor={"text-accentdark"}
      />

      <View className={`flex justify-center items-center py-3`}>
          <TouchableOpacity
              onPress={() => router.push("/signup")}
              activeOpacity={0.6}
              className= {"rounded-full justify-center items-center w-100 h-16"}
              disabled={loading}    
          >

              <Text className={"font-inknut justify-center items-center pt-4 text-base text-accentlight"}>
                Don't have an account? Sign Up
              </Text>
          </TouchableOpacity>
      </View>
      
      </ScrollView>
    </SafeAreaView>
  );

}

export default Login