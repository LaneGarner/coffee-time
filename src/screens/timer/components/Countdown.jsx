import React, { useState, useEffect, useRef } from "react";

import { CountdownNumbers } from "../styled";

const minutesToMs = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 30, isPaused, onEnd }) => {
  const [ms, setMs] = useState(minutesToMs(minutes));

  // const [newTime, setNewTime] = useState(0);
  const interval = useRef(null);

  const countDown = () => {
    setMs((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      // setNewTime(timeLeft / minutesToMs(minutes));
      return timeLeft;
    });
  };

  useEffect(() => {
    if (ms <= 0) {
      onEnd();
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
    // "accurate" timer
    let nextAt = new Date().getTime() + 1000;
    interval.current = setInterval(countDown, nextAt - new Date().getTime());

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(ms / 1000 / 60) % 60;
  const seconds = Math.floor(ms / 1000) % 60;

  return (
    <CountdownNumbers>
      {formatTime(minute)}:{formatTime(seconds)}
    </CountdownNumbers>
  );
};

