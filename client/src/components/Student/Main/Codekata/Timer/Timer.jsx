import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";

const Timer = () => {
  const [authState, ] = useContext(AuthContext);
  const ends_at = authState?.duration;
  const calculateTimeLeft = () => {
    let difference = +new Date(ends_at) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
    timerComponents.push(`${timeLeft[interval]}${interval.toUpperCase().charAt(0)}`
    );
  });
  return (
    <div className="p-2 d-flex align-items-center justify-content-center">
      <i className="fas m-0 p-0 fa-clock clock-icon"></i>
      {
        timerComponents.length === 0? (
          <span>Time's up</span>
        ) : (
          timerComponents.map((component, index) => {
            let suffix = (index+1 !== timerComponents.length)? " : " : "";
            return (
              `${component}${suffix}`
            )
          })
        )
      }
    </div>
  );
};

export default Timer;
