import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Resizer from "react-image-file-resizer";
import ReactCrop from "react-image-crop";

import IntlMessages from "../util/IntlMessages";
import { hideTimer } from "../actions/Auth";
import { conditionalExpression } from "@babel/types";

import Countdown from "react-countdown";
import moment from "moment";
import ScheduleIcon from "@material-ui/icons/Schedule";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";

// const useStyles = makeStyles(theme => ({
//   root: {
//     maxWidth: "70%",
//     margin: "2rem auto"
//   }
// }));
export default function Timer() {
  const timeVal = useSelector(state => state.auth.timeReturnedVal);
  const timeflag = useSelector(state => state.auth.timeReturned);
  const dispatch = useDispatch();
  const [seconds2, setSeconds] = useState(null);
  const [minutes, setMinutes] = useState(timeVal);

  const sub = useSelector(state => state.auth.sub);
  let diffJnt = moment().diff(sub, "seconds") * -1;

  //const [isActive, setIsActive] = useState(timeflag);

  // function toggle() {
  //   setIsActive(!isActive);
  // }

  // const reset = () => {
  //   setSeconds(0);
  //   setMinutes(minutes => minutes - 1);
  //   // setIsActive(false);
  // };

  // useEffect(() => {
  //   let interval = null;
  //   console.log("timeflag ", timeflag);
  //   if (timeflag) {
  //     interval = setInterval(() => {
  //       setSeconds(seconds => seconds + 1);
  //     }, 1000);
  //     if (seconds == 59) {
  //       reset();
  //     }
  //     if (minutes == 0) {
  //       setSeconds(0);
  //       //setIsActive(false);
  //       dispatch(hideTimer());
  //     }
  //   }
  //   //if (!isActive && seconds !== 0)
  //   else {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [timeflag, seconds]);

  const Completionist = () => (
    <Typography variant="h6" gutterBottom>
      <IntlMessages id="settings.end" />
    </Typography>
  );

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed || diffJnt <= 0) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              color: "#6c757d",
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            <IntlMessages id="settings.expireAfter" />
          </Typography>
          <Grid container>
            <Grid item xs={3}>
              <div className="timer-container">
                <span className={hours == 0 ? "span-minute" : ""}>{days}</span>
              </div>
              <Typography
                variant="h6"
                gutterBottom
                className="timer-head"
                // style={{
                //   color: "#6c757d",
                //   fontWeight: "bold",
                //   textAlign: "center"
                // }}
              >
                <IntlMessages id="timer.days" />
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <div className="timer-container">
                {" "}
                <span className={minutes == 0 ? "span-minute" : ""}>
                  {hours}
                </span>
              </div>
              <Typography
                variant="h6"
                gutterBottom
                // style={{
                //   color: "#6c757d",
                //   fontWeight: "bold",
                //   textAlign: "center"
                // }}
                className="timer-head"
              >
                <IntlMessages id="timer.hours" />
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <div className="timer-container">
                <span className={seconds == 0 ? "span-minute" : ""}>
                  {minutes}
                </span>
              </div>
              <Typography
                variant="h6"
                gutterBottom
                className="timer-head"
                // style={{
                //   color: "#6c757d",
                //   fontWeight: "bold",
                //   textAlign: "center"
                // }}
              >
                <IntlMessages id="timer.minutes" />
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <div className="timer-container">
                <span className="span-second">{seconds}</span>
              </div>
              <Typography
                variant="h6"
                gutterBottom
                className="timer-head"
                // style={{
                //   color: "#6c757d",
                //   fontWeight: "bold",
                //   textAlign: "center"
                // }}
              >
                <IntlMessages id="timer.seconds" />
              </Typography>
            </Grid>
          </Grid>
          {/* <span className="timer">

           :{hours}:{minutes}:{seconds}
          </span> */}
        </>
      );
      {
        /* <ScheduleIcon fontSize="large" /> */
      }
      {
        /* <NotificationImportantIcon fontSize="large" /> */
      }
    }
  };

  return (
    <>
      <Countdown date={Date.now() + diffJnt * 1000} renderer={renderer} />
      {/* {timeflag && (
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
      )} */}
    </>
  );
}
