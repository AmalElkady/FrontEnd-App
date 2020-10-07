import React from "react";

import CardBox from "../../../components/CardBox";
import ContainerHeader from "../../../components/ContainerHeader";

import CircularIndeterminate from "./circular/indeterminate";
import CircularFab from "./circular/interactive";
import CircularDeterminate from "./circular/determinate";
import LinearIndeterminate from "./linear/indeterminate";
import LinearDeterminate from "./linear/determinate";
import LinearBuffer from "./linear/buffer";
import LinearQuery from "./linear/query";
import IntlMessages from "../../../util/IntlMessages";

const Progress = ({ match }) => {
  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader
        title={<IntlMessages id="sidebar.components.progress" />}
        match={match}
      />

      <div className="row">
        <CardBox
          styleName="col-md-6 col-12"
          childrenStyle="d-flex justify-content-center"
          heading={
            <IntlMessages id="component.progress.indeterminateCircular" />
          }
        >
          <CircularIndeterminate />
        </CardBox>

        <CardBox
          styleName="col-md-6 col-12"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="component.progress.determinateCircular" />}
        >
          <CircularDeterminate />
        </CardBox>

        <CardBox
          styleName="col-md-6 col-12"
          chldrenStyle=""
          heading={<IntlMessages id="component.progress.indeterminateLinear" />}
        >
          <LinearIndeterminate />
        </CardBox>

        <CardBox
          styleName="col-md-6 col-12"
          chldrenStyle=""
          heading={<IntlMessages id="component.progress.determinateLinear" />}
        >
          <LinearDeterminate />
        </CardBox>

        <CardBox
          styleName="col-md-6 col-12"
          chldrenStyle=""
          heading={<IntlMessages id="component.progress.bufferLinear" />}
        >
          <LinearBuffer />
        </CardBox>

        <CardBox
          styleName="col-md-6 col-12"
          chldrenStyle=""
          heading={<IntlMessages id="component.progress.queryLinear" />}
        >
          <LinearQuery />
        </CardBox>

        <CardBox
          styleName="col-lg-12 col-12"
          childrenStyle="d-flex justify-content-center"
          heading={
            <IntlMessages id="component.progress.interactiveIntegration" />
          }
        >
          <CircularFab />
        </CardBox>
      </div>
    </div>
  );
};

export default Progress;
