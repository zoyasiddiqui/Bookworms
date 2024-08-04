import { View, Text, Alert, ScrollView } from 'react-native'
import { supabase } from '../../lib/supabase'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";

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
      
      </ScrollView>
    </SafeAreaView>
  );

}

export default Login