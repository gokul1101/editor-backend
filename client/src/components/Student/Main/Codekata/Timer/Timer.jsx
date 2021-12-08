

import React from "react";
import { useState ,useEffect} from "react";

const Timer = (props) => {
 const [date, setDate] = useState(0);
 const[hour,setHour]=useState(0);
 const[minutes,setMinutes]=useState(0);
 const[second,setSecond]=useState(0);
 const[deadline,setDeadline]=useState("");
  useEffect(() => {
    var deadline = new Date("dec 12, 2021 8:0:0").getTime();
    var x = setInterval(function() {
    var now = new Date().getTime();
    var t = deadline - now;
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
   
    // document.getElementById("day").innerHTML = days +" : ";
    // document.getElementById("hour").innerHTML = hours +" : ";
    // document.getElementById("minute").innerHTML = minutes +" : ";
    // document.getElementById("second").innerHTML = seconds;
    if (t < 0) {
      clearInterval(x);
      setDeadline("TIME UP");
      setDate(12);
      setHour(2);
      setMinutes(1);
      setSecond(0);
    }
  }, 1000);
  })
  return (
    <div className="timer p-2">
      <span id="day">{date}</span> <span id="hour">{hour}</span> <span id="minute">{minutes}</span><span id="second">{second}</span>
  </div>
  );
};

export default Timer;