import React from "react";
import { View, Text } from "react-native";
import {TouchableOpacity} from "react-native";

const Movies = ({ navigation: {navigate}}) => (
  <TouchableOpacity onPress={() => navigate("Stack", { screen: "Three"})} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Movies</Text>
  </TouchableOpacity>
);
export default Movies;