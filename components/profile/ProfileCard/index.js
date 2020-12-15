import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import IntlMessages from "../../../util/IntlMessages";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import Flag from "react-world-flags";
import moment from "moment";
import { updateProfileL1 } from "../../../actions/Profile";
///Modal
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import { styled } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
/////
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

import {
  COUNTRY_MAP,
  COUNTRY_CITY_MAP,
  ARRAYS_OF_MARTIAL_STATUS,
  ARRAYS_OF_MARTIAL_STATUS_VALUES
} from "../../../util/data";

const useStyles = makeStyles(theme => ({
  ///modal
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "3px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  displayB: {
    display: "block"
  },
  positionR: {
    position: "relative",
    padding: "1rem .5rem 2rem .5rem"
  },
  positionA: {
    position: "absolute",
    right: ".5rem",
    bottom: "-1rem"
  },
  onlineFlag: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#04a304",
    marginRight: ".5rem",
    display: "inline-block"
  }
  ////
}));

////// modal
const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func
};

export default function ProfileCard({ mainInfo }) {
  const classes = useStyles();
  const searchState = useSelector(state => state.home.searchState);
  const returnUpdateMessage = useSelector(
    state => state.profile.returnUpdateMessage
  );
  const userMartial = useSelector(state => state.profile.userMartial);
  const [showMessage, setShowMessage] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  ////// modal
  const [open, setOpen] = useState(false);
  const [martial, setMartial] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setShowMessage(false);
    setOpen(false);
  };

  const handleChange = event => {
    setMartial(event.target.value);
  };

  const handleOnUpdate = () => {
    dispatch(updateProfileL1(martial));
  };

  const StyledFormControl = styled(FormControl)({
    formControl: {
      margin: 2,
      "& select": {
        paddingRight: "22px"
      }
    },
    selectEmpty: {
      marginTop: 0
    }
  });

  // useEffect(() => {
  //   if (userMartial != null) {
  //     console.log("true show");
  //     setShowMessage(true);
  //   }
  //   //else {
  //   //   console.log("true show");
  //   //   setShowMessage(false);
  //   // }
  // }, [userMartial]);

  ///
  return (
    <>
      {console.log("from render ", returnUpdateMessage)}
      <div className="profile-card">
        <div className="card-container-img">
          <div className="card-img">
            <img src={mainInfo.photo} alt="main photo" />
          </div>
          {router.query.flag == "read" && (
            <div className="card-img-icon">
              <div className="card-icon">
                <img src="../../../static/images/icons/standard/Love_Icon_Standard.svg" />
              </div>
              <div className="card-icon">
                <img src="../../../static/images/icons/standard/Messages_Icon_Standard.svg" />
              </div>
            </div>
          )}
          {router.query.flag == "readMe" && (
            // <div className="margin-TB">
            <IconButton aria-label="Edit" className="edit-icon-large">
              <EditIcon></EditIcon>
            </IconButton>
            // </div>
          )}
        </div>
        <div className="card-info linear-g ">
          <div className="d-flex">
            <Typography variant="body1" className="card-h-row" gutterBottom>
              {searchState == "active" && <div className="online-flag"></div>}
              <IntlMessages id="Profile.online" />
            </Typography>
            <div className="card-h-row d-flex">
              <div className="profile-icon-flag-2">
                <Flag code={mainInfo.co} />
              </div>
              <Typography variant="body1" gutterBottom>
                {COUNTRY_MAP[mainInfo.co]}
              </Typography>
            </div>
          </div>

          <div className="d-flex">
            <Typography variant="body1" className="card-h-row" gutterBottom>
              {mainInfo.n}
            </Typography>
            {/* <Typography variant="body1" className="card-h-row" component="p">
              {mainInfo.b != ""
                ? `${moment().diff(mainInfo.b, "years")} Years Old`
                : `${moment().diff(
                    mainInfo.timeScore.substring(0, 8),
                    "years"
                  )} Years Old`}
            </Typography> */}

            <Typography
              variant="body1"
              className="d-flex card-h-row"
              component="p"
            >
              <div className="card-icon">
                <img src="../../../static/images/icons/profile/Location_Icon.svg" />
              </div>
              {mainInfo.ci
                ? COUNTRY_CITY_MAP[mainInfo.co.toLowerCase()][mainInfo.ci - 1]
                : ""}
            </Typography>
          </div>
          <div className="d-flex">
            <Typography variant="body1" className="card-h-row" component="p">
              {mainInfo.b != ""
                ? `${moment().diff(mainInfo.b, "years")} Years Old`
                : `${moment().diff(
                    mainInfo.timeScore.substring(0, 8),
                    "years"
                  )} Years Old`}
            </Typography>
            <Typography
              variant="body1"
              className="card-h-row p-relative"
              gutterBottom
            >
              {ARRAYS_OF_MARTIAL_STATUS[mainInfo.gd][userMartial]}
              {router.query.flag == "readMe" && (
                <IconButton
                  aria-label="Edit"
                  onClick={handleOpen}
                  className="edit-icon"
                >
                  <EditIcon fontSize="small"></EditIcon>
                </IconButton>
              )}
            </Typography>
          </div>
        </div>
      </div>

      {/*  */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form className={classes.positionR} noValidate autoComplete="off">
              <Typography variant="body1" gutterBottom>
                <IntlMessages id="updateProfile.martial" />
                {ARRAYS_OF_MARTIAL_STATUS[mainInfo.gd][userMartial]}
              </Typography>
              <StyledFormControl style={{ minWidth: "149px" }}>
                <InputLabel id="martial-label">
                  <IntlMessages id="inputLabel.martial" />
                </InputLabel>
                <Select
                  labelId="martial-label"
                  id="martial"
                  value={martial}
                  onChange={handleChange}
                  name="martial"
                  style={{ marginRight: "35px" }}
                >
                  {ARRAYS_OF_MARTIAL_STATUS[mainInfo.gd].map((value, i) => (
                    <MenuItem
                      key={ARRAYS_OF_MARTIAL_STATUS_VALUES[mainInfo.gd][i]}
                      value={ARRAYS_OF_MARTIAL_STATUS_VALUES[mainInfo.gd][i]}
                      control={<Radio />}
                      label={value}
                    >
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>

              <Button
                className={classes.positionA}
                onClick={() => {
                  handleOnUpdate();
                  returnUpdateMessage == "true" ? handleClose() : "";
                }}
                variant="contained"
                color="primary"
              >
                <IntlMessages id="updateProfile.update" />
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
      {/*  */}
      {console.log("showMessage ", showMessage)}
      {showMessage &&
        NotificationManager.success(
          "Marital status updated successfully",
          "Success"
        )}
      <NotificationContainer />
    </>
  );
}
