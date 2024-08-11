import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";


const HomeLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="profile" options={{ headerShown: false }}/>
      </Stack>

      <StatusBar backgroundColor="#B2906B" style="dark"/>
    </>
  )
}

export default HomeLayout