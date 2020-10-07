import React, { Component } from "react";
import Paper from "@material-ui/core/Paper/index";
import Tabs from "@material-ui/core/Tabs/index";
import Tab from "@material-ui/core/Tab/index";

class DisabledTabs extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <Paper>
        <Tabs
          value={this.state.value}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
          variant="scrollable"
          scrollButtons="on"
        >
          <Tab className="tab" label="Active" />
          <Tab className="tab" label="Disabled" disabled />
          <Tab className="tab" label="Active" />
        </Tabs>
      </Paper>
    );
  }
}

export default DisabledTabs;
