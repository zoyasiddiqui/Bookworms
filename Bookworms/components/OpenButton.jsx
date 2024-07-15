import { TouchableOpacity, Text, View } from "react-native";

const OpenButton = ({ title, handlePress }) => {
    return(
        <View className="flex justify-center items-center py-5">
            <TouchableOpacity
                onPress={handlePress}
                activeOpacity={0.6}
                className="bg-plight rounded-xl justify-center items-center w-70"
            >
                <Text className="font-inknut text-accentdark text-2xl py-4 justify-center items-center">
                    { title }
                </Text>

            </TouchableOpacity>
        </View>
    );
};

export default OpenButton;

