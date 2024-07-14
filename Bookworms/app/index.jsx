import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OpenButton } from "../components";

const index = () => {
  <SafeAreaView>
    <ScrollView>

        <Text className="font-bodoni-italic">Bookworms</Text>
        <Image></Image>
        <OpenButton></OpenButton>
        <OpenButton></OpenButton>

    </ScrollView>
  </SafeAreaView>
}

export default index