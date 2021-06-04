import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Vibrate, Platform, Vibration } from "react-native";
import { useKeepAwake } from "expo-keep-awake";
import { Audio } from "expo-av";
import { Countdown } from "../../components/Countdown";
import { RoundedButton } from "../../components/RoundedButton";

import { Context } from "../../../../Context";

export const Timer = ({ time, next, addWater }) => {
  useKeepAwake();
  const { setWaterUsed, waterUsed, setRepeatAlarm } = useContext(Context);

  const [minutes, setMinutes] = useState(time / 60);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [sound, setSound] = useState();

  // const playSound = async () => {
  //   console.log("Loading Sound");
  //   const { sound } = await Audio.Sound.createAsync(require("../../../../hello.mp3"));
  //   setSound(sound);

  //   console.log("Playing Sound");
  //   await sound.playAsync();
  // }

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

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
    // playSound();

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  title: {
    // color: "white",
    textAlign: "center",
  },
  task: {
    // color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  countdown: {
    // flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    // flex: 0.3,
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
