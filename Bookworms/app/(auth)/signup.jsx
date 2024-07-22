import { View, Text, Alert } from 'react-native'
import { supabase } from '../../lib/supabase'
import React from 'react'

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  // when user presses the sign in button
  async function signUp() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    if (error) Alert.alert(error.message)
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