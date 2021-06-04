import React, { useContext, useEffect } from "react";
import { useLinkTo } from "@react-navigation/native";

import { Context } from "../../../Context";
import { PourContainer } from "../styled";
import { Sound } from "./Sound";
import { TimerTitle, TimerValue } from "../../../utils/styled";

export const CoffeeTime = () => {
  const { setActive, setWaterUsed } = useContext(Context);
  const linkTo = useLinkTo();

  useEffect(() => {
    setTimeout(() => {
      linkTo("/timer");
      setActive(0);
      setWaterUsed(0);
    }, 6000);
  }, []);

  return (
    <PourContainer>
      <Sound />
      <TimerTitle>it's coffee time...</TimerTitle>
      <TimerValue>enjoy!</TimerValue>
    </PourContainer>
  );
};
