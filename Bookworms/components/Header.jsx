import { StyleSheet, Text } from 'react-native'
import React from 'react'

const Header = ({title, font, size, padding, margin}) => {
  return (
    <Text className={`text-plight text-center ${size} ${font} ${padding} ${margin}`}
    style={styles.textShadow}>
            {title}
    </Text>
  )
}

export default Header

const styles = StyleSheet.create({
    textShadow: {
      textShadowColor: '#1B0B01', 
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1
    }
})