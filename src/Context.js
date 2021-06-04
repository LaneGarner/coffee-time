import React, { useState, createContext } from "react";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [ratio, setRatio] = useState(15.5);
  const [coffee, setCoffee] = useState(60);
  const [brewMethod, setBrewMethod] = useState("chemex");
  const [recipe, setRecipe] = useState({
    method: "chemex",
    ratio: 15.5,
    coffee: 60,
    grind: "medium",
    temp: 200,
    bloom: 45,
    interval: 90,
  });
  const [waterUsed, setWaterUsed] = useState(0);

  const [active, setActive] = useState(0);

  const [repeatAlarm, setRepeatAlarm] = useState();

  const value = {
    ratio,
    setRatio,
    coffee,
    setCoffee,
    brewMethod,
    setBrewMethod,
    recipe,
    setRecipe,
    active,
    setActive,
    waterUsed,
    setWaterUsed,
    repeatAlarm,
    setRepeatAlarm,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
