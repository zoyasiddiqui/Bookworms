import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const OpenButton = ({title, handlePress, buttonSize, buttonColor, buttonPadding, textSize, textColor, shadow}) => {
    return(
        <View className={`flex justify-center items-center ${buttonPadding}`}>
            <TouchableOpacity
                onPress={handlePress}
                activeOpacity={0.8}
                className= {`justify-center items-center 
                    ${buttonColor}
                    ${buttonSize}`}
                    style={shadow ? styles.buttonShadow : styles.noShadow}>

                <Text className={`font-inknut justify-center items-center pt-4
                    ${textSize}
                    ${textColor}`}>
                    { title }
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonShadow: {
        shadowColor: '#1B0B01', // black shadow color
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 5 // For Android elevation
    }, 
    noShadow: {}
})

export default OpenButton;
