import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useGlobalContext } from "../context/GlobalProvider";
import icons from "../../Bookworms/constants/icons.js";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  multilineVal, 
  numOfLines = 0,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {loading, setLoading, uploading, setUploading} = useGlobalContext();

  return (
    <View className={`${otherStyles}`}>
      <Text className="font-inknutthin text-base pt-8 px-5">{title}</Text>

      <View className="w-95 h-14 px-4 mx-4 bg-accentdark rounded-2xl border-2 border-plight focus:border-slight flex flex-row items-center">
        <TextInput
          className="text-accentlight text-base flex-1"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          multiline={multilineVal ? true : false}
          numberOfLines={numOfLines}
          onChangeText={handleChangeText}
          secureTextEntry={(title === "Password" || title === "Confirm Password") && !showPassword}
          editable={!(loading || uploading)}
          {...props}
        />

        {(title === "Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={loading || uploading}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;