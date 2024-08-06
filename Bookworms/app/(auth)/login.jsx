import { View, Text, Alert, ScrollView } from 'react-native'
import { useState } from 'react';
import { supabase } from '../../lib/supabase'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";
import FormField from "../../../Bookworms/components/FormField"
import OpenButton from "../../../Bookworms/components/OpenButton";
import Header from "../../../Bookworms/components/Header";
import { Redirect, router } from "expo-router";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Login = () => {

  // == Setting up Auth ==
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  // for when user presses the login button
  async function login() {
    setLoading(true)

    // sends a sign-in request to Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (error) Alert.alert(error.message) // should test if this detects empty fields
    setLoading(false)
  }

  // == Components to Return ==
  return ( 
    <SafeAreaView className="bg-bglight h-full flex">
      <StatusBar/>
      <ScrollView contentContainerStyle={{ height: "100%", flexGrow: 1, }}>

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
        buttonSize={"px-40 py-2"}
        buttonColor={"bg-plight"}
        buttonPadding={"py-6"}
        textSize={"text-base"}
        textColor={"text-accentdark"}
      />

      <OpenButton title={ "Don't have an account? Sign Up" }
        handlePress={() => router.push("/signup")}
        buttonSize={"px-100 py-2"}
        buttonColor={""}
        buttonPadding={"py-6"}
        textSize={"text-base"}
        textColor={"text-accentlight"}
      />
      
      </ScrollView>
    </SafeAreaView>
  );

}

export default Login