import React, { Component } from "react";
import List from "@material-ui/core/List/index";
import ListItem from "@material-ui/core/ListItem/index";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/index";
import ListItemText from "@material-ui/core/ListItemText/index";
import Divider from "@material-ui/core/Divider/index";
import { Badge } from "reactstrap";

const lists = [
  { id: 1, badge: "", name: "Facebook", color: "" },
  { id: 2, badge: "", name: "Apple", color: "" },
  { id: 3, badge: "new", name: "GitHub", color: "primary" },
  { id: 4, badge: "", name: "Google Map", color: "" },
  { id: 5, badge: "23-new", name: "Instagram", color: "danger" }
];

class BadgeIconList extends Component {
  render() {
    return (
      <List className="pb-0">
        {lists.map(item => (
          <div key={item.id}>
            <ListItem
              button
              key={item.id}
              onClick={event => this.handleToggle(event, item.id)}
            >
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                <Badge className="mt-3 mr-2" color={item.color}>
                  {item.badge}
                </Badge>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider light />
          </div>
        ))}
      </List>
    );
  }
}

export default BadgeIconList;
