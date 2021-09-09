import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import IntlMessages from "../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { openModal } from "../../actions/Profile";
import ModalSettings from "../Modals/modalSettings";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

import { ARRAY_OF_SUB_PACK } from "../../util/data";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    // fontSize: "1rem",
    // flexBasis: "33.33%",
    // flexShrink: 0,
    //color: "#b72051",
    fontWeight: "bold"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  title: {
    color: "#b72051"
    // textAlign: "center"
  }
}));

import {
  readMyPaymentAndSub,
  readMyPhoneAndPwData
} from "../../actions/Profile";
export default function Settings() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [clickedBtn, setClickedBtn] = React.useState("");

  const [expanded, setExpanded] = React.useState("panel1");

  const myPaymentsAndSub = useSelector(state => state.profile.myPaymentsAndSub);
  const myPaymentsAndSubCount = useSelector(
    state => state.profile.myPaymentsAndSubCount
  );
  const endOfResultPaymentsAndSub = useSelector(
    state => state.profile.endOfResultPaymentsAndSub
  );
  const paymentsStart = useSelector(state => state.profile.paymentsStart);
  const paymentsEnd = useSelector(state => state.profile.paymentsEnd);

  const myPhoneAndPwData = useSelector(state => state.profile.myPhoneAndPwData);
  const OpenModal = useSelector(state => state.profile.openModal);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    // if (panel == "panel1" && myPaymentsAndSub == null) {
    // } else
    if (panel == "panel1" && myPhoneAndPwData == null) {
      dispatch(readMyPhoneAndPwData());
    }
  };

  useEffect(() => {
    //dispatch(readMyPaymentAndSub(true, paymentsStart, paymentsEnd));
    dispatch(readMyPhoneAndPwData());
  }, []);
  // handle scroll for list of payments
  // const handleScrollPaymentsAndSub = () => {
  //   if (!endOfResultPaymentsAndSub) {
  //     //  payments (next options)
  //     dispatch(readMyPaymentAndSub(false, paymentsStart, paymentsEnd));
  //   }
  // };
  return (
    <>
      <div className="setting-container">
        {/* <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className="setting-tap"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading} variant="h6" gutterBottom>
              <IntlMessages id="settings.payment" />
            </Typography>
            <Typography className={classes.secondaryHeading}>
              I am an accordion
            </Typography>
          </AccordionSummary>
          {myPaymentsAndSub && (
            <AccordionDetails>
              <Typography>{myPaymentsAndSub.count}</Typography>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: "end",
                    marginTop: "1rem",
                    marginBottom: "1rem"
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      setClickedBtn("sub");
                      dispatch(openModal(true));
                    }}
                    color="primary"
                    className="linear-g-r"
                  >
                    <IntlMessages id="settings.renew" />
                  </Button>
                </Grid>
                <Grid item xs={5} className={classes.title}>
                  <Typography>
                    <IntlMessages id="settings.subExp" />
                  </Typography>
                </Grid>

                <Grid item xs={5} className={classes.title}>
                  <Typography>
                    <IntlMessages id="settings.subPack" />
                  </Typography>
                </Grid>

                <Grid item xs={2} className={classes.title}>
                  <Typography>
                    <IntlMessages id="settings.payOn" />
                  </Typography>
                </Grid>

                <Grid item xs={12} style={{ marginTop: "1rem" }}>
                  <InfiniteScroll
                    dataLength={myPaymentsAndSub.length}
                    height={120}
                    next={handleScrollPaymentsAndSub}
                    hasMore={!endOfResultPaymentsAndSub}
                    loader={<CircularProgress />}
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        {myPaymentsAndSub.length != 0 && (
                          <b>Yay! You have seen all payments </b>
                        )}
                        {myPaymentsAndSub.length === 0 && (
                          <b>Yay! You don't have any payments </b>
                        )}
                      </p>
                    }
                  >
                    <Grid container>
                      {myPaymentsAndSub.map((option, index) => (
                        option=JSON.parse(option)
                        <ListItem key={option.subscriptionend} user={option} />
                        <>
                          <Grid item xs={5}>
                            <Typography>
                              {JSON.parse(option).subscriptionend}
                              {moment(
                                JSON.parse(option).subscriptionend
                              ).format("YYYY-MM-DD")}
                            </Typography>
                          </Grid>
                          <Grid item xs={5}>
                            <Typography>
                              {ARRAY_OF_SUB_PACK[JSON.parse(option).subpack]}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography>
                              {moment(JSON.parse(option).paymenttime).format(
                                "YYYY-MM-DD"
                              )}
                            </Typography>
                          </Grid>
                        </>
                      ))}
                    </Grid>
                  </InfiniteScroll>
                </Grid>
                have issue btn
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: "end",
                    marginTop: "1rem",
                    marginBottom: "1rem"
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      setClickedBtn("issue");
                      dispatch(openModal(true));
                    }}
                    color="primary"
                    className="linear-g-r"
                  >
                    <IntlMessages id="settings.issue" />
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          )}
        </Accordion> */}
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className="setting-tap"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading} variant="h6" gutterBottom>
              <IntlMessages id="settings.phone" />
            </Typography>
            {/* <Typography className={classes.secondaryHeading}>
              You are currently not an owner
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails>
            {myPhoneAndPwData && myPhoneAndPwData.phonePassData && (
              <Grid container>
                <Grid item xs={6} className="after-sec info-container">
                  <Typography
                    variant="overline"
                    className="sub-title"
                    display="block"
                    gutterBottom
                    // style={{ color: "#b72051" }}
                  >
                    <IntlMessages id="settings.pho" />
                  </Typography>
                  {/* <Typography
                    className={classes.heading}
                    variant="h6"
                    gutterBottom
                  >
                    <IntlMessages id="settings.phone" />
                  </Typography> */}
                  {myPhoneAndPwData.phoneChangeNum != null && (
                    <Grid
                      item
                      xs={12}
                      style={{ position: "relative", textAlign: "center" }}
                    >
                      <Typography className="info">
                        <IntlMessages id="settings.yourLastPhone" />
                      </Typography>
                      <Typography style={{ color: "#b72051" }}>
                        {/* {JSON.parse(myPhoneAndPwData.allValues[1]).phone} */}{" "}
                        {JSON.parse(myPhoneAndPwData.phoneChangeNum).phone}
                        <IconButton
                          aria-label="Edit"
                          onClick={() => {
                            setClickedBtn("phone");
                            dispatch(openModal(true));
                          }}
                          className="edit-icon linear-g-r"
                        >
                          <EditIcon fontSize="small"></EditIcon>
                        </IconButton>
                      </Typography>
                    </Grid>
                  )}

                  <Grid
                    item
                    xs={12}
                    style={{ position: "relative", textAlign: "center" }}
                  >
                    <Typography className="info">
                      <IntlMessages id="settings.yourFirstPhone" />
                    </Typography>
                    <Typography style={{ color: "#b72051" }}>
                      {/* {JSON.parse(myPhoneAndPwData.allValues[1]).phone} */}{" "}
                      {myPhoneAndPwData.phonePassData.phone}
                      {myPhoneAndPwData.phoneChangeNum == null && (
                        <IconButton
                          aria-label="Edit"
                          onClick={() => {
                            setClickedBtn("phone");
                            dispatch(openModal(true));
                          }}
                          className="edit-icon linear-g-r"
                        >
                          <EditIcon fontSize="small"></EditIcon>
                        </IconButton>
                      )}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography className="info">
                      <IntlMessages id="settings.changePhoneNum" />
                      {/* </Typography>
                  <Typography style={{ color: "#b72051" }}> */}
                      <span style={{ color: "#b72051" }}>
                        {" "}
                        {myPhoneAndPwData.phoneChangeNum == null ? (
                          // <IntlMessages id="settings.noChangePhone" />
                          <>
                            {" "}
                            0 <IntlMessages id="settings.times" />
                          </>
                        ) : JSON.parse(myPhoneAndPwData.phoneChangeNum)
                            .changeTimes == 1 ? (
                          <>
                            {
                              JSON.parse(myPhoneAndPwData.phoneChangeNum)
                                .changeTimes
                            }{" "}
                            <IntlMessages id="settings.time" />
                          </>
                        ) : (
                          <>
                            {
                              JSON.parse(myPhoneAndPwData.phoneChangeNum)
                                .changeTimes
                            }{" "}
                            <IntlMessages id="settings.times" />
                          </>
                        )}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6} className="info-container">
                  {/* password */}
                  <Typography
                    variant="overline"
                    className="sub-title"
                    display="block"
                    gutterBottom
                    // style={{ color: "#b72051" }}
                  >
                    <IntlMessages id="settings.pass" />
                  </Typography>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography className="info">
                      <IntlMessages id="settings.changePassNum" />
                      {/* </Typography>
                  <Typography style={{ color: "#b72051" }}> */}
                      <span style={{ color: "#b72051" }}>
                        {myPhoneAndPwData.passwordChangeNum == null ? (
                          // <IntlMessages id="settings.noResetPass" />
                          <>
                            0 <IntlMessages id="settings.times" />
                          </>
                        ) : JSON.parse(myPhoneAndPwData.passwordChangeNum)
                            .count == 1 ? (
                          <>
                            {
                              JSON.parse(myPhoneAndPwData.passwordChangeNum)
                                .count
                            }{" "}
                            <IntlMessages id="settings.time" />
                          </>
                        ) : (
                          <>
                            {
                              JSON.parse(myPhoneAndPwData.passwordChangeNum)
                                .count
                            }{" "}
                            <IntlMessages id="settings.times" />
                          </>
                        )}
                      </span>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography className="info">
                      <IntlMessages id="settings.lastTime" />
                    </Typography>
                    <Typography style={{ color: "#b72051" }}>
                      {moment(
                        myPhoneAndPwData.phonePassData.lastTimeSent
                      ).format("YYYY-MM-DD hh:mm A")}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{ textAlign: "end", marginTop: "1rem" }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      setClickedBtn("password");
                      dispatch(openModal(true));
                    }}
                    color="primary"
                    className="linear-g-r"
                  >
                    <IntlMessages id="settings.changePass" />
                  </Button>
                </Grid>
              </Grid>
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          className="setting-tap"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading} variant="h6" gutterBottom>
              <IntlMessages id="settings.delete" />
            </Typography>
            {/* <Typography className={classes.secondaryHeading}>
              Filtering has been entirely disabled for whole web server
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <Typography>
                  <IntlMessages id="settings.deleteText" />
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  textAlign: "end",
                  marginTop: "1rem",
                  marginBottom: "1rem"
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    setClickedBtn("delete");
                    dispatch(openModal(true));
                  }}
                  color="primary"
                  className="linear-g-r"
                >
                  <IntlMessages id="settings.delete" />
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        {/* <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>Personal data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
              sit amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion> */}
      </div>
      {OpenModal && clickedBtn == "sub" && <ModalSettings sub={true} />}
      {OpenModal && clickedBtn == "phone" && (
        <ModalSettings
          phone={
            myPhoneAndPwData.phoneChangeNum == null
              ? myPhoneAndPwData.phonePassData.phone
              : JSON.parse(myPhoneAndPwData.phoneChangeNum).phone
          }
        />
      )}
      {OpenModal && clickedBtn == "password" && (
        <ModalSettings password={true} />
      )}
      {OpenModal && clickedBtn == "delete" && (
        <ModalSettings deleteAcc={true} />
      )}

      {OpenModal && clickedBtn == "issue" && (
        <ModalSettings reportIusse={true} />
      )}
      <NotificationContainer />
    </>
  );
}
