import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import IntlMessages from "../../../util/IntlMessages";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import {
  readProfileL2,
  readMyProfile,
  openModal
} from "../../../actions/Profile";
import Flag from "react-world-flags";
import ModalUploadL2 from "../../Modals/modalUpdateL2";
export default function About({ aboutInfo }) {
  const router = useRouter();
  const l2Data = useSelector(state => state.profile.profileL2Data);
  const myProfileDataL2 = useSelector(state => state.profile.myProfileDataL2);
  const OpenModal = useSelector(state => state.profile.openModal);
  const [disData, setDisData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setDisData(null);
    if (router.query.flag == "read") {
      dispatch(
        readProfileL2(aboutInfo.id, aboutInfo.co, aboutInfo.ci, aboutInfo.va)
      );
    } else if (router.query.flag == "readMe") {
      dispatch(readMyProfile("L2"));
    }
  }, [router.query]);

  useEffect(() => {
    if (l2Data != null && router.query.flag == "read") {
      setDisData(l2Data.profile);
    }
  }, [l2Data]);
  useEffect(() => {
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
        <div className="profile-about">
          <div className="profile-nat d-flex margin-TB">
            <div className="profile-icon-flag">
              <Flag code={disData.nationality} />
            </div>
            <Typography variant="body1" gutterBottom>
              <IntlMessages id={`nationality.${disData.nationality}`} />
            </Typography>
          </div>
          <div className="margin-TB d-flex-m">
            <div className="d-flex profile-about-subSec">
              <div className="profile-icon">
                <img src="../../../static/images/icons/profile/Education_Icons.svg" />
              </div>
              <Typography variant="body1" gutterBottom>
                <IntlMessages id={`education.${disData.education}`} />
              </Typography>
            </div>
            <div className="d-flex profile-about-subSec">
              <div className="profile-icon">
                <img src="../../../static/images/icons/profile/Job_Title_Icon.svg" />
              </div>
              <Typography variant="body1" gutterBottom>
                {disData.title}
              </Typography>
            </div>
          </div>

          <div className="margin-TB d-flex">
            <div className="profile-icon-2">
              <img src="../../../static/images/icons/profile/job_place_Icon.svg" />
            </div>
            <Typography variant="body1" gutterBottom>
              <IntlMessages id={`workd.${disData.workd}`} />
            </Typography>
          </div>
          <div className="margin-TB d-flex">
            <div className="profile-icon-2">
              <img src="../../../static/images/icons/profile/Job_Title_Icon.svg" />
            </div>
            <Typography variant="body1" gutterBottom>
              {disData.bio}
            </Typography>
          </div>
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
      )}
      {OpenModal && <ModalUploadL2 data={disData}></ModalUploadL2>}
    </>
  );
}
