import React, { Component } from "react";

import ContainerHeader from "../../../components/ContainerHeader";
import IntlMessages from "../../../util/IntlMessages";
import FullScreen from "./FullScreen";
import CardBox from "../../../components/CardBox";
import Accept from "./Accept";
import BrowserLimitations from "./BrowserLimitations";
import Dialog from "./Dialog";

class DragNDrop extends Component {
  render() {
    return (
      <div>
        <ContainerHeader
          title={<IntlMessages id="sidebar.extensions.dropzone" />}
          match={this.props.match}
        />
        <div className="row">
          <CardBox
            styleName="col-sm-6"
            cardStyle=""
            childrenStyle="text-center"
          >
            <Accept />
          </CardBox>

          <CardBox
            styleName="col-sm-6"
            cardStyle=""
            childrenStyle="text-center"
          >
            <BrowserLimitations />
          </CardBox>
          <CardBox
            styleName="col-sm-6"
            cardStyle=""
            childrenStyle="text-center"
          >
            <Dialog />
          </CardBox>
          <CardBox
            styleName="col-sm-6"
            cardStyle=""
            childrenStyle="text-center"
          >
            <FullScreen />
          </CardBox>
        </div>
      </div>
    );
  }
}

export default DragNDrop;
