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
import {
  updateProfileL1,
  readProfileL2,
  openModalPP,
  updateProfileL1Success
} from "../../../actions/Profile";
import {
  sendLoveMatchRequest,
  sendLoveMatchRequestSuccess,
  blockUser,
  blockUserSuccess,
  unblockUser,
  unblockUserSuccess
} from "../../../actions/Interaction";
import { clickedUserChat, getProfiles } from "../../../actions/Messages";
///Modal
import ModalUploadMPP from "../../../components/Modals/modalUploadMPP";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { styled } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Link from "next/link";
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
  const userBlockedMessage = useSelector(
    state => state.profile.userBlockedMessage
  );

  const sub = useSelector(state => state.auth.sub);
  let diffJnt = moment().diff(sub, "hours");

  const myProfileDataL2 = useSelector(state => state.profile.myProfileDataL2);
  const profileL2Data = useSelector(state => state.profile.profileL2Data);

  const returnUpdateMessage = useSelector(
    state => state.profile.returnUpdateMessage
  );

  const userClickedProfile = useSelector(
    state => state.home.userClickedProfile
  );

  const OpenModalPP = useSelector(state => state.profile.openModalPP);

  const SendLoveMatchRequest = useSelector(
    state => state.interaction.sendLoveMatchRequest
  );

  const userBlocked = useSelector(state => state.interaction.userBlocked);
  const userUnblocked = useSelector(state => state.interaction.userUnblocked);
  const returnedProfiles = useSelector(
    state => state.messages.returnedProfiles
  );

  const userMartial = useSelector(state => state.profile.userMartial);
  const gender = useSelector(state => state.auth.gender);
  const [showMessage, setShowMessage] = useState(false);
  const [mainGender, setMainGender] = useState(
    userClickedProfile && userClickedProfile.gd
      ? userClickedProfile.gd
      : Number(!gender)
  );
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

  useEffect(() => {
    if (SendLoveMatchRequest == true) {
      NotificationManager.success(
        <IntlMessages id="Love.notificationAction" />
      );
    } else if (SendLoveMatchRequest == "error") {
      NotificationManager.error(<IntlMessages id="Love.notificationError" />);
    }
    dispatch(sendLoveMatchRequestSuccess(false));
  }, [SendLoveMatchRequest]);

  useEffect(() => {
    if (returnUpdateMessage == true) {
      handleClose();
      NotificationManager.success(<IntlMessages id="profile.notifMarital" />);
      dispatch(updateProfileL1Success(false, userMartial));
    }
  }, [returnUpdateMessage]);

  useEffect(() => {
    if (userBlocked == true) {
      NotificationManager.success(
        <>
          <IntlMessages id="user.notifBlock1" /> {userClickedProfile.n}{" "}
          <IntlMessages id="user.notifBlock2" />
        </>
      );
    } else if (userBlocked == "error") {
      NotificationManager.error(
        <>
          <IntlMessages id="user.notifBlockErr" />
          {userClickedProfile.n}
        </>
      );
    }
    dispatch(blockUserSuccess(false));
  }, [userBlocked]);

  useEffect(() => {
    if (userClickedProfile == null) {
      // console.log("router.query card ==null ", router.query.id);
      // const va = router.query.id
      //   .substring(router.query.id.length, router.query.id.length - 2)
      //   .replace(/_/, "");
      // console.log("va ** ", va);
      // const ci = router.query.id
      //   .substring(router.query.id.length - 2, router.query.id.length - 4)
      //   .replace(/_/, "");
      // console.log("ci ** ", ci);
      // const co = router.query.id
      //   .substring(router.query.id.length - 4, router.query.id.length - 7)
      //   .replace(/_/, "");
      // console.log("co ** ", co);
      // const id = router.query.id
      //   .substring(router.query.id.length - 7, 0)
      //   .replace(/_/, "");
      // console.log("id ** ", id);
      // dispatch(getProfiles([`${co}_${ci}_${va}_${id}`]));
      // let va = 0;
      // ci.length == 1
      //   ? (va = arr1[i].substring(5, 7).replace(/_/, ""))
      //   : (va = arr1[i].substring(6, 8).replace(/_/, ""));
    }
  }, []);

  useEffect(() => {
    if (userUnblocked == true) {
      NotificationManager.success(
        <>
          <IntlMessages id="user.notifUnblock1" /> {userClickedProfile.n}{" "}
          <IntlMessages id="user.notifBlock2" />
        </>
      );
    } else if (userUnblocked == "error") {
      NotificationManager.error(
        <>
          <IntlMessages id="user.notifUnblockErr" />
          {userClickedProfile.n}
        </>
      );
    }
    dispatch(unblockUserSuccess(false));
  }, [userUnblocked]);
  ///
  return (
    <>
      {mainInfo && (
        <div className="profile-card">
          <div className="card-container-img">
            <div className="card-img">
              <img src={mainInfo._} alt="main photo" />
            </div>
            {mainInfo.flag == "read" && (
              <div className="card-img-icon">
                <div
                  className="card-icon"
                  onClick={() => {
                    dispatch(
                      sendLoveMatchRequest(
                        userClickedProfile.i,
                        userClickedProfile.co,
                        userClickedProfile.ci,
                        userClickedProfile.va
                      )
                    );
                  }}
                >
                  <img src="../../../static/images/icons/standard/Love_Icon_Standard.svg" />
                </div>
                <div
                  className="card-icon"
                  onClick={() => {
                    dispatch(clickedUserChat(userClickedProfile));
                    router.push({ pathname: `/home/messages` });
                  }}
                >
                  <img src="../../../static/images/icons/standard/Messages_Icon_Standard.svg" />
                </div>
              </div>
            )}
            {mainInfo.flag == "read" &&
              userBlockedMessage == null &&
              profileL2Data != null && (
                <div className="card-img-icon-block">
                  <IconButton
                    onClick={() => {
                      dispatch(
                        blockUser(
                          userClickedProfile.i,
                          userClickedProfile.co,
                          userClickedProfile.ci,
                          userClickedProfile.va
                        )
                      );
                      dispatch(
                        readProfileL2(
                          userClickedProfile.i,
                          userClickedProfile.co,
                          userClickedProfile.ci,
                          userClickedProfile.va
                        )
                      );
                    }}
                  >
                    <img src="../../../static/images/icons/Block_User.svg" />
                  </IconButton>
                </div>
              )}

            {mainInfo.flag == "read" &&
              userBlockedMessage != null &&
              profileL2Data == null && (
                <div className="card-img-icon-block">
                  <IconButton
                    onClick={() => {
                      dispatch(
                        unblockUser(
                          userClickedProfile.i,
                          userClickedProfile.co,
                          userClickedProfile.ci,
                          userClickedProfile.va
                        )
                      );
                      dispatch(
                        readProfileL2(
                          userClickedProfile.i,
                          userClickedProfile.co,
                          userClickedProfile.ci,
                          userClickedProfile.va
                        )
                      );
                    }}
                  >
                    <img src="../../../static/images/icons/Unblock_User.svg" />
                  </IconButton>
                </div>
              )}
            {router.query.flag == "readMe" && diffJnt < 0 && (
              <div
                className="card-img-icon-block"
                style={{ padding: "0.5rem 0 0 .5rem", cursor: "pointer" }}
              >
                {" "}
                <Link href="/home/paymentSubscription">
                  <img src="../../../static/images/sub_mark.svg" />
                </Link>
              </div>
            )}

            {router.query.flag == "readMe" && (
              <IconButton
                aria-label="Edit"
                className="edit-icon-large"
                onClick={() => {
                  dispatch(openModalPP(true));
                }}
              >
                <EditIcon></EditIcon>
              </IconButton>
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
                {mainInfo.b != undefined
                  ? `${moment().diff(mainInfo.b, "years")} Years Old `
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
                {/* {mainInfo.gd=mainInfo.gd?mainInfo.gd:Number(!gender)} */}
                {mainInfo.flag == "read" &&
                  ARRAYS_OF_MARTIAL_STATUS[mainInfo.gd][mainInfo.m]}
                {router.query.flag == "readMe" &&
                  ARRAYS_OF_MARTIAL_STATUS[mainGender][userMartial]}
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
      )}
      {/*  */}
      {mainInfo && (
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
                  {ARRAYS_OF_MARTIAL_STATUS[mainGender][userMartial]}
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
                    {ARRAYS_OF_MARTIAL_STATUS[mainGender].map((value, i) => (
                      <MenuItem
                        key={ARRAYS_OF_MARTIAL_STATUS_VALUES[mainGender][i]}
                        value={ARRAYS_OF_MARTIAL_STATUS_VALUES[mainGender][i]}
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
                    //returnUpdateMessage == "true" ? handleClose() : "";
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
      )}
      {/*  */}

      {OpenModalPP && <ModalUploadMPP photoNum={null}></ModalUploadMPP>}

      {/* {console.log("showMessage ", showMessage)} */}
      {/* {returnUpdateMessage &&
        NotificationManager.success(
          "Marital status updated successfully",
          "Success"
        )}*/}
      <NotificationContainer />
    </>
  );
}
