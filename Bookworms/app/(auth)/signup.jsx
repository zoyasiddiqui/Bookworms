import { View, Text, Alert, ScrollView, StyleSheet } from 'react-native'
import { supabase } from '../../lib/supabase'
import React from 'react'
import { useState } from 'react'
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

    //check that all fields have something in them
    if (form.firstName == '' || form.lastName == '' || form.email == '' || form.password == '') {
      Alert.alert("Please ensure no fields are empty.")
      setLoading(false)

      return;
    }

    // check if the user retyped their password correctly
    if (form.password !== form.confirmPassword) {
      Alert.alert("Your passwords don't match.")
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

        <Header
          title="Sign Up"
          font="font-bodonibold"
          size="text-4xl"
          padding="pt-4 pb-2"
          margin="mt-10"
        />

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
          otherStyles=""
        />

        <FormField
          title="Confirm Password"
          value={form.confirmPassword}
          handleChangeText={(e) => setForm({...form, confirmPassword: e})}
          otherStyles="mb-4"
        />

        <OpenButton title={ "Submit" }
          handlePress={() => signUp()}
          buttonSize={"px-40 py-2"}
          buttonColor={"bg-plight"}
          buttonPadding={"py-2"}
          textSize={"text-base"}
          textColor={"text-accentdark"}
        />

        <OpenButton title={ "Already have an account? Log In" }
          handlePress={() => router.push("/login")}
          buttonSize={"px-100 py-2"}
          buttonColor={""}
          buttonPadding={""}
          textSize={"text-base"}
          textColor={"text-accentlight"}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUp