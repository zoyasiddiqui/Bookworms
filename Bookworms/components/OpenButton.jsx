import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useGlobalContext } from "../context/GlobalProvider";

const OpenButton = ({title, handlePress, buttonSize, buttonColor, buttonPadding, buttonRound, textSize, textColor, shadow, font='font-inknut', additionalStyling}) => {
    const {loading, setLoading, uploading, setUploading} = useGlobalContext();

    return(
        <View className={`flex justify-center items-center ${buttonPadding} ${additionalStyling}`}>
            <TouchableOpacity
                onPress={handlePress}
                activeOpacity={0.8}
                className= {`justify-center items-center 
                    ${buttonRound ? "rounded-full" : ""}
                    ${buttonColor}
                    ${buttonSize}`}
                    style={shadow ? styles.buttonShadow : styles.noShadow}
                    disabled={loading || uploading}
            >

                <Text className={`${font} justify-center items-center
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
