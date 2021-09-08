import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { resetCheckMpUpload } from "../../actions/Auth";

///Modal
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";
/////
import Typography from "@material-ui/core/Typography";
import IntlMessages from "../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Photos from "../profile/Photos";
import { openModal } from "../../actions/Profile";
import ModalSettings from "../Modals/modalSettings";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  ///modal
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "1rem",
    boxShadow: theme.shadows[5],
    padding: "1rem",
    position: "relative"
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

export default function ModalPPInfo({ popSub }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sub = useSelector(state => state.auth.sub);
  const OpenModal = useSelector(state => state.profile.openModal);
  let diffJnt = moment().diff(sub, "hours");
  const [openSub, setOpenSub] = useState(false);


  useEffect(() => {
//console.log("moment #####",moment(new Date()).format("M/D/YYYY"),moment().format("M/D/YYYY"))
  }, []);


  ////// modal
  const [open, setOpen] = useState(true);
  const [viewPPComponent, seViewPPComponent] = useState(false);

  const handleClose = () => {
    setOpen(false);
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
          <div className={classes.paper}>
            <div className="logo-form">
              <img
                src="../../static/images/Gila_Final_Logo_form.svg"
                alt="App"
                title="App"
              />
            </div>
            <form className={classes.positionR} noValidate autoComplete="off">
              {popSub && (
                <>
                  
                  <div style={{textAlign:"center"}}>
                    {moment().format("M/D/YYYY")==moment(new Date(sub)).format("M/D/YYYY")?
                      <>
                      <Typography variant="h6" gutterBottom>
                          <IntlMessages id="sub.expireToday" />
                        </Typography>
                        <Typography
                    variant="overline"
                    style={{ fontSize: "1.5rem" ,fontWeight:"bold"}}
                    gutterBottom
                  >
                       {moment(new Date(sub)).format("h:mma")}
                       </Typography>
                      </>
                    :
                    
                   <>
                      <Typography variant="h6" gutterBottom>
                    <IntlMessages id="sidebar.subMark" />
                  </Typography>

                    <Typography
                variant="overline"
                style={{ fontSize: "1.5rem" }}
                gutterBottom
              >
                   { moment(new Date(sub)).format("M/D/YYYY")}
                    
                    </Typography>
                    </>
                    }
                    </div>
                 

                  <Grid container>
                    <Grid item xs={8}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setOpenSub(true);
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

                    <Grid item xs={4} style={{ textAlign: "end" }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleClose();
                        }}
                        color="primary"
                        className="linear-g-r"
                      >
                        <IntlMessages id="appModule.cancel" />
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}

              {!popSub && (
                <>
                  <Typography variant="h6" gutterBottom>
                    <IntlMessages id="profile.privateImg" />
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <IntlMessages id="pp.madalInfo1" />
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    <IntlMessages id="pp.madalInfo2" />
                  </Typography>

                  {viewPPComponent && <Photos newUser={true} />}

                  <Grid container>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleClose();
                        }}
                        color="primary"
                        className="linear-g-r"
                      >
                        <IntlMessages id="appModule.cancel" />
                      </Button>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: "end" }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          seViewPPComponent(true);
                        }}
                        color="primary"
                        className="linear-g-r"
                      >
                        <IntlMessages id="report.yes" />
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </form>
          </div>
        </Fade>
      </Modal>
      {/*  */}
      {OpenModal && openSub && <ModalSettings sub={true} />}
    </>
  );
}
