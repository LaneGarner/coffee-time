import React, { useContext } from 'react';
import {  Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { TimerScreen } from "../timer/timer.screen";
import { BrewMethodsScreen } from "../brew-methods/brew-methods.screen";
import { SettingsScreen } from "../settings/settings.screen";
import { Context } from '../../Context'

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Timer: "timer-outline",
  "Brew Methods": "water-outline",
  Settings: "settings-outline",
};

const tabBarIcon = (iconName) => ({ size, color }) => <Ionicons name={iconName} size={size} color={color} />;

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

export const Main = () => {
  const { dataLoading } = useContext(Context);

  if (dataLoading) {
    return (
      // <NavigationContainer>
        // <Stack.Navigator>
        <Text style={{alignItems: 'center', justifyContent: 'center'}}>Loading</Text>
        // </Stack.Navigator>
      // </NavigationContainer>
    )
  } 
    return (
      <NavigationContainer linking={linking}>
        <Tab.Navigator
          screenOptions={screenOptions}
          tabBarOptions={{
            activeTintColor: "dodgerblue",
            inactiveTintColor: "grey",
          }}
        >
          <Tab.Screen name="Timer" component={TimerScreen} />
          <Tab.Screen name="Brew Methods" component={BrewMethodsScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    )
};