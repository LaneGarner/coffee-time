import React from "react";
import { Btn, BtnText } from "../styled";

export const RoundedButton = ({ title, onPress }) => {
  return (
    <Btn onPress={onPress}>
      <BtnText>{title}</BtnText>
    </Btn>
  );
};
