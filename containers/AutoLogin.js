import React from "react";
import { connect } from "react-redux";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import CircularProgress from "@material-ui/core/CircularProgress";

import { hideMessage, showAuthLoader, userSignOut } from "../actions/Auth";

class AutoLogout extends React.Component {
  constructor() {
    super();
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
  }

  render() {
    const { showMessage, loader, alertMessage } = this.props; //phoneVerified
    return (
      <div>
        {this.props.showAuthLoader() && this.props.userSignOut() && <div></div>}

        {loader && (
          // <div className="loader-view">
          //   <CircularProgress />
          // </div>
          <div className="loading-border loading--full-height">
            <img
              src="../static/images/Gila_Final_Logo_form.svg"
              alt="App"
              title="App"
              className="rotate-image loader-img"
            />
          </div>
        )}
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loader, alertMessage, showMessage, authUser } = auth;
  return { loader, alertMessage, showMessage, authUser };
};

export default connect(mapStateToProps, {
  hideMessage,
  showAuthLoader,
  userSignOut
})(AutoLogout);
