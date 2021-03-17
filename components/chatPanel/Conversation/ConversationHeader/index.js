import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IntlMessages from "../../../../util/IntlMessages";

import {
  clearConversation,
  deleteConversation
} from "../../../../actions/Messages";

const ConversationHeader = ({ user }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="conv-header-container">
      <Grid container>
        <Grid item xs={1}>
          <img
            className="rounded-circle avatar size-40 align-self-end"
            src={user._ ? user._ : "https://via.placeholder.com/150x150"}
            alt={user.n}
          />
        </Grid>
        <Grid item xs={8} className="conv-head-name">
          <Typography variant="subtitle1" gutterBottom>
            {user.n}
          </Typography>
        </Grid>
        <Grid item xs={1} style={{ margin: "auto" }}>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                dispatch(clearConversation(user.i, user.co, user.ci, user.va));
              }}
            >
              <IntlMessages id="chat.clear" />
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </div>
  );
};

export default ConversationHeader;
