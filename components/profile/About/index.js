import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Widget from "../../../components/Widget/index";
import { aboutList } from "../../../app/socialApps/Profile/data";
import AboutItem from "./AboutItem";
import { readProfileL2 } from "../../../actions/Profile";

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
    console.log("aboutInfo id$$$$ ", aboutInfo);
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
    <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
      <div className="card-header">
        <h4 className="card-title mb-0">About</h4>
      </div>
      <div className="jr-tabs-classic">
        <Tabs className="jr-tabs-up" value={value} onChange={handleChange}>
          <Tab className="jr-tabs-label" label="Overview" />
          <Tab className="jr-tabs-label" label="Work" />
          <Tab className="jr-tabs-label" label="Education" />
        </Tabs>
        <div className="jr-tabs-content jr-task-list">
          <div className="row">
            {value === 0 &&
              aboutList.map((about, index) => (
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                  <AboutItem data={about} />
                </div>
              ))}
            {value === 1 &&
              aboutList.map((about, index) => (
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                  <AboutItem data={about} />
                </div>
              ))}
            {value === 2 &&
              aboutList.map((about, index) => (
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                  <AboutItem data={about} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </Widget>
  );
}
