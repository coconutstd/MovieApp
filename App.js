import React, {useState} from 'react';
import * as Font from 'expo-font'
import AppLoading from "expo-app-loading";
import {Text, Image} from "react-native";
import {Ionicons} from "@expo/vector-icons"
import { Asset, useAssets } from "expo-asset"
import {useFonts} from "expo-font";
import {NavigationContainer} from "@react-navigation/native";
import Tabs from "./navigation/Tabs";

const loadFonts = (fonts) => fonts.map(font => Font.loadAsync(font))

const loadImages = (images) => images.map((image) => {
  if (typeof image === 'string') {
    return Image.prefetch(image)
  } else {
    return Asset.loadAsync(image)
  }
})

export default function App() {
  const [assets] = useAssets([require("./my-face.jpeg")])
  const [loaded] = useFonts(Ionicons.font)
  if (!assets || !loaded) {
    return <AppLoading />
  }
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
