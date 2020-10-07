import React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Router from "next/router"
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from "next/link"
import IntlMessages from '../util/IntlMessages';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';



import {
  hideMessage,
  showAuthLoader,
  userSignOut
} from '../actions/Auth';

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

	console.log("COMPONENT AUTO LOGOUT");
  }

  render() {
  

	
    const {showMessage, loader, alertMessage} = this.props; //phoneVerified
    return (
	<div>

	{ 	
                    this.props.showAuthLoader() &&
                    this.props.userSignOut() && <div></div>
	}

        {
          loader &&
          <div className="loader-view">
            <CircularProgress/>
          </div>
        }
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer/>
	
      </div>
	
    )
  }
}

const mapStateToProps = ({auth}) => {
  const {loader, alertMessage, showMessage, authUser} = auth;
  return {loader, alertMessage, showMessage, authUser}
};

export default connect(mapStateToProps, {
  hideMessage,
  showAuthLoader,
  userSignOut
})(AutoLogout);
