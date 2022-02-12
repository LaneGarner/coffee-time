import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { initialData } from './data'

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [dataLoading, setDataLoading] = useState(true)
  const [methods, setMethods] = useState([]);
  const [brewMethod, setBrewMethod] = useState("");
  const [recipe, setRecipe] = useState({});
  const [waterUsed, setWaterUsed] = useState(0);
  const [active, setActive] = useState(0);
  const [repeatAlarm, setRepeatAlarm] = useState();

  const setInitialData = async () => {
    console.log('set initial data');

    //load my chemex recipe on initial load
    setMethods(initialData);
    setRecipe(initialData[0]);
    setBrewMethod(initialData[0].method)
    //set to local storage for future loads
    try {
      await AsyncStorage.setItem('data', JSON.stringify({methods, brewMethod, recipe }))
    } catch (e) {
      console.error(e)
    }
  }
  
  const setStoredData = (data) => {
    console.log('set stored data: ', data);
    setMethods(data.methods);
    setRecipe(data.recipe);
    setBrewMethod(data.brewMethod);
  }

  const handleAnimation = () => {
    setDataLoading(false);
    // AsyncStorage.removeItem('data')
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem('data');
        data ? setStoredData(JSON.parse(data)) : setInitialData();
      } catch (e) {
        console.error(e);
      } finally {
        handleAnimation()
      }
    })()
  }, [])

  const value = {
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
    methods,
    setMethods,
    dataLoading,
    setDataLoading
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
