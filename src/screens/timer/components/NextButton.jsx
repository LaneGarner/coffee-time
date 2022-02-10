import React from "react";
import { NextBtn, NextBtnText } from "../styled";

export const NextButton = ({ title, onPress }) => {
  return (
    <NextBtn onPress={onPress}>
      <NextBtnText>{title}</NextBtnText>
    </NextBtn>
  );
};
