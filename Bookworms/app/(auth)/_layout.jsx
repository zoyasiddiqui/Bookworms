import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }}/>
        <Stack.Screen name="signup" options={{ headerShown: false }}/>
      </Stack>

      <StatusBar backgroundColor="#B2906B" style="dark"/>
    </>
  );
};

export default AuthLayout;