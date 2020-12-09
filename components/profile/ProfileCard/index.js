import React from "react";
import IntlMessages from "../../../util/IntlMessages";
import Typography from "@material-ui/core/Typography";
import Flag from "react-world-flags";
import moment from "moment";
import { COUNTRY_MAP, COUNTRY_CITY_MAP } from "../../../util/data";

export default function ProfileCard({ mainInfo }) {
  return (
    <div>
      <div className="profile-card">
        <div className="card-img">
          <img src={mainInfo.photo} alt="main photo" />
          <div className="card-img-icon">
            <div className="card-icon">
              <img src="../../../static/images/icons/standard/Love_Icon_Standard.svg" />
            </div>
            <div className="card-icon">
              <img src="../../../static/images/icons/standard/Messages_Icon_Standard.svg" />
            </div>
          </div>
        </div>
        <div className="card-info">
          <div className="d-flex">
            <Typography variant="body1" className="card-h-row" gutterBottom>
              {mainInfo.n}
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
        </div>
      </div>

      {/* <div className="profile-intro card shadow  border-0 text-center">
        <div className="pi-header">
          <div className="card-image layer">
            <img
              className="avatar-circle"
              src={mainInfo.photo}
              alt="Team Member"
            />
          </div>
        </div>
        <div className="pi-content">
          <h4>{mainInfo.n}</h4>
          <p>Designer</p>
          <p className="card-text">
            Hello everyone, I am Maryam. My designs are used in several big
            companies in United State and other countries.
          </p>
        </div>
        <div className="pi-footer">
          <div className="icons-wrapper">
            <span className="icon facebook-icon jr-link">
              <i className="zmdi zmdi-facebook zmdi-hc-fw zmdi-hc-lg" />
            </span>

            <span className="icon twitter-icon jr-link">
              <i className="zmdi zmdi-twitter zmdi-hc-fw zmdi-hc-lg" />
            </span>

            <span className="icon linkedin-icon jr-link">
              <i className="zmdi zmdi-linkedin zmdi-hc-fw zmdi-hc-lg" />
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
