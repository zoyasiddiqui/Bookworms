import { View, Text, Alert } from 'react-native'
import { supabase } from '../../lib/supabase'
import React from 'react'

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
    <View>
      <Text>SignUp</Text>
    </View>
  )
}

export default SignUp