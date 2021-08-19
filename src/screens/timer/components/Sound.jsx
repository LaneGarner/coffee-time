import { useState, useEffect, useContext, useRef } from "react";
import { Audio } from "expo-av";

import { Context } from "../../../Context";

export const Sound = () => {
  const [sound, setSound] = useState();
  const { repeatAlarm, setRepeatAlarm } = useContext(Context);
  const playSound = useRef(null);

  Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
  });

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require("../../../hello.mp3"));
    setSound(sound);
    await sound.playAsync();
  };

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  useEffect(() => {
    setRepeatAlarm(true);
    loadSound();
  }, []);

  useEffect(() => {
    repeatAlarm ? (playSound.current = setInterval(loadSound, 10000)) : clearAlarm();

    return () => {
      clearAlarm();
    };
  }, [repeatAlarm]);

  const clearAlarm = () => {
    clearInterval(playSound.current);
    playSound.current = null;
  };

  return null;
};
