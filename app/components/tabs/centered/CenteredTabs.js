import React, { Component } from "react";
import Paper from "@material-ui/core/Paper/index";
import Tabs from "@material-ui/core/Tabs/index";
import Tab from "@material-ui/core/Tab/index";

class CenteredTabs extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <Paper className="w-100">
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          scrollButtons="on"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Paper>
    );
  }
}

export default CenteredTabs;
