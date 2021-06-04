import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Btn, BtnText } from "../styled";

export const RoundedButton = ({ title, onPress }) => {
  return (
    <Btn onPress={onPress}>
      <BtnText>{title}</BtnText>
    </Btn>
  );
};
