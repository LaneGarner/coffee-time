import React, {useEffect, useState, useCallback} from "react";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import { ContextProvider } from "./src/Context";
import { theme } from "./src/utils/theme/index";
import { TimerScreen } from "./src/screens/timer/timer.screen";
import { BrewMethodsScreen } from "./src/screens/brew-methods/brew-methods.screen";
import { SettingsScreen } from "./src/screens/settings/settings.screen";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Timer: "timer-outline",
  "Brew Methods": "water-outline",
  Settings: "settings-outline",
};

const tabBarIcon =
  (iconName) =>
  ({ size, color }) =>
    <Ionicons name={iconName} size={size} color={color} />;

const screenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: tabBarIcon(iconName),
  };
};

const linking = {
  config: {
    screens: {
      Timer: "timer",
      "Brew Methods": "brew-methods",
    },
  },
};

const App = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(()=> {
    setLoading(false)
  }, 1500)

  if(loading){
    return <AppLoading />
  }

  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer linking={linking}>
          <Tab.Navigator
            screenOptions={screenOptions}
            tabBarOptions={{
              activeTintColor: "dodgerblue",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="Timer" component={TimerScreen} />
            <Tab.Screen name="Brew Methods" component={BrewMethodsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </ContextProvider>
  );
};

export default App;
