import React from "react";
import TextMobileStepper from "../../../app/components/stepper/text";
import DotsMobileStepper from "../../../app/components/stepper/dot";
import ProgressMobileStepper from "../../../app/components/stepper/progress";
import HorizontalLinearStepper from "../../../app/components/stepper/linear/HorizontalLinearStepper";
import HorizontalLabelPositionBelowStepper from "../../../app/components/stepper/linear/HorizontalLabelPositionBelowStepper";
import HorizontalNonLinearStepper from "../../../app/components/stepper/nonLinear/HorizontalNonLinearStepper";
import HorizontalNonLinearAlternativeLabelStepper from "../../../app/components/stepper/nonLinear/HorizontalNonLinearAlternativeLabelStepper";
import VerticalLinearStepper from "../../../app/components/stepper/vertical";
import CardBox from "../../../components/CardBox";
import ContainerHeader from "../../../components/ContainerHeader";
import IntlMessages from "../../../util/IntlMessages";

const Stepper = ({ match }) => {
  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader
        title={<IntlMessages id="sidebar.components.stepper" />}
        match={match}
      />

      <div className="row mb-md-3">
        <CardBox
          styleName="col-lg-12"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="component.stepper.horizontalLinear" />}
          headerOutside
        >
          <HorizontalLinearStepper />
        </CardBox>
      </div>

      <div className="row mb-md-3">
        <CardBox
          styleName="col-lg-12"
          childrenStyle="d-flex justify-content-center"
          heading={
            <IntlMessages id="component.stepper.horizontalLinearAlternativeLabel" />
          }
          headerOutside
        >
          <HorizontalLabelPositionBelowStepper />
        </CardBox>
      </div>

      <div className="row mb-md-3">
        <CardBox
          styleName="col-lg-12"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="component.stepper.vertical" />}
          headerOutside
        >
          <VerticalLinearStepper />
        </CardBox>
      </div>

      <div className="row mb-md-3">
        <CardBox
          styleName="col-lg-12"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="component.stepper.horizontalNonLinear" />}
          headerOutside
        >
          <HorizontalNonLinearStepper />
        </CardBox>
      </div>

      <div className="row mb-md-3">
        <CardBox
          styleName="col-lg-12"
          childrenStyle="d-flex justify-content-center"
          heading={
            <IntlMessages id="component.stepper.horizontalNonLinearAlternativeLabel" />
          }
          headerOutside
        >
          <HorizontalNonLinearAlternativeLabelStepper />
        </CardBox>
      </div>

      <div className="row mb-md-3">
        <CardBox
          heading={<IntlMessages id="component.stepper.mobileDots" />}
          headerOutside
        >
          <DotsMobileStepper />
        </CardBox>
        <CardBox
          heading={<IntlMessages id="component.stepper.mobileProgress" />}
          headerOutside
        >
          <ProgressMobileStepper />
        </CardBox>
      </div>

      <div className="row">
        <CardBox
          styleName="col-lg-12"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="component.stepper.mobileText" />}
          headerOutside
        >
          <TextMobileStepper />
        </CardBox>
      </div>
    </div>
  );
};

export default Stepper;
