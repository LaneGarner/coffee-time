import React, { useEffect, useState, useContext } from "react";
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from "styled-components/native";

import { ContextProvider } from "./src/Context";
import { theme } from "./src/utils/theme";
import { Main } from './src/screens/Main'


const App = () => {
  // const [loading, setLoading] = useState(true);

  // setTimeout(() => {
  //   setLoading(false)
  // }, 1000)


  // if(loading){
  //   return <AppLoading />
  // }

  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </ContextProvider>
  );
};

export default App;
