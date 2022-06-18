import React from "react";
import { View, Text } from "react-native";
import {TouchableOpacity} from "react-native";
import styled from 'styled-components/native'

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;


const Movies = ({ navigation: {navigate}}) => (
  <Btn onPress={() => navigate("Stack", { screen: "Three"})}>
    <Text>Movies</Text>
  </Btn>
);
export default Movies;