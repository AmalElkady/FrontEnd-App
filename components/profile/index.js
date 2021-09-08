import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getCookie } from "../../util/session";
import base64url from "base64url";
import ProfileCard from "./ProfileCard";
import IntlMessages from "../../util/IntlMessages";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import About from "./About";
import ModalSettings from "../Modals/modalSettings";
import Carousel from "../../app/components/carousel";
import Photos from "./Photos";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import {
  readMyProfile,
  readMyPhotos,
  openModalPP,
  updateMainPSuccess,
  openModal
} from "../../actions/Profile";

import { mpUploadSuccess } from "../../actions/Auth";

import { requestPhotoRead, profileUserClicked } from "../../actions/Home";
import { mapUserPhotoUrl } from "../../helpers/mapUserPhotoUrl";
import { getProfiles } from "../../actions/Messages";

export default function Profile() {
  const router = useRouter();
  const [profileCard, setProfileCard] = useState(null);
  const [aboutInfo, setAboutInfo] = useState(null);
  const myProfileL1Data = useSelector(state => state.profile.myProfileDataL1);
  const userClickedProfile = useSelector(
    state => state.home.userClickedProfile
  );
  const mainPhotoUpdated = useSelector(state => state.profile.mainPhotoUpdated);
  const myPhotoSigned = useSelector(state => state.profile.myPhotoSigned);
  const userBlockedMessage = useSelector(
    state => state.profile.userBlockedMessage
  );

  const dispatch = useDispatch();
  const OpenModal = useSelector(state => state.profile.openModal);

  const [finalPhotoSrc, setFinalPhotoSrc] = useState({});

  const returnedProfiles = useSelector(
    state => state.messages.returnedProfiles
  );

  const photoReadSignedRequest = useSelector(
    state => state.home.photoReadSignedRequest
  );

  const va = router.query.id
    ? router.query.id
        .substring(router.query.id.length, router.query.id.length - 2)
        .replace(/_/, "")
    : "";

  const ci = router.query.id
    ? router.query.id
        .substring(router.query.id.length - 2, router.query.id.length - 4)
        .replace(/_/, "")
    : "";

  const co = router.query.id
    ? router.query.id
        .substring(router.query.id.length - 4, router.query.id.length - 7)
        .replace(/_/, "")
    : "";

  const id = router.query.id
    ? router.query.id.substring(router.query.id.length - 7, 0).replace(/_/, "")
    : "";

  useEffect(() => {
    console.log("userClickedProfile ", userClickedProfile);
    if (userClickedProfile != null && router.query) {
      if (userClickedProfile.flag == "read") {
        console.log("userClickedProfile !=null ", userClickedProfile);
        setAboutInfo(null);

        // setProfileCard({
        //   i: userClickedProfile.i,
        //   co: userClickedProfile.co,
        //   ci: userClickedProfile.ci,
        //   va: userClickedProfile.va,
        //   n: userClickedProfile.n,
        //   _: userClickedProfile._,
        //   b: userClickedProfile.b,
        //   gd: userClickedProfile.gd,
        //   m: userClickedProfile.m,
        //   timeScore: userClickedProfile.timeScore
        // });
        // setAboutInfo({
        //   id: userClickedProfile.i,
        //   co: userClickedProfile.co,
        //   ci: userClickedProfile.ci,
        //   va: userClickedProfile.va
        // });
      }
    }
    // else if (userClickedProfile === null && router.query.flag != "readMe") {
    //   console.log("router.query card index ==null %%%%%", router.query);
    //   dispatch(getProfiles([`${co}_${ci}_${va}_${id}`]));
    // }
    // else if (router.query.flag == "readMe") {
    //   console.log("read my profile *******");
    //   dispatch(readMyProfile("L1"));
    // }
  }, [userClickedProfile]);

  useEffect(() => {
    if (router.query.flag == "readMe") {
      dispatch(profileUserClicked(null));
      console.log("read my profile *******");
      dispatch(readMyProfile("L1"));
    } else if (userClickedProfile === null && router.query.flag != "readMe") {
      console.log("router.query card index ==null %%%%% 2", router.query);
      dispatch(getProfiles([`${co}_${ci}_${va}_${id}`]));
    }
  }, [router.query]);

  useEffect(() => {
    if (returnedProfiles) {
      // dispatch(readMyPhotos(0, ""));
      console.log("returnedProfiles ", returnedProfiles);
      // const newUser = returnedProfiles[0];
      // newUser.i = id;
      // newUser.co = co;
      // newUser.ci = ci;
      // newUser.va = va;

      //dispatch(profileUserClicked(returnedProfiles[0]));
      dispatch(requestPhotoRead());
    }
  }, [returnedProfiles]);

  const mpUploadFlag = useSelector(state => state.auth.mpUploadFlag);

  useEffect(() => {
    if (mpUploadFlag) {
      console.log("success upload mp");
      // Read Photo Again
      dispatch(readMyPhotos(0, ""));
      dispatch(mpUploadSuccess(false));
    }
  }, [mpUploadFlag]);

  useEffect(() => {
    if (photoReadSignedRequest != null) {
      if (returnedProfiles != null && returnedProfiles[0] != null) {
        returnedProfiles[0]._ = `${co}_${ci}_${va}/${id}${returnedProfiles[0]._}`;
        returnedProfiles[0].flag = "read";
        returnedProfiles[0].co = co;
        returnedProfiles[0].ci = ci;
        returnedProfiles[0].va = va;

        const newUserf = mapUserPhotoUrl(
          returnedProfiles,
          photoReadSignedRequest.signedRequest
        );
        // setNewUsers(AllCountriesOnlineUsersNew);

        dispatch(profileUserClicked(newUserf[0]));
      }
    }
  }, [photoReadSignedRequest]);

  useEffect(() => {
    if (myProfileL1Data != null && router.query.flag == "readMe") {
      dispatch(readMyPhotos(0, ""));
      let token = getCookie("access_token");
      let tokenUserData = JSON.parse(base64url.decode(token.split(".")[1]));
      setAboutInfo({
        id: tokenUserData.id,
        co: myProfileL1Data.profile.L1.country,
        ci: myProfileL1Data.profile.L1.city,
        va: myProfileL1Data.profile.L1.varea
      });
    }
  }, [myProfileL1Data]);

  useEffect(() => {
    if (
      myPhotoSigned != null &&
      !myPhotoSigned.includes("_49x49_mp0") &&
      router.query.flag == "readMe"
    ) {
      setFinalPhotoSrc(myPhotoSigned);
    }
  }, [myPhotoSigned]);

  useEffect(() => {
    if (mainPhotoUpdated) {
      NotificationManager.success(<IntlMessages id="profile.notifPhoto" />);
      dispatch(readMyProfile("L1"));
      dispatch(openModalPP(false));
      dispatch(updateMainPSuccess(false));
    }
  }, [mainPhotoUpdated]);

  useEffect(() => {
    if (
      myProfileL1Data != null &&
      finalPhotoSrc != null &&
      router.query.flag == "readMe"
    ) {
      let token = getCookie("access_token");
      let tokenUserData = JSON.parse(base64url.decode(token.split(".")[1]));
      setProfileCard({
        co: myProfileL1Data.profile.L1.country,
        ci: myProfileL1Data.profile.L1.city,
        n: myProfileL1Data.profile.L1.profile,
        _: finalPhotoSrc,
        b: myProfileL1Data.profile.L1.birth,
        gd: myProfileL1Data.profile.L1.gender,
        m: myProfileL1Data.profile.L1.martial
      });
      // setAboutInfo({
      //   id: tokenUserData.id,
      //   co: myProfileL1Data.profile.L1.country,
      //   ci: myProfileL1Data.profile.L1.city,
      //   va: myProfileL1Data.profile.L1.varea
      // });
    }
  }, [finalPhotoSrc]);

  return (
    <>
      <div className="profile-container">
        <Grid container>
          <Grid item xs={6} className="profile-Grid-container">
            {
              //  userClickedProfile != null &&
              <ProfileCard
                mainInfo={
                  userClickedProfile == null ? profileCard : userClickedProfile
                }
              />
            }
            <br />
            {userClickedProfile != null &&
              userClickedProfile.flag == "read" &&
              userBlockedMessage == null && (
                <Photos
                // id={userClickedProfile.i}
                // co={userClickedProfile.co}
                // ci={userClickedProfile.ci}
                // va={userClickedProfile.va}
                />
              )}
            {router.query.flag == "readMe" && <Photos />}
            {/* <Photos /> */}
          </Grid>
          {console.log("aboutInfo ^^^^^^^ ", aboutInfo)}
          <Grid item xs={6} className="profile-Grid-container">
            {// aboutInfo.id &v &
            //  aboutInfo={aboutInfo}
            aboutInfo != null ? (
              <About aboutInfo={aboutInfo} />
            ) : (
              <About aboutInfo={null} />
            )}
          </Grid>
          {userClickedProfile &&
            userClickedProfile.flag == "read" &&
            router.query.flag != "readMe" && (
              <Grid
                item
                xs={12}
                style={{
                  textAlign: "end"
                  // marginTop: "1rem",
                  // marginBottom: "1rem"
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    // setClickedBtn("delete");
                    dispatch(openModal(true));
                  }}
                  color="primary"
                  className="linear-g-r"
                >
                  <IntlMessages id="profile.report" />
                </Button>
              </Grid>
            )}
        </Grid>
      </div>
      {OpenModal && userClickedProfile && userClickedProfile.flag == "read" && (
        <ModalSettings report={true} user={userClickedProfile} />
      )}
      <NotificationContainer />
    </>
  );
}
