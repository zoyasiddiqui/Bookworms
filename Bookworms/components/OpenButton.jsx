import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const OpenButton = ({title, handlePress, buttonSize, buttonColor, textSize, textColor}) => {
    return(
        <View className="flex justify-center items-center py-4">
            <TouchableOpacity
                onPress={handlePress}
                activeOpacity={0.6}
                className= {`rounded-full justify-center items-center 
                    ${buttonColor}
                    ${buttonSize}`} 
                    style={styles.buttonShadow}>

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
        shadowColor: '#1B0B01', // White shadow color
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 5 // For Android elevation
    }
})

export default OpenButton;
