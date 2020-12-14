import React from "react";
import { useSelector } from "react-redux";
import IntlMessages from "../../../util/IntlMessages";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import Flag from "react-world-flags";
import moment from "moment";
import {
  COUNTRY_MAP,
  COUNTRY_CITY_MAP,
  ARRAYS_OF_MARTIAL_STATUS
} from "../../../util/data";

export default function ProfileCard({ mainInfo }) {
  const searchState = useSelector(state => state.home.searchState);
  const router = useRouter();
  return (
    <div className="profile-card">
      <div className="card-container-img">
        <div className="card-img">
          <img src={mainInfo.photo} alt="main photo" />
        </div>
        {searchState == "active" && <div className="online-flag"></div>}
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
        <div className="d-flex">
          <Typography
            variant="body1"
            className="card-h-row p-relative"
            gutterBottom
          >
            {ARRAYS_OF_MARTIAL_STATUS[mainInfo.gd][mainInfo.m]}
            {router.query.flag == "readMe" && (
              <IconButton aria-label="Edit" className="edit-icon">
                <EditIcon fontSize="small"></EditIcon>
              </IconButton>
            )}
          </Typography>
        </div>
      </div>
    </div>
  );
}
