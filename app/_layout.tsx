import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

// import 'react-native-reanimated';
// import 'react-native-get-random-values';

import { ContentProvider } from "@/Contexts/ContentFunctions";

import { Provider } from "react-redux";
import store from "@/redux/store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Fuzzy Bubbles": require("../assets/fonts/FuzzyBubbles-Regular.ttf"),
    "Nunito Sans": require("../assets/fonts/NunitoSans-regular.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <ContentProvider>
        {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
        <>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="verification/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="forgotpassword/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </>
        {/* </ThemeProvider> */}
      </ContentProvider>
    </Provider>
  );
}

// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect } from 'react';
// import 'react-native-reanimated';
// import 'react-native-get-random-values';

// import { useColorScheme } from '@/hooks/useColorScheme';

// import { ContentProvider } from '@/Contexts/ContentFunctions';

// // redux:
// import { Provider } from 'react-redux'; // Import Redux Provider
// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from '@/redux/store/rootReducer';
// import store from '@/redux/store'; // This will automatically resolve to index.ts in the store folder

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//     const [fontsLoaded] = useFonts({
//         'Fuzzy Bubbles': require('../assets/fonts/FuzzyBubbles-Regular.ttf'),
//     });

//     const store = configureStore({
//         reducer: rootReducer,
//     });

//     const colorScheme = useColorScheme();
//     const [loaded] = useFonts({
//         SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     });

//     useEffect(() => {
//         if (loaded) {
//             SplashScreen.hideAsync();
//         }
//     }, [loaded]);

//     if (!loaded) {
//         return null;
//     }

//     return (
//         <Provider store={store}>
//             <ContentProvider>
//                 {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}

//                 <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//                     <Stack>
//                         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//                         <Stack.Screen name="verification/[id]" options={{ title: 'Verification', headerShown: false }} />
//                         <Stack.Screen name="forgotpassword/[id]" options={{ title: 'Forgot Password', headerShown: false }} />
//                         <Stack.Screen name="+not-found" />
//                     </Stack>
//                     <StatusBar style="auto" />
//                 </ThemeProvider>
//             </ContentProvider>
//         </Provider>
//     );
// }
