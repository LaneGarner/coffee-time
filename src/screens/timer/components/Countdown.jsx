import React, { useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";

import { CountdownNumbers } from "../styled";

const minutesToMs = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 30, isPaused, onEnd, onProgress }) => {
  const [ms, setMs] = useState(minutesToMs(minutes));

  const [newTime, setNewTime] = useState(0);
  const interval = useRef(null);

  const countDown = () => {
    setMs((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      // onProgress(timeLeft / minutesToMs(minutes));
      setNewTime(timeLeft / minutesToMs(minutes));
      return timeLeft;
    });
  };

  // useEffect(() => {
  //   onProgress(newTime);
  // }, [newTime]);

  useEffect(() => {
    // onProgress(ms / minutesToMs(minutes));
    console.log(ms);
    if (ms <= 0) {
      onEnd();
      console.log("end");
    }
  }, [ms]);

  useEffect(() => {
    setMs(minutesToMs(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) {
        clearInterval(interval.current);
      }
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(ms / 1000 / 60) % 60;
  const seconds = Math.floor(ms / 1000) % 60;

  return (
    <CountdownNumbers>
      {/* <Text> */}
      {formatTime(minute)}:{formatTime(seconds)}
      {/* </Text> */}
    </CountdownNumbers>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 90,
    fontWeight: "100",
    color: "#333",
    padding: 20,
    // fontFeatureSettings: "tnum",
    // fontVariantNumeric: "tabular-nums",
    // backgroundColor: "#AAA",
  },
});
