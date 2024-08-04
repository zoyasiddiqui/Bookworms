import { View, Text, Alert, ScrollView } from 'react-native'
import { supabase } from '../../lib/supabase'
import React from 'react'
import { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)

  // when user presses the sign in button
  async function signUp() {
    setLoading(true)

    // check if the user retyped their password correctly
    if (form.password !== form.confirmPassword) {
      Alert.alert("Your password doesn't match")
      setLoading(false)

      // maybe we should empty the comfirm password and/or password field
      return
    }

    // sends a sign-up request to Supabase
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    if (error) Alert.alert(error.message)

    // no session means the user needs to verify their email
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <SafeAreaView className="bg-bglight h-full flex">
      <StatusBar/>
      <ScrollView contentContainerStyle={{ height: "100%", flexGrow: 1, }}>
      
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUp