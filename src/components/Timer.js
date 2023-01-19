import React from "react";
import { useEffect, useState } from "react";

const Timer = ({ endGame, questionNum }) => {
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    if (timer === 0) return endGame(true);
    const interval = setInterval(() => {
      setTimer((prevTimerCount) => prevTimerCount - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [endGame, timer]);

  useEffect(() => {
    setTimer(30);
  }, [questionNum]);
  return <div className="timer">{timer}</div>;
};

export default Timer;
