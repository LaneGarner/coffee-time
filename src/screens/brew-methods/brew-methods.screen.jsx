import React, { useContext, useEffect } from "react";
import { useLinkTo } from "@react-navigation/native";

import { Chemex } from "../../images/Chemex";
import { Aeropress } from "../../images/Aeropress";
import { FrenchPress } from "../../images/FrenchPress";
import { TeaLeaf } from "../../images/TeaLeaf";
import { HerbalTea } from "../../images/HerbalTea";

import { PageContainer, Heading, SafeArea, TimerTitle, TimerValue } from "../../utils/styled";
import { colors } from "../../utils/theme/colors";
import { Context } from "../../Context";

import { BrewIconContainer } from "./styled";
import { Header } from "../../utils/Header";

export const BrewMethodsScreen = () => {
  const { brewMethod, setBrewMethod, setActive, setWaterUsed } = useContext(Context);

  const linkTo = useLinkTo();

  const handleChangeBrewMethod = (brew) => {
    setBrewMethod(brew);
    linkTo("/timer");
    setActive(0);
    setWaterUsed(0);
  };

  return (
    <SafeArea>
      <Header />
      <PageContainer>
        <TimerTitle>select a brew method</TimerTitle>
        <BrewIconContainer>
          <Chemex handleChangeBrewMethod={handleChangeBrewMethod} color={colors.black} />
          <Aeropress handleChangeBrewMethod={handleChangeBrewMethod} />
        </BrewIconContainer>
        <BrewIconContainer>
          <FrenchPress handleChangeBrewMethod={handleChangeBrewMethod} color={colors.black} />
          <TeaLeaf handleChangeBrewMethod={handleChangeBrewMethod} tea="black" color={colors.black} />
        </BrewIconContainer>
        <BrewIconContainer>
          <TeaLeaf handleChangeBrewMethod={handleChangeBrewMethod} tea="green" color={colors.green} />
          <HerbalTea handleChangeBrewMethod={handleChangeBrewMethod} color={colors.black} />
        </BrewIconContainer>
      </PageContainer>
    </SafeArea>
  );
};
