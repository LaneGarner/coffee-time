import React, { useContext } from "react";

import { Context } from "../../../Context";
import { Timer } from "./Timer/Timer";
import { TimerContainer, PourContainer } from "../styled";
import { TimerTitle, TimerValue, Heading } from "../../../utils/styled";

export const Bloom = ({ next }) => {
  const { recipe, brewMethod } = useContext(Context);

  let bloomWater;

  brewMethod === "chemex"
    ? (bloomWater = (recipe.coffee * recipe.ratio) / 6)
    : brewMethod === "aeropress"
    ? (bloomWater = (recipe.coffee * recipe.ratio) / 2)
    : brewMethod === "french press"
    ? (bloomWater = (recipe.coffee * recipe.ratio) / 3)
    : (bloomWater = (recipe.coffee * recipe.ratio) / 8);

  return (
    <PourContainer>
      <Heading>bloom</Heading>
      <TimerContainer>
        <TimerContainer>
          <TimerTitle>pour</TimerTitle>
          <TimerValue>{Math.round(bloomWater * 100) / 100}g</TimerValue>
        </TimerContainer>
        <Timer next={next} time={Math.round(recipe.bloom)} addWater={bloomWater} />
      </TimerContainer>
      <TimerTitle>final pour weight</TimerTitle>
      <TimerValue>{Math.round(recipe.coffee * recipe.ratio * 100) / 100}g</TimerValue>
    </PourContainer>
  );
};
