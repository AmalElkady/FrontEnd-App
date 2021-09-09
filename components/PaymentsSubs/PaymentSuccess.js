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

import {
  hideMessage,
  showAuthLoader,
  userAddSubscribe
} from "../../actions/Auth";

export default function PaymentSuccess() {
  const dispatch = useDispatch();

  const selectedPack = useSelector(state => state.auth.selectedPack);
  const loader = useSelector(state => state.auth.loader);

  useEffect(() => {
    if (selectedPack != null) {
      dispatch(userAddSubscribe(selectedPack));
    }
  }, []);

  return (
    <>
      {loader && (
        <div className="loader-view">
          <CircularProgress />
        </div>
      )}
      <NotificationContainer />
    </>
  );
}
