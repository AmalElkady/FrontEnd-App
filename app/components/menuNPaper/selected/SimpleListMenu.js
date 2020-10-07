import React, { Component } from "react";
import List from "@material-ui/core/List/index";
import ListItem from "@material-ui/core/ListItem/index";
import ListItemText from "@material-ui/core/ListItemText/index";
import Menu from "@material-ui/core/Menu/index";
import MenuItem from "@material-ui/core/MenuItem/index";

const options = [
  "Show all notification content",
  "Hide sensitive Information",
  "Hide all notification content"
];

class SimpleListMenu extends Component {
  state = {
    anchorEl: undefined,
    open: false,
    selectedIndex: 1
  };

  button = undefined;

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, open: false });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <List>
          <ListItem
            button
            aria-haspopup
            aria-controls="lock-menu"
            aria-label="On Device Lock"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="On Device Lock"
              secondary={options[this.state.selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleRequestClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default SimpleListMenu;
