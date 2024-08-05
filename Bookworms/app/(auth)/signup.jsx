import { View, Text, Alert, ScrollView, StyleSheet } from 'react-native'
import { supabase } from '../../lib/supabase'
import React from 'react'
import { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";
import FormField from "../../../Bookworms/components/FormField"
import OpenButton from "../../../Bookworms/components/OpenButton";

NativeWindStyleSheet.setOutput({
  default: "native",
});

// TODO: get submit button functioning
// TODO: ensure password meets some criteria

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
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

      //empty the confirm password field
      setForm({...form, confirmPassword: '',});
      return;
    }

    // sends a sign-up request to Supabase
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      firstName: form.firstName,
      lastName: form.lastName,
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

        <Text className="text-4xl text-plight font-bodonibold text-center 
          py-4 mt-10"
          style={styles.headerShadow}>
            Sign Up
        </Text>

        <FormField
          title="First Name"
          value={form.firstName}
          handleChangeText={(e) => setForm({...form, firstName: e})}
          otherStyles=""
        />

        <FormField
          title="Last Name"
          value={form.lastName}
          handleChangeText={(e) => setForm({...form, lastName: e})}
          otherStyles=""
        />

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({...form, email: e})}
          otherStyles=""
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({...form, password: e})}
          otherStyles="mb-8"
        />

        <OpenButton title={ "Submit" }
          handlePress={signUp}
          buttonSize={"px-40 py-2"}
          buttonColor={"bg-plight"}
          textSize={"text-base"}
          textColor={"text-accentdark"}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerShadow: {
    textShadowColor: '#1B0B01', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
})

export default SignUp