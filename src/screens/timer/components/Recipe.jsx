import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { prototype } from "react-native/Libraries/Utilities/PixelRatio";

import { Context } from "../../../Context";

import { TimerTitle, TimerValue } from "../../../utils/styled";

import { TimerContainer, TimerContainerAlt, Btn, BtnText } from "../styled";

export const Recipe = ({ next }) => {
  const { ratio, setRatio, coffee, setCoffee, brewMethod, setBrewMethod, recipe, setRecipe, active, setActive } = useContext(Context);

  const methods = [
    {
      method: "chemex",
      ratio: 15.5,
      coffee: 60,
      grind: "medium",
      temp: 200,
      // bloom: 45,
      // interval: 90,
      bloom: 4,
      interval: 11,
    },
    {
      method: "aeropress",
      ratio: 13,
      coffee: 17.5,
      grind: "fine",
      temp: 200,
      // bloom: 60,
      // interval: 60,
      bloom: 6,
      interval: 6,
    },
    {
      method: "french press",
      ratio: 12,
      coffee: 50,
      grind: "coarse",
      temp: 200,
      bloom: 6,
      interval: 6,
    },
    {
      method: "green tea",
      ratio: 113,
      tea: 2,
      temp: 175,
      time: 180,
    },
    {
      method: "black tea",
      ratio: 113,
      tea: 2,
      temp: 205,
      time: 240,
    },
    {
      method: "herbal tea",
      ratio: 113,
      tea: 2,
      temp: 212,
      time: 600,
    },
  ];

  useEffect(() => {
    methods.forEach((method) => {
      method.method === brewMethod && setRecipe(method);
    });
  }, [brewMethod]);

  return (
    <>
      <TimerContainer>
        <TimerTitle>brew method</TimerTitle>
        <TimerValue>{brewMethod}</TimerValue>
      </TimerContainer>
      <TimerContainer>
        <TimerTitle>ratio</TimerTitle>
        <TimerValue>{recipe.ratio.toFixed(1)}:1</TimerValue>
      </TimerContainer>
      <TimerContainerAlt>
        <TimerContainer>
          <TimerTitle>water</TimerTitle>
          <TimerValue>{Math.round(recipe?.coffee * ratio * 100) / 100 || Math.round(recipe?.tea * ratio * 100) / 100}g</TimerValue>
        </TimerContainer>
        <TimerContainer>
          {recipe.coffee ? <TimerTitle>coffee</TimerTitle> : <TimerTitle>tea</TimerTitle>}
          <TimerValue>{Math.round(recipe?.coffee * 100) / 100 || Math.round(recipe?.tea * 100) / 100}g</TimerValue>
        </TimerContainer>
      </TimerContainerAlt>
      {recipe.grind && (
        <TimerContainer>
          <TimerTitle>grind</TimerTitle>
          <TimerValue>{recipe.grind}</TimerValue>
        </TimerContainer>
      )}
      <TimerContainer>
        <TimerTitle>temp</TimerTitle>
        <TimerValue>{recipe.temp}&#176; f</TimerValue>
      </TimerContainer>

      <TimerContainerAlt>
        <TimerContainer>
          <TimerTitle>bloom</TimerTitle>
          <TimerValue>{recipe.bloom}s</TimerValue>
        </TimerContainer>
        <TimerContainer>
          <TimerTitle>interval</TimerTitle>
          <TimerValue>{recipe.interval}s</TimerValue>
        </TimerContainer>
      </TimerContainerAlt>
      <Btn onPress={next}>
        <BtnText>Start</BtnText>
      </Btn>
    </>
  );
};
