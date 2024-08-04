import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Loader } from "../../../Bookworms/components/Loader";
import React from "react";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }}/>
        <Stack.Screen name="signup" options={{ headerShown: false }}/>
      </Stack>

      {/* Set isLoading to false for now. Later, when we have an actual variable to check if its loading, we'll use that. */}
      {/* <Loader isLoading={false}/>  */}
      <StatusBar backgroundColor="#B2906B" style="dark"/>
    </>
  );
};

export default AuthLayout;