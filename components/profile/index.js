import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getCookie } from "../../util/session";
import base64url from "base64url";
import ProfileCard from "./ProfileCard";
import Grid from '@material-ui/core/Grid';
import About from "./About";
import { readMyProfile, readMyPhotos } from "../../actions/Profile";
import { requestPhotoRead } from "../../actions/Home";
import { mapUserPhotoUrl } from "../../helpers/mapUserPhotoUrl";

export default function Profile() {
  const router = useRouter();
  const [profileCard, setProfileCard] = useState({});
  const [aboutInfo, setAboutInfo] = useState({});
  const myProfileL1Data = useSelector(state => state.profile.myProfileDataL1);
  const myPhotoSigned = useSelector(state => state.profile.myPhotoSigned);
  const dispatch = useDispatch();
  useEffect(() => {
    if (router.query) {
      if (router.query.flag == "read") {
        setProfileCard({
          co: router.query.co,
          ci: router.query.ci,
          n: router.query.n,
          photo: router.query._,
          b: router.query.b,
          gd: router.query.gd,
          m: router.query.m,
          timeScore: router.query.timeScore
        });
        setAboutInfo({
          id: router.query.i,
          co: router.query.co,
          ci: router.query.ci,
          va: router.query.va
        });
      } else if (router.query.flag == "readMe") {
        dispatch(readMyProfile("L1"));
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (myProfileL1Data != null && router.query.flag == "readMe") {
      dispatch(readMyPhotos(0));
    }
  }, [myProfileL1Data]);
  useEffect(() => {
    if (myPhotoSigned != null && router.query.flag == "readMe") {
      let token = getCookie("access_token");
      let tokenUserData = JSON.parse(base64url.decode(token.split(".")[1]));
      setProfileCard({
        co: myProfileL1Data.profile.L1.country,
        ci: myProfileL1Data.profile.L1.city,
        n: myProfileL1Data.profile.L1.profile,
        photo: myPhotoSigned,
        b: myProfileL1Data.profile.L1.birth,
        gd: myProfileL1Data.profile.L1.gender,
        m: myProfileL1Data.profile.L1.martial
      });
      setAboutInfo({
        id: tokenUserData.id,
        co: myProfileL1Data.profile.L1.country,
        ci: myProfileL1Data.profile.L1.city,
        va: myProfileL1Data.profile.L1.varea
      });
    }
  }, [myPhotoSigned]);
  return (
    <>
      <div className="profile-container">
      <Grid container spacing={12}> 
				<Grid item xs={6} className="profile-Grid-container">
        {profileCard.co && <ProfileCard mainInfo={profileCard} />}
        </Grid>
        <Grid item xs={6} className="profile-Grid-container">
        {aboutInfo.id && <About aboutInfo={aboutInfo} />}
        </Grid>
        </Grid>
      </div>
    </>
  );
}
