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

import Timer from "../Timer";

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
export default function PaymentsSubs() {
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

  const OpenModal = useSelector(state => state.profile.openModal);

  const sub = useSelector(state => state.auth.sub);
  let diffJnt = moment().diff(sub, "hours");

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    // if (panel == "panel1" && myPaymentsAndSub == null) {
    // } else if (panel == "panel2" && myPhoneAndPwData == null) {
    //   dispatch(readMyPhoneAndPwData());
    // }
  };

  useEffect(() => {
    if (myPaymentsAndSub) {
      console.log("myPaymentsAndSub ", myPaymentsAndSub);
    }
  }, [myPaymentsAndSub]);

  useEffect(() => {
    dispatch(readMyPaymentAndSub(true, paymentsStart, paymentsEnd));
  }, []);

  // handle scroll for list of payments
  const handleScrollPaymentsAndSub = () => {
    if (!endOfResultPaymentsAndSub) {
      //  payments (next options)
      dispatch(readMyPaymentAndSub(false, paymentsStart, paymentsEnd));
    }
  };
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
          > */}
        <Typography className={classes.heading} variant="h6" gutterBottom>
          <IntlMessages id="settings.payment" />
        </Typography>
        {/* <Typography className={classes.secondaryHeading}>
              I am an accordion
            </Typography> */}
        {/* </AccordionSummary> */}
        {/* {myPaymentsAndSub && ( */}
        {/* // <AccordionDetails> */}
        {/* <Typography>{myPaymentsAndSub.count}</Typography> */}
        {myPaymentsAndSub && (
          <Grid container>
            {myPaymentsAndSub.length > 0 && (
              <>
                <Grid item xs={12}>
                  <Timer />
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
                      setClickedBtn("sub");
                      dispatch(openModal(true));
                    }}
                    color="primary"
                    className="linear-g-r"
                  >
                    {diffJnt < 0 ? (
                      <IntlMessages id="settings.extend" />
                    ) : (
                      <IntlMessages id="settings.renew" />
                    )}
                  </Button>
                </Grid>
              </>
            )}
            <Grid item xs={12} style={{ marginTop: "1rem" }}>
              {/* <InfiniteScroll
                    dataLength={myPaymentsAndSub.length}
                    height={120}
                    next={handleScrollPaymentsAndSub}
                    hasMore={!endOfResultPaymentsAndSub}
                    loader={<CircularProgress />}
                    // endMessage={
                    //   <p style={{ textAlign: "center" }}>
                    //     {myPaymentsAndSub.length != 0 && (
                    //       <b>Yay! You have seen all payments </b>
                    //     )}
                    //     {myPaymentsAndSub.length === 0 && (
                    //       <b>Yay! You don't have any payments </b>
                    //     )}
                    //   </p>
                    // }
                  > */}

              {myPaymentsAndSub.map((option, index) => (
                //option=JSON.parse(option)
                // <ListItem key={option.subscriptionend} user={option} />
                <Grid container className="card-cont">
                  <Grid item xs={6} className={classes.title}>
                    <Typography>
                      <IntlMessages id="settings.typeOfPayment" />
                    </Typography>
                  </Grid>

                  <Grid item xs={6} className={classes.title}>
                    <Typography>
                      <IntlMessages id="settings.payOn" />
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>{option.type}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {moment(option.date).format("YYYY-MM-DD")}
                    </Typography>
                  </Grid>

                  <Grid item xs={3} className={classes.title}>
                    <Typography>
                      <IntlMessages id="settings.payAmount" />
                    </Typography>
                  </Grid>

                  <Grid item xs={9}>
                    <Typography>
                      {Number(option.amount / 100)}/{option.currency}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    className={classes.title}
                    style={{ margin: "0 0 .3rem 0" }}
                  >
                    <Typography>
                      <IntlMessages id="settings.cardInfo" />
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {option.type == "card" ? (
                      <>
                        <img
                          src={
                            option.card_brand == "visa"
                              ? "../../static/images/Visa.svg"
                              : option.card_brand == "mastercard"
                              ? "../../static/images/MasterCard.svg"
                              : ""
                          }
                        />{" "}
                      </>
                    ) : (
                      <img src="../../static/images/other_card.svg" />
                    )}
                  </Grid>
                  <Grid item xs={2} className={classes.title}>
                    <Typography>/{option.card_funding}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>.......{option.card_last4}</Typography>
                  </Grid>
                  <Grid item xs={12} style={{ margin: ".3rem 0 0 0" }}>
                    <Typography>
                      <IntlMessages id="settings.expires" />
                      {option.card_exp_month}/{option.card_exp_year}
                    </Typography>
                  </Grid>
                </Grid>
              ))}

              {/* </InfiniteScroll> */}
            </Grid>
            {/* have issue btn */}
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
        )}

        {/* </Accordion> */}
      </div>
      {OpenModal && clickedBtn == "sub" && <ModalSettings sub={true} />}

      {OpenModal && clickedBtn == "issue" && (
        <ModalSettings reportIusse={true} />
      )}
      <NotificationContainer />
    </>
  );
}
