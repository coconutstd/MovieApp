import React from 'react';
import AppLoading from "expo-app-loading";
import {Ionicons} from "@expo/vector-icons"
import {useAssets} from "expo-asset"
import {useFonts} from "expo-font";
import {NavigationContainer} from "@react-navigation/native";
import Root from "./navigation/Root";
import { Image, useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styled";
import {QueryClient, QueryClientProvider} from "react-query";
import './i18n'

const queryClient = new QueryClient()

export default function App() {
  const [assets] = useAssets([require("./my-face.jpeg")])
  const [loaded] = useFonts(Ionicons.font)
  const isDark = useColorScheme() === "dark";

  if (!assets || !loaded) {
    return <AppLoading />
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
