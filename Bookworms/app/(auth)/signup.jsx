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

const SignUp = () => {
  return (
    <View>
      <Text>SignUp</Text>
    </View>
  )
}

export default SignUp