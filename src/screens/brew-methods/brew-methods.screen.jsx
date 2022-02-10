import React, { useContext } from "react";
import { useLinkTo } from "@react-navigation/native";
import { Chemex } from "../../images/Chemex";
import { Aeropress } from "../../images/Aeropress";
import { FrenchPress } from "../../images/FrenchPress";

import { PageContainer, SafeArea, TimerTitle } from "../../utils/styled";
import { colors } from "../../utils/theme/colors";
import { Context } from "../../Context";

import { BrewIconContainer, BrewMethodsContainerStyled } from "./styled";
import { Header } from "../../utils/Header";

export const BrewMethodsScreen = () => {
  const { setBrewMethod, setActive, setWaterUsed } = useContext(Context);

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
        <BrewMethodsContainerStyled>
          <TimerTitle>select a brew method</TimerTitle>
          <BrewIconContainer>
            <Chemex handleChangeBrewMethod={handleChangeBrewMethod} color={colors.black} />
          </BrewIconContainer>
          <BrewIconContainer>
            <FrenchPress handleChangeBrewMethod={handleChangeBrewMethod} color={colors.black} />
            <Aeropress handleChangeBrewMethod={handleChangeBrewMethod} />
          </BrewIconContainer>
        </BrewMethodsContainerStyled>
      </PageContainer>
    </SafeArea>
  );
};
