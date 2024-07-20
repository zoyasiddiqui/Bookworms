import React from 'react'
import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  
  const [fontsLoaded, error] = useFonts({
    "Bodoni": require("../assets/fonts/BodoniModa_18pt-Regular.ttf"),
    "Bodoni-Bold": require("../assets/fonts/BodoniModa_18pt-Bold.ttf"),
    "Bodoni-Italic": require("../assets/fonts/BodoniModa_18pt-SemiBoldItalic.ttf"),
    "Inknut": require("../assets/fonts/InknutAntiqua-Regular.ttf"),
    "Inknut-Light": require("../assets/fonts/InknutAntiqua-Light.ttf"),
    "Inknut-Bold": require("../assets/fonts/InknutAntiqua-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  return(
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
    </Stack>
  );

}

export default RootLayout;