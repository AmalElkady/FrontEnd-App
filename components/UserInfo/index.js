import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Router from "next/router";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { userSignOut } from "../../actions/Auth";
import { resetStates } from "../../actions/Home";
import { readMyPhotos } from "../../actions/Profile";
import IntlMessages from "../../util/IntlMessages";

export default function UserInfo() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [photoSrc, setPhotoSrc] = useState(null);

  const dispatch = useDispatch();
  const Name = useSelector(state => state.auth.name);
  const MyPhotoSigned = useSelector(state => state.profile.myPhotoSigned);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(readMyPhotos(0, "small"));
  }, []);

  useEffect(() => {
    if (MyPhotoSigned != null && MyPhotoSigned.includes("_49x49_mp")) {
      setPhotoSrc(MyPhotoSigned);
    }
  }, [MyPhotoSigned]);

  return (
    <div className="user-profile d-flex flex-row align-items-center">
      <Avatar
        alt="..."
        src={photoSrc ? photoSrc : "https://via.placeholder.com/150x150"}
        className="user-avatar "
        onClick={() => {
          Router.push({
            pathname: `/home/profile`,
            query: { flag: "readMe" }
          });
        }}
      />
      <div className="user-detail">
        <h4
          className="user-name"
          onClick={() => {
            Router.push({
              pathname: `/home/profile`,
              query: { flag: "readMe" }
            });
          }}
        >
          {Name}
          {/* <i className="zmdi zmdi-caret-down zmdi-hc-fw align-middle" /> */}
        </h4>
      </div>
      {/* <Menu
        className="user-info"
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleRequestClose}
        PaperProps={{
          style: {
            minWidth: 120,
            paddingTop: 0,
            paddingBottom: 0
          }
        }}
      >
        <MenuItem
          onClick={() => {
            Router.push({
              pathname: `/home/profile`,
              query: { flag: "readMe" }
            });
            handleRequestClose();
          }}
        >
          <i className="zmdi zmdi-account zmdi-hc-fw mr-2" />
          <IntlMessages id="popup.profile" />
        </MenuItem>
        <MenuItem onClick={handleRequestClose}>
          <i className="zmdi zmdi-settings zmdi-hc-fw mr-2" />
          <IntlMessages id="popup.setting" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleRequestClose();
            dispatch(resetStates());
            dispatch(userSignOut());
          }}
        >
          <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2" />

          <IntlMessages id="popup.logout" />
        </MenuItem>
      </Menu> */}
    </div>
  );
}
