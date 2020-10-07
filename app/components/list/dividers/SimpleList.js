import React from "react";
import List from "@material-ui/core/List/index";
import ListItem from "@material-ui/core/ListItem/index";
import ListItemIcon from "@material-ui/core/ListItemIcon/index";
import ListItemText from "@material-ui/core/ListItemText/index";
import Divider from "@material-ui/core/Divider/index";

function SimpleList() {
  return (
    <div className="w-100">
      <List>
        <ListItem button>
          <ListItemIcon>
            <i className="zmdi zmdi-email zmdi-hc-fw zmdi-hc-2x" />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <i className="zmdi zmdi-mail-send zmdi-hc-fw zmdi-hc-2x" />
          </ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <i className="zmdi zmdi-star zmdi-hc-fw zmdi-hc-2x" />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItem>
        <Divider light />

        <ListItem button>
          <ListItemText primary="Spam (10)" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
    </div>
  );
}

export default SimpleList;
