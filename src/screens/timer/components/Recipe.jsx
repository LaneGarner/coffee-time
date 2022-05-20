import React, { useState, useEffect, useContext } from "react";
import { Pressable, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Context } from "../../../Context";
import { TimerTitle, TimerValue, TimerValueEdit } from "../../../utils/styled";
import { TouchableTimerContainer, TimerContainer, TimerContainerAlt, Btn, BtnText } from "../styled";

export const Recipe = ({ next }) => {
  const { brewMethod, recipe, setRecipe, methods, setMethods } = useContext(Context);
  
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
    editCoffee && setEditCoffee(false)
    editRatio && setEditRatio(false)
    editTemp && setEditTemp(false)
    editBloom && setEditBloom(false)
    editInterval && setEditInterval(false)
  }

  useEffect(() => {
    if (coffeeState === "" || ratioState === "" || tempState === "" || bloomState === "" || intervalState === "") return;
    // TODO: local storage
    setRecipe({ ...recipe, coffee: parseInt(coffeeState), ratio: parseFloat(ratioState), temp: parseInt(tempState), bloom: parseInt(bloomState), interval: parseInt(intervalState) });
  }, [coffeeState, ratioState, tempState, bloomState, intervalState]);

  useEffect(() => methods.forEach((item) => item.method === brewMethod && setRecipe(item)), [brewMethod]);

  useEffect(()=> {
    const updatedMethods = [];
    methods.forEach(m => m.method === brewMethod ? updatedMethods.push(recipe) : updatedMethods.push(m))
    setMethods(updatedMethods)
  }, [recipe])
  
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('data', JSON.stringify({methods, brewMethod, recipe }))
      } catch (e) {
        console.error(e)
      }
    })()
  }, [methods])

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
