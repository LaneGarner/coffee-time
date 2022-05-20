import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Vibrate, Platform, Vibration } from "react-native";
import { useKeepAwake } from "expo-keep-awake";
import { Audio } from "expo-av";
import { Countdown } from "../../components/Countdown";
import { RoundedButton } from "../../components/RoundedButton";
import { NextButton } from "../../components/NextButton";

import { Context } from "../../../../Context";

export const Timer = ({ time, next, addWater }) => {
  useKeepAwake();
  const { setWaterUsed, waterUsed, setRepeatAlarm } = useContext(Context);

  const [minutes, setMinutes] = useState(time / 60);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [sound, setSound] = useState();

  const newWaterUsed = waterUsed + addWater;

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 5000);
    } else {
      Vibration.vibrate(5000);
    }
  };

  const startTimer = () => {
    setRepeatAlarm(false);
    setIsStarted(true);
  };

  const onEnd = () => {
    vibrate();
    setWaterUsed(newWaterUsed);
    setProgress(1);
    setIsStarted(false);
    next();
  };

  return (
    <View>
      <View style={styles.countdown}>
        <Countdown onEnd={onEnd} minutes={minutes} isPaused={!isStarted} onProgress={onProgress} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? <RoundedButton title="pause" onPress={() => setIsStarted(false)} /> : <RoundedButton title="start" onPress={startTimer} />}
      </View>
      <NextButton title="next" onPress={onEnd} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  task: {
    fontWeight: "bold",
    textAlign: "center",
  },
  countdown: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
