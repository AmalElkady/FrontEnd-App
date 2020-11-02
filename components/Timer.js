import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Resizer from "react-image-file-resizer";
import ReactCrop from "react-image-crop";

import IntlMessages from "../util/IntlMessages";
import { hideTimer } from "../actions/Auth";
import { conditionalExpression } from "@babel/types";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "70%",
    margin: "2rem auto"
  }
}));
export default function Timer() {
  const timeVal = useSelector(state => state.auth.timeReturnedVal);
  const timeflag = useSelector(state => state.auth.timeReturned);
  const dispatch = useDispatch();

  console.log("time in timer ", timeVal, timeflag);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(timeVal);
  //const [isActive, setIsActive] = useState(timeflag);

  // function toggle() {
  //   setIsActive(!isActive);
  // }

  const reset = () => {
    setSeconds(0);
    setMinutes(minutes => minutes - 1);
    // setIsActive(false);
  };

  useEffect(() => {
    let interval = null;
    console.log("isActive", isActive);
    if (timeflag) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      if (seconds == 59) {
        reset();
      }
      if (minutes == 0) {
        setSeconds(0);
        //setIsActive(false);
        dispatch(hideTimer());
      }
    }
    //if (!isActive && seconds !== 0)
    else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeflag, seconds]);

  return (
    <>
      {timeflag && (
        <>
          <h3>Countdown Clock</h3>
          <div id="clockdiv">
            <div>
              <span className="minutes" id="minute">
                {minutes}
              </span>
              <div className="smalltext">Minutes</div>
            </div>
            <div>
              <span className="seconds" id="second">
                {seconds}
              </span>
              <div className="smalltext">Seconds</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
