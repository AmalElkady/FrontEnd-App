import React from "react";
import { connect } from "react-redux";
import Router from "next/router";
import Button from "@material-ui/core/Button";
import { getCookie } from "../util/session";
import base64url from "base64url";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "next/link";
import IntlMessages from "../util/IntlMessages";
import Grid from "@material-ui/core/Grid";
import "react-phone-input-2/lib/style.css";
import { DropzoneArea } from "material-ui-dropzone";
import ModalUpload from "../components/Modals/modalUpload";
import UploadImage from "../components/UploadImage"

//sendResetToken ===> mpUpload
//changePassword ===> mpUploadClear
//<DropzoneArea
//  acceptedFiles={['image/*']}
//  dropzoneText={"Drag and drop an image here or click"}
//    filesLimit={1}
//	maxFileSize={3000000}
//  onChange={(files) => console.log('Files:', files)}
///>
//filesLimit	number	3   Maximum number of files that can be loaded into the dropzone.
//maxFileSize	number	3000000	Maximum file size (in bytes) that the dropzone will accept.

//check  (MPFlag in AUTH) in component did update
//request MPUpload  --- (will call 2 APIs first check MPUpload second request MPUpload)
//recieve upload s3SignedRequest and upoad then call MPUpload (will call 1 API check MPUpload) and change (MPFlag in Auth)

import {
  hideMessage,
  showAuthLoader,
  mpUpload,
  mpUploadClear,
  userSignOut,
  checkMpUpload
} from "../actions/Auth";

class VerifyEmail extends React.Component {
  constructor() {
    super();
    this.state = {
      file: null
    };
  }

  componentDidMount() {
    // let x = document.getElementsByClassName("MuiDropzoneArea-root");
    // x[0].style.minHeight = "20px";
    let token = getCookie("access_token");
    let tokenUserData = JSON.parse(base64url.decode(token.split(".")[1]));
    // check if token.profile include MPA only dispatch action of checkMpUpload
    if (
      `${tokenUserData.profile}`.includes("MPA") &&
      !`${tokenUserData.profile}`.includes("MP")
    ) {
      this.props.checkMpUpload();
    }

    // if ok change token
    // else model to ask upload new image redirect to the MpUpload component
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
    if (this.props.mpUploadFlag == true) {
      this.props.showAuthLoader();

      setTimeout(() => {
        this.props.mpUploadClear();
        Router.replace("/home/content");
      }, 300);
    }
  }

  render() {
    const { file } = this.state;

    const handleChange = event => {
      this.setState({ [`${event.target.name}`]: `${event.target.value}` });
    };

    const { showMessage, loader, alertMessage } = this.props;
    return (
      <>
        {this.props.checkMpFlag && (
          <div>
            <Button
              variant="contained"
              onClick={() => {
                this.props.showAuthLoader();
                this.props.userSignOut();
              }}
              color="primary"
            >
              <IntlMessages id="appModule.signOut" />
            </Button>

            <div
              style={{ minHeight: "705px" }}
              className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3"
            >
              <div className="app-login-main-content">
                <div className="app-logo-content d-flex align-items-center justify-content-center">
                  <Link href="/">
                    <a>
                      {" "}
                      <img
                        src="../static/images/gila.png"
                        alt="App"
                        title="App"
                      />{" "}
                    </a>
                  </Link>
                </div>

                <div className="app-login-content">
                  <div className="app-login-header">
                    <h1>
                      {" "}
                      <IntlMessages id="appModule.uploadMP" />{" "}
                    </h1>
                  </div>

                  <div className="app-login-form">
                    <form>
                      <DropzoneArea
                        acceptedFiles={["image/*"]}
                        dropzoneText={"Drop Photo"}
                        filesLimit={1}
                        maxFileSize={3000000}
                        showPreviews={true}
                        showPreviewsInDropzone={false}
                        getFileRemovedMessage={removedFile => {
                          return `File ${removedFile} was removed`;
                        }}
                        //getDropRejectMessage={}
                        getFileAddedMessage={addedFile => {
                          return `File ${addedFile} was added`;
                        }}
                        onChange={files => {
                          if (files[0]) {
                            this.setState({ file: files[0] });
                          }
                        }}
                      />
                      <div className="mb-3 d-flex align-items-center justify-content-between">
                        <Grid
                          container
                          style={{ paddingTop: "25px" }}
                          spacing={12}
                        >
                         {file&&<UploadImage fileInput={file}/>}
                          {/* <Button
                            variant="contained"
                            onClick={() => {
                              this.props.showAuthLoader();
                              this.props.mpUpload({ file });
                            }}
                            color="primary"
                          >
                            <IntlMessages id="appModule.submit" />
                          </Button>{" "} */}
                        </Grid>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {loader && (
                <div className="loader-view">
                  <CircularProgress />
                </div>
              )}
              {showMessage && NotificationManager.error(alertMessage)}
              <NotificationContainer />
            </div>
          </div>
        )}
        {!this.props.checkMpFlag && <ModalUpload></ModalUpload>}
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const {
    loader,
    alertMessage,
    showMessage,
    authUser,
    mpUpload,
    mpUploadFlag,
    checkMpFlag
  } = auth;
  return {
    loader,
    alertMessage,
    showMessage,
    authUser,
    mpUpload,
    mpUploadFlag,
    checkMpFlag
  };
};

export default connect(mapStateToProps, {
  mpUpload,
  mpUploadClear,
  hideMessage,
  showAuthLoader,
  userSignOut,
  checkMpUpload
})(VerifyEmail);
