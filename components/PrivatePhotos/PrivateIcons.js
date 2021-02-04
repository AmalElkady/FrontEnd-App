import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import IntlMessages from "../../util/IntlMessages";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import {
  getPhotoPPReadOutgoingRequestsApprovals,
  getPhotoPPReadIncomingApprovedPendingRequests,
  selectedPrivateIcon
} from "../../actions/Interaction";

const useStyles = makeStyles(theme => ({}));
export default function PrivateIcons() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const [selectedValue, setSelectedValue] = useState("0");

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleChangeIcon = event => {
    setSelectedValue(event.target.value);
  };

  // Outgoing requests
  const OffsetOutgoingPPRequests = useSelector(
    state => state.interaction.OffsetOutgoingPPRequests
  );
  const scoreHOutgoingPPRequests = useSelector(
    state => state.interaction.scoreHOutgoingPPRequests
  );

  // Incoming approved requests
  const OffsetIncomingPPApprovedRequests = useSelector(
    state => state.interaction.OffsetIncomingPPApprovedRequests
  );
  const scoreHIncomingPPApprovedRequests = useSelector(
    state => state.interaction.scoreHIncomingPPApprovedRequests
  );

  // Incoming not approved requests
  const OffsetLoveReceivedRequests = useSelector(
    state => state.interaction.OffsetLoveReceivedRequests
  );
  const scoreHLoveReceivedRequests = useSelector(
    state => state.interaction.scoreHLoveReceivedRequests
  );
  /////////
  let myRef = React.createRef();

  useEffect(() => {
    if (selectedValue == 0) {
      dispatch(
        getPhotoPPReadOutgoingRequestsApprovals(
          scoreHOutgoingPPRequests,
          OffsetOutgoingPPRequests
        )
      );
      dispatch(selectedPrivateIcon("outgoing"));
    } else if (selectedValue == 1) {
      dispatch(
        getPhotoPPReadIncomingApprovedPendingRequests(
          1,
          scoreHIncomingPPApprovedRequests,
          OffsetIncomingPPApprovedRequests
        )
      );
      dispatch(selectedPrivateIcon("incomingApproved"));
    } else if (selectedValue == 2) {
      // dispatch(
      //      getPhotoPPReadIncomingApprovedPendingRequests(0,scoreHLoveSentRequests, OffsetLoveSentRequests)
      //   );
      dispatch(selectedPrivateIcon("incomingNotApproved"));
    }
  }, [selectedValue]);
  return (
    <>
      <FormControl
        component="fieldset"
        style={{ minWidth: "100%" }}
        className="icons-container"
      >
        <RadioGroup
          aria-label="icon"
          name="icon"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="0"
            className={selectedValue === "0" ? "" : ""}
            control={
              <Radio
                value="0"
                checked={selectedValue === "0"}
                onChange={handleChangeIcon}
                className="d-none"
              />
            }
            label={
              <>
                <Grid item xs={3} className="">
                  <img
                    src={
                      selectedValue != "0"
                        ? "../../static/images/icons/standard/Match_Icon_Standard.svg"
                        : "../../static/images/icons/Highlighted/Match_Icon_Highlighted.svg"
                    }
                    alt="Match Icon"
                    title="match icon"
                  />
                </Grid>
              </>
            }
          />

          <FormControlLabel
            value="1"
            className={selectedValue === "1" ? "" : ""}
            control={
              <Radio
                value="1"
                checked={selectedValue === "1"}
                onChange={handleChangeIcon}
                className="d-none"
              />
            }
            label={
              <>
                <Grid item xs={3} className="">
                  <img
                    src={
                      selectedValue != "1"
                        ? "../../static/images/icons/standard/sent_Love_Icon_Standard.svg"
                        : "../../static/images/icons/Highlighted/sent_Love_Icon_Highlighted.svg"
                    }
                    alt="Sent Love Icon"
                    title="Sent Love Icon"
                  />
                </Grid>
              </>
            }
          />

          <FormControlLabel
            value="2"
            className="m-r-label"
            control={
              <Radio
                value="2"
                checked={selectedValue === "2"}
                onChange={handleChangeIcon}
                className="d-none"
              />
            }
            label={
              <>
                <Grid item xs={3} className="">
                  <img
                    src={
                      selectedValue != "2"
                        ? "../../static/images/icons/standard/Recived_Love_Icon_Standard.svg"
                        : "../../static/images/icons/Highlighted/Recived_Love_Icon_Highlighted.svg"
                    }
                    alt="Recived Love Icon"
                    title="Recived Love Icon"
                  />
                </Grid>
              </>
            }
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}
