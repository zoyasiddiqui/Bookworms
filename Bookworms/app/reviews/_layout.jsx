import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";


const ReviewLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="create_review" options={{ headerShown: false }}/>
        <Stack.Screen name="view_review" options={{ headerShown: false }}/>
      </Stack>

      <StatusBar backgroundColor="#B2906B" style="dark"/>
    </>
  )
}

export default ReviewLayout