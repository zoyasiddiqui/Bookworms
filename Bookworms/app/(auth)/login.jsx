import { View, Text, Alert } from 'react-native'
import { supabase } from '../../lib/supabase'
import React from 'react'

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  // for when user presses the login button
  async function login() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (error) Alert.alert(error.message) // should test if this detects empty fields
    setLoading(false)
  }

  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

export default Login