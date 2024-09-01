import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";


const QuoteLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="create_quote" options={{ headerShown: false }}/>
        <Stack.Screen name="view_quote" options={{ headerShown: false }}/>
      </Stack>

      <StatusBar backgroundColor="#B2906B" style="dark"/>
    </>
  )
}

export default QuoteLayout