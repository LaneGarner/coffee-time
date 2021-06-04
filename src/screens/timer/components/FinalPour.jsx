import React, { useContext } from "react";

import { Context } from "../../../Context";
import { Sound } from "./Sound";
import { Timer } from "./Timer/Timer";
import { TimerContainer, PourContainer } from "../styled";
import { TimerTitle, TimerValue, Heading } from "../../../utils/styled";

export const FinalPour = ({ next }) => {
  const { recipe, waterUsed, brewMethod } = useContext(Context);
  let pourWater, brewTime;

  brewMethod === "chemex"
    ? (pourWater = (recipe.coffee * recipe.ratio) / 4)
    : brewMethod === "aeropress"
    ? (pourWater = (recipe.coffee * recipe.ratio) / 2)
    : (pourWater = ((recipe.coffee * recipe.ratio) / 3) * 2);

  brewMethod === "chemex" ? (brewTime = recipe.interval * 1.8) : (brewTime = recipe.interval);

  return (
    <PourContainer>
      <Sound />
      <Heading>final pour</Heading>
      <TimerContainer>
        <TimerTitle>pour to</TimerTitle>
        <TimerValue>{Math.round((waterUsed + pourWater) * 100) / 100}g</TimerValue>
      </TimerContainer>
      <TimerContainer>
        <Timer time={brewTime} next={next} addWater={pourWater} />
      </TimerContainer>
      <TimerTitle>prev pour weight</TimerTitle>
      <TimerValue>{Math.round(waterUsed)}g</TimerValue>
      <TimerTitle>final pour weight</TimerTitle>
      <TimerValue>{Math.round((recipe.coffee * recipe.ratio * 100) / 100)}g</TimerValue>
    </PourContainer>
  );
};
