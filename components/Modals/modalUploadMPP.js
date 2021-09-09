import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  openModalPP,
  ppPhotoSelected,
  mpUpdateSelected
} from "../../actions/Profile";

import {
  mainPhotoSelected,
  mpUploadSuccess,
  mpUploadToken0Success,
  userSignOutSuccess
} from "../../actions/Auth";

import { addUserOnlineOffline } from "../../actions/Interaction";

import UploadImage from "../UploadImage";
import { DropzoneArea } from "material-ui-dropzone";
import {
  COUNTRY_CODE_TO_NAME_MAP,
  COUNTRY_CITY_MAP,
  COUNTRY_CITY_MAP_VALUE
} from "../../util/data";

import Router from "next/router";

///Modal
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";
/////
import Grid from "@material-ui/core/Grid";
import IntlMessages from "../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { styled } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Radio from "@material-ui/core/Radio";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
const useStyles = makeStyles(theme => ({
  ///modal
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  positionR: {
    position: "relative",
    padding: "1rem .5rem 2rem .5rem"
  },
  positionA: {
    position: "absolute",
    right: ".5rem",
    bottom: "0"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "1rem",
    boxShadow: theme.shadows[5],
    // padding: "1rem",
    position: "relative"
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

export default function ModalUploadMPP({ photoNum }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  ////// modal
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const OpenModalPP = useSelector(state => state.profile.openModalPP);
  const mpUploadFlag = useSelector(state => state.auth.mpUploadFlag);
  const token0 = useSelector(state => state.auth.token0);

  useEffect(() => {
    if (OpenModalPP) {
      handleOpen();
    }
  }, [OpenModalPP]);

  useEffect(() => {
    if (token0) {
      dispatch(userSignOutSuccess());
      Router.replace("/");
      dispatch(mpUploadToken0Success(false));
    }
  }, [token0]);

  useEffect(() => {
    if (mpUploadFlag) {
      dispatch(addUserOnlineOffline("channel_occupied"));
      handleClose();

      // dispatch(readMyPhotos(0, ""));
      // dispatch(mpUploadSuccess(false));
    }
  }, [mpUploadFlag]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(openModalPP(false));
  };
  return (
    <>
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
          {/* <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3"> */}
          <div className={classes.paper}>
            <div className="logo-form">
              <img
                src="../../static/images/Gila_Final_Logo_form.svg"
                alt="App"
                title="App"
              />
            </div>

            {/* <div className="app-login-main-content"> */}
            <div className="app-login-content-2">
              <div className="app-login-header">
                <h2>
                  {photoNum && <IntlMessages id="profile.uploadPP" />}
                  {photoNum == null && <IntlMessages id="profile.uploadMP" />}
                </h2>
              </div>

              <div className="app-login-form">
                <form className={selectedFile ? "drag drag-h" : "drag"}>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText={"Drop Photo"}
                    filesLimit={1}
                    maxFileSize={3000000}
                    // showPreviews={true}
                    showPreviewsInDropzone={false}
                    // getFileRemovedMessage={removedFile => {
                    //   return `File ${removedFile} was removed`;
                    // }}
                    //getDropRejectMessage={}
                    getFileAddedMessage={addedFile => {
                      return `${addedFile}`;
                    }}
                    onChange={files => {
                      if (files[0]) {
                        if (photoNum) {
                          dispatch(ppPhotoSelected(files[0]));
                        } else {
                          dispatch(mainPhotoSelected(files[0]));
                        }
                        setSelectedFile(files[0]);
                      }
                    }}
                  />
                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Grid container style={{ paddingTop: "25px" }} spacing={12}>
                      {selectedFile && <UploadImage photoNum={photoNum} />}
                    </Grid>
                  </div>
                </form>
              </div>

              {/* <div className="app-login-form">
                {openEdit
                )}
              </div> */}
            </div>
            {/* </div> */}
            {/* </div> */}

            {/* </form> */}
          </div>
        </Fade>
      </Modal>
      {/*  */}
    </>
  );
}
