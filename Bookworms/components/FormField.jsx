import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import icons from "../../Bookworms/constants/icons.js";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`${otherStyles}`}>
      <Text className="font-inknutthin text-xl pt-8 px-5">{title}</Text>

      <View className="w-95 h-16 px-4 mx-4 bg-accentdark rounded-2xl border-2 border-plight focus:border-slight flex flex-row items-center">
        <TextInput
          className="font-inknutthin text-accentlight text-base flex-1"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
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