import React, { useState, useEffect, useContext } from "react";

import { Context } from "../../Context";

import { PageContainer, SafeArea } from "../../utils/styled";
import { Header } from "../../utils/Header";
import { Recipe } from "./components/Recipe";
import { Bloom } from "./components/Bloom";
import { FirstPour } from "./components/FirstPour";
import { SecondPour } from "./components/SecondPour";
import { FinalPour } from "./components/FinalPour";
import { CoffeeTime } from "./components/CoffeeTime";

export const TimerScreen = () => {
  const { active, setActive, brewMethod, recipe, setWaterUsed } = useContext(Context);

  const next = () => {
    setActive(active + 1);
  };

  let content;
  // const content = [<Recipe next={next} />, <Bloom next={next} />, <FirstPour next={next} />, <SecondPour next={next} />, <FinalPour next={next} />, <CoffeeTime next={next} />];

  console.log(brewMethod);
  {
    brewMethod === "chemex"
      ? (content = [<Recipe next={next} />, <Bloom next={next} />, <FirstPour next={next} />, <SecondPour next={next} />, <FinalPour next={next} />, <CoffeeTime next={next} />])
      : brewMethod === "aeropress"
      ? (content = [<Recipe next={next} />, <Bloom next={next} />, <FinalPour next={next} />, <CoffeeTime next={next} />])
      : brewMethod === "french press"
      ? (content = [<Recipe next={next} />, <Bloom next={next} />, <FinalPour next={next} />, <CoffeeTime next={next} />])
      : (content = [<Recipe next={next} />, <FinalPour next={next} />, <CoffeeTime next={next} />]);
  }

  {
    brewMethod === "aeropress" && (content = [<Recipe next={next} />, <Bloom next={next} />, <FinalPour next={next} />, <CoffeeTime next={next} />]);
  }

  // useEffect(() => {
  //   setActive(0);
  //   setWaterUsed(0);
  // }, [brewMethod]);

  return (
    <SafeArea>
      <Header />
      <PageContainer>{content[active]}</PageContainer>
    </SafeArea>
  );
};
