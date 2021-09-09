import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import IntlMessages from "../../../util/IntlMessages";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import { ARRAYS_OF_TPERCENT } from "../../../util/data";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  readProfileL2,
  readMyProfile,
  changeMyPassword,
  changeUserLoginPhone,
  verifyUserLoginPhoneChange,
  readMyPhoneAndPwData,
  readMyPaymentAndSub,
  ppUpload,
  ppRemove,
  openModal
} from "../../../actions/Profile";

import {
  getPhotoPPReadOutgoingRequestsApprovales,
  getPhotoPPReadIncomingApprovedPendingRequests,
  sendLoveMatchRequest,
  getLoveSentRequests,
  getLoveMatchedAndReceivedRequests,
  getUserViews,
  blockUser,
  unblockUser,
  getBlockedUsers,
  getNotificationViewPPLove
} from "../../../actions/Interaction";

import Flag from "react-world-flags";
import ModalUploadL2 from "../../Modals/modalUpdateL2";

import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

export default function About({ aboutInfo }) {
  const router = useRouter();
  const l2Data = useSelector(state => state.profile.profileL2Data);
  const userBlockedMessage = useSelector(
    state => state.profile.userBlockedMessage
  );
  const myProfileDataL2 = useSelector(state => state.profile.myProfileDataL2);
  const OpenModal = useSelector(state => state.profile.openModal);

  const userClickedProfile = useSelector(
    state => state.home.userClickedProfile
  );

  const [disData, setDisData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setDisData(null);
    if (
      aboutInfo == null &&
      userClickedProfile &&
      userClickedProfile.flag == "read"
    ) {
      dispatch(
        readProfileL2(
          userClickedProfile.i,
          userClickedProfile.co,
          userClickedProfile.ci,
          userClickedProfile.va
        )
      );
    } else if (aboutInfo != null && router.query.flag == "readMe") {
      dispatch(readMyProfile("L2"));
    }
  }, [aboutInfo]);

  useEffect(() => {
    if (userClickedProfile == null && router.query.flag != "readMe") {
      const va = router.query.id
        .substring(router.query.id.length, router.query.id.length - 2)
        .replace(/_/, "");
      const ci = router.query.id
        .substring(router.query.id.length - 2, router.query.id.length - 4)
        .replace(/_/, "");

      const co = router.query.id
        .substring(router.query.id.length - 4, router.query.id.length - 7)
        .replace(/_/, "");

      const id = router.query.id
        .substring(router.query.id.length - 7, 0)
        .replace(/_/, "");

      // let va = 0;
      // ci.length == 1
      //   ? (va = arr1[i].substring(5, 7).replace(/_/, ""))
      //   : (va = arr1[i].substring(6, 8).replace(/_/, ""));

      dispatch(readProfileL2(id, co, ci, va));
    }
  }, []);

  useEffect(() => {
    if (userBlockedMessage) {
      NotificationManager.error(userBlockedMessage);
      dispatch(
        readProfileL2(
          userClickedProfile.i,
          userClickedProfile.co,
          userClickedProfile.ci,
          userClickedProfile.va
        )
      );
    }
  }, [userBlockedMessage]);

  useEffect(() => {
    setDisData(null);
    if (
      l2Data != null
      // &&
      // userClickedProfile &&
      // userClickedProfile.flag == "read"
    ) {
      setDisData(l2Data);
    }
  }, [l2Data]);

  useEffect(() => {
    setDisData(null);
    if (myProfileDataL2 != null && router.query.flag == "readMe") {
      setDisData(myProfileDataL2);
    }
  }, [myProfileDataL2]);

  const onOpenModal = () => {
    dispatch(openModal(true));
  };

  return (
    <>
      {disData != null && (
        <>
          {/* <Photos photos={myPhotos} /> */}
          <div className="profile-about">
            <Grid container>
              <Grid item xs={12} className="margin-TB">
                <Grid container spacing={12}>
                  <Grid item xs={3}>
                    <div
                      className="profile-icon-flag"
                      style={{ width: "50%", margin: ".6rem auto" }}
                    >
                      <Flag code={disData.nationality} />
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body1" gutterBottom>
                      <IntlMessages id={`nationality.${disData.nationality}`} />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {disData.tpercent && (
                <Grid item xs={12} className="margin-TB">
                  <Grid container>
                    <Grid item xs={3}>
                      <div
                        className="profile-icon-2"
                        style={{ width: "50%", margin: "auto" }}
                      >
                        <img src="../../../static/images/icons/new-profile/tprecent.svg" />
                      </div>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="body1" gutterBottom>
                        {ARRAYS_OF_TPERCENT[disData.tpercent]}
                        {/* <IntlMessages id={`nationality.${disData.tpercent}`} /> */}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item xs={12} className="margin-TB">
                <Grid container>
                  <Grid item xs={3}>
                    <div
                      className="profile-icon-2"
                      style={{ width: "50%", margin: "auto" }}
                    >
                      <img src="../../../static/images/icons/new-profile/education.svg" />
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body1" gutterBottom>
                      <IntlMessages id={`education.${disData.education}`} />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} className="margin-TB">
                <Grid container>
                  <Grid item xs={3}>
                    <div
                      className="profile-icon-2"
                      style={{ width: "50%", margin: "auto" }}
                    >
                      <img src="../../../static/images/icons/new-profile/title.svg" />
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body1" gutterBottom>
                      {disData.title}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} className="margin-TB">
                <Grid container>
                  <Grid item xs={3}>
                    <div
                      className="profile-icon-2"
                      style={{ width: "50%", margin: "auto" }}
                    >
                      <img src="../../../static/images/icons/new-profile/workd.svg" />
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body1" gutterBottom>
                      {router.query.flag == "readMe" && (
                        <IntlMessages id={`workd.${disData.workd - 1}`} />
                      )}
                      {userClickedProfile &&
                        userClickedProfile.flag == "read" && (
                          <IntlMessages id={`workd.${disData.workd}`} />
                        )}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} className="margin-TB">
                <Grid container>
                  <Grid item xs={3}>
                    <div
                      className="profile-icon-2"
                      style={{ width: "50%", margin: "auto" }}
                    >
                      <img src="../../../static/images/icons/new-profile/bio.svg" />
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body1" gutterBottom>
                      {disData.bio}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* ////// Edit Icon */}
            <div className="p-relative margin-TB">
              {router.query.flag == "readMe" && (
                <IconButton
                  aria-label="Edit"
                  onClick={onOpenModal}
                  className="edit-icon-large"
                >
                  <EditIcon></EditIcon>
                </IconButton>
              )}
            </div>
          </div>
        </>
      )}
      {OpenModal && router.query.flag == "readMe" && (
        <ModalUploadL2 data={disData}></ModalUploadL2>
      )}
    </>
  );
}
