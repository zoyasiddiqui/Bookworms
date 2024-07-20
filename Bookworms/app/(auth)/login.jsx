import { View, Text, AppState, Alert } from 'react-native'
import { supabase } from '../../lib/supabase'
import React from 'react'

// Supabase Auth continuously refreshes to check state changes (token refreshed or signed out)
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

const Login = () => {
  const [email, setEmail] = useState('') // unless we want this to be username, or want option to use either
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // for when use presses the login button
  async function login() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

export default Login