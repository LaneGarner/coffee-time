import React, { useContext } from "react";

import { Context } from "../../../Context";
import { Sound } from "./Sound";
import { Timer } from "./Timer/Timer";
import { TimerContainer, PourContainer } from "../styled";
import { TimerTitle, TimerValue, Heading, PourTitle, PourValue } from "../../../utils/styled";

export const SecondPour = ({ next }) => {
  const { recipe, waterUsed } = useContext(Context);
  const pourWater = (recipe.coffee * recipe.ratio) / 4;

  return (
    <PourContainer>
      <Sound />
      <Heading>second pour</Heading>
      <TimerContainer>
        <PourTitle>pour to</PourTitle>
        <PourValue>{Math.round(((waterUsed + pourWater) * 100) / 100)}</PourValue>
      </TimerContainer>
      <TimerContainer>
        <Timer time={recipe.interval} next={next} addWater={pourWater} />
      </TimerContainer>
      <TimerTitle>prev pour weight</TimerTitle>
      <TimerValue>{Math.round(waterUsed)}g</TimerValue>
      <TimerTitle>final pour weight</TimerTitle>
      <TimerValue>{Math.round(recipe.coffee * recipe.ratio * 100) / 100}g</TimerValue>
    </PourContainer>
  );
};
