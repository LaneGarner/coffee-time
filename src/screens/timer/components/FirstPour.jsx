import React, { useContext } from "react";

import { Context } from "../../../Context";
import { Sound } from "./Sound";
import { Timer } from "./Timer/Timer";
import { TimerContainer, PourContainer } from "../styled";
import { TimerTitle, TimerValue, Heading, PourTitle, PourValue } from "../../../utils/styled";

export const FirstPour = ({ next }) => {
  const { recipe, waterUsed, brewMethod } = useContext(Context);
  let pourWater;
  brewMethod === "chemex" ? (pourWater = (recipe.coffee * recipe.ratio) / 3) : (pourWater = (recipe.coffee * recipe.ratio) / 2);

  return (
    <PourContainer>
      <Sound />
      <Heading>first pour</Heading>
      <TimerContainer>
        <PourTitle>pour to</PourTitle>
        <PourValue>{Math.round((waterUsed + pourWater) * 100) / 100}g</PourValue>
      </TimerContainer>
      <TimerContainer>
        <Timer time={recipe.interval} addWater={pourWater} next={next} />
      </TimerContainer>
      <TimerTitle>prev pour weight</TimerTitle>
      <TimerValue>{Math.round(waterUsed)}g</TimerValue>
      <TimerTitle>final pour weight</TimerTitle>
      <TimerValue>{Math.round(recipe.coffee * recipe.ratio * 100) / 100}g</TimerValue>
    </PourContainer>
  );
};
