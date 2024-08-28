import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";


const ShelvesLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="create_shelf" options={{ headerShown: false }}/>
        <Stack.Screen name="view_shelf" options={{ headerShown: false }}/>
      </Stack>

      <StatusBar backgroundColor="#B2906B" style="dark"/>
    </>
  )
}

export default ShelvesLayout