import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import {useColorScheme} from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark"

  return (
  <Tab.Navigator screenOptions={{tabBarStyle: {
      backgroundColor: isDark ? "black" : "white"
    }}}>
    <Tab.Screen name="무비" component={Movies} />
    <Tab.Screen name="티비" component={Tv} />
    <Tab.Screen name="검색" component={Search} />
  </Tab.Navigator>
)};

export default Tabs;