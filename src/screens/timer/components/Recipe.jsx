import React, { useState, useEffect, useContext } from "react";
import { Pressable, View } from "react-native";

import { Context } from "../../../Context";

import { TimerTitle, TimerValue, TimerValueEdit } from "../../../utils/styled";
import { TouchableTimerContainer, TimerContainer, TimerContainerAlt, Btn, BtnText } from "../styled";

const methods = [
    {
      method: "chemex",
      ratio: 15.5,
      coffee: 60,
      grind: "medium",
      temp: 200,
      bloom: 45,
      interval: 90,
      // bloom: 4,
      // interval: 11,
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

export const Recipe = ({ next }) => {
  const { brewMethod, recipe, setRecipe } = useContext(Context);
  
  const [coffeeState, setCoffeeState] = useState(Math.round(recipe.coffee).toString());
  const [editCoffee, setEditCoffee] = useState(false);
  
  const [ratioState, setRatioState] = useState(recipe.ratio.toString());
  const [editRatio, setEditRatio] = useState(false);
  
  const [tempState, setTempState] = useState(recipe.temp.toString());
  const [editTemp, setEditTemp] = useState(false);

  const [bloomState, setBloomState] = useState(recipe.bloom.toString());
  const [editBloom, setEditBloom] = useState(false);
  
  const [intervalState, setIntervalState] = useState(recipe.interval.toString());
  const [editInterval, setEditInterval] = useState(false);

  const handleEditCoffee = () => setEditCoffee(!editCoffee);
  const handleEditRatio = () => setEditRatio(!editRatio);
  const handleEditTemp = () => setEditTemp(!editTemp);
  const handleEditBloom = () => setEditBloom(!editBloom);
  const handleEditInterval = () => setEditInterval(!editInterval);

  const handleDismissEdit = () => {
    if (editCoffee) {
      setEditCoffee(false)
    } else if (editRatio) {
      setEditRatio(false)
    } else if (editTemp) {
      setEditTemp(false)
    } else if (editBloom) {
      setEditBloom(false)
    } else if (editInterval) {
      setEditInterval(false)
    }
  }

  useEffect(() => {
    if (coffeeState === "" || ratioState === "" || tempState === "" || bloomState === "" || intervalState === "") return;
    // TODO: local storage
    setRecipe({ ...recipe, coffee: parseInt(coffeeState), ratio: parseFloat(ratioState), temp: parseInt(tempState), bloom: parseInt(bloomState), interval: parseInt(intervalState) });
  }, [coffeeState, ratioState, tempState, bloomState, intervalState]);

  useEffect(() => methods.forEach((item) => item.method === brewMethod && setRecipe(item)), [brewMethod]);

  return (
    <Pressable style={{width: '100%', alignItems: 'center'}} onPress={handleDismissEdit}>
      <TimerContainer>
        <TimerTitle>brew method</TimerTitle>
        <TimerValue>{brewMethod}</TimerValue>
      </TimerContainer>
      <TouchableTimerContainer onPress={handleEditRatio}>
        <TimerTitle>ratio</TimerTitle>
        {editRatio ? (
          <View style={{ flexDirection: "row" }}>
            <TimerValueEdit onChangeText={setRatioState} value={ratioState} keyboardType="decimal-pad" keyboardAppearance="dark" autoFocus />
            <TimerValue>:1</TimerValue>
          </View>
          ) : (
          <TimerValue>{recipe.ratio % 1 === 0 ? recipe.ratio : recipe.ratio.toFixed(1)}:1</TimerValue>
          )
        }
      </TouchableTimerContainer>
      <TimerContainerAlt>
        <TimerContainer>
          <TimerTitle>water</TimerTitle>
          <TimerValue>{Math.round(recipe?.coffee * recipe.ratio * 100) / 100 || Math.round(recipe?.tea * recipe.ratio * 100) / 100}g</TimerValue>
        </TimerContainer>
        {recipe.coffee && (
          <TouchableTimerContainer onPress={handleEditCoffee}>
            <TimerTitle>coffee</TimerTitle>
            {editCoffee ? (
              <View style={{ flexDirection: "row" }}>
                <TimerValueEdit onChangeText={setCoffeeState} value={coffeeState} keyboardType="decimal-pad" keyboardAppearance="dark" autoFocus />
                <TimerValue>g</TimerValue>
              </View>
            ) : (
              <TimerValue>{Math.round(recipe.coffee)}g</TimerValue>
            )}
          </TouchableTimerContainer>
        )}
        {recipe.tea && (
          <TimerContainer>
            {<TimerTitle>tea</TimerTitle>}
            <TimerValue>{Math.round(recipe.tea * 100) / 100}g</TimerValue>
          </TimerContainer>
        )}
      </TimerContainerAlt>
      {recipe.grind && (
        <TimerContainer>
          <TimerTitle>grind</TimerTitle>
          <TimerValue>{recipe.grind}</TimerValue>
        </TimerContainer>
      )}
      <TouchableTimerContainer onPress={handleEditTemp}>
        <TimerTitle>temp</TimerTitle>
        {editTemp ? (
          <View style={{ flexDirection: "row" }}>
            <TimerValueEdit onChangeText={setTempState} value={tempState} keyboardType="decimal-pad" keyboardAppearance="dark" autoFocus />
            <TimerValue>&#176; f</TimerValue>
          </View>
          ) : (
          <TimerValue>{recipe.temp}&#176; f</TimerValue>
          )
        }
      </TouchableTimerContainer>
      <TimerContainerAlt>
        <TouchableTimerContainer onPress={handleEditBloom}>
          <TimerTitle>bloom</TimerTitle>
            {editBloom ? (
            <View style={{ flexDirection: "row" }}>
              <TimerValueEdit onChangeText={setBloomState} value={bloomState} keyboardType="decimal-pad" keyboardAppearance="dark" autoFocus />
              <TimerValue>s</TimerValue>
            </View>
            ) : (
            <TimerValue>{recipe.bloom}s</TimerValue>
            )
          }

        </TouchableTimerContainer>
        <TouchableTimerContainer onPress={handleEditInterval}>
          <TimerTitle>interval</TimerTitle>
          {editInterval ? (
            <View style={{ flexDirection: "row" }}>
              <TimerValueEdit onChangeText={setIntervalState} value={intervalState} keyboardType="decimal-pad" keyboardAppearance="dark" autoFocus />
              <TimerValue>s</TimerValue>
            </View>
            ) : (
            <TimerValue>{recipe.interval}s</TimerValue>
            )
          }
        </TouchableTimerContainer>
      </TimerContainerAlt>
      <Btn style={{ marginTop: 25 }} onPress={next}>
        <BtnText>start</BtnText>
      </Btn>
    </Pressable>
  );
};
