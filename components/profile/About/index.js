import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import IntlMessages from "../../../util/IntlMessages";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Widget from "../../../components/Widget/index";
import { aboutList } from "../../../app/socialApps/Profile/data";
import AboutItem from "./AboutItem";
import { readProfileL2 } from "../../../actions/Profile";
import Flag from "react-world-flags";

export default function About({ aboutInfo }) {
  //const router = useRouter();
  // const [aboutL, setAboutList] = useState({});
  const l2Data = useSelector(state => state.profile.profileL2Data);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    setValue(value);
  };

  useEffect(() => {
    dispatch(
      readProfileL2(aboutInfo.id, aboutInfo.co, aboutInfo.ci, aboutInfo.va)
    );
  }, []);

  useEffect(() => {
    if (l2Data != null) {
      console.log("l2Data ", l2Data);
    }
  }, [l2Data]);

  return (
    <>
      {l2Data != null && (
        <div className="profile-about">
          <div className="profile-nat d-flex margin-TB">
            <div className="profile-icon-flag">
              <Flag code={l2Data.profile.nationality} />
            </div>
            <Typography variant="body1" gutterBottom>
              <IntlMessages id={`nationality.${l2Data.profile.nationality}`} />
            </Typography>
          </div>

          <div className="margin-TB d-flex-m">
            <div className="d-flex profile-about-subSec">
              <div className="profile-icon">
                <img src="../../../static/images/icons/profile/Education_Icons.svg" />
              </div>
              <Typography variant="body1" gutterBottom>
                <IntlMessages id={`education.${l2Data.profile.education}`} />
              </Typography>
            </div>
            <div className="d-flex profile-about-subSec">
              <div className="profile-icon">
                <img src="../../../static/images/icons/profile/Job_Title_Icon.svg" />
              </div>
              <Typography variant="body1" gutterBottom>
                {l2Data.profile.title}
              </Typography>
            </div>
          </div>

          <div className="margin-TB d-flex">
            <div className="profile-icon-2">
              <img src="../../../static/images/icons/profile/job_place_Icon.svg" />
            </div>
            <Typography variant="body1" gutterBottom>
              <IntlMessages id={`workd.${l2Data.profile.workd}`} />
            </Typography>
          </div>
          <div className="margin-TB d-flex">
            <div className="profile-icon-2">
              <img src="../../../static/images/icons/profile/Job_Title_Icon.svg" />
            </div>
            <Typography variant="body1" gutterBottom>
              {l2Data.profile.bio}
            </Typography>
          </div>
        </div>
      )}
    </>
    // <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
    //   <div className="card-header">
    //     <h4 className="card-title mb-0">About</h4>
    //   </div>
    //   <div className="jr-tabs-classic">
    //     <Tabs className="jr-tabs-up" value={value} onChange={handleChange}>
    //       <Tab className="jr-tabs-label" label="Overview" />
    //       <Tab className="jr-tabs-label" label="Work" />
    //       <Tab className="jr-tabs-label" label="Education" />
    //     </Tabs>
    //     <div className="jr-tabs-content jr-task-list">
    //       <div className="row">
    //         {value === 0 &&
    //           aboutList.map((about, index) => (
    //             <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
    //               <AboutItem data={about} />
    //             </div>
    //           ))}
    //         {value === 1 &&
    //           aboutList.map((about, index) => (
    //             <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
    //               <AboutItem data={about} />
    //             </div>
    //           ))}
    //         {value === 2 &&
    //           aboutList.map((about, index) => (
    //             <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
    //               <AboutItem data={about} />
    //             </div>
    //           ))}
    //       </div>
    //     </div>
    //   </div>
    // </Widget>
  );
}
