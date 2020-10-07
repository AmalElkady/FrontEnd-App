import React from "react";

import ContainerHeader from "../../../components/ContainerHeader";
import CardBox from "../../../components/CardBox";

import TextFields from "../../components/textFields/textField";
import ComposedTextField from "../../components/textFields/components";
import TextFieldMargins from "../../components/textFields/layout";
import Inputs from "../../components/textFields/inputs";

import Checkboxes from "../../components/selection/checkboxes";
import RadioButtonsGroup from "../../components/selection/radioButtons/RadioButtonsGroup";
import RadioButtons from "../../components/selection/radioButtons";
import Switches from "../../components/selection/switches";
import SwitchLabels from "../../components/selection/switches/SwitchLabels";

import SimpleSelect from "../../components/selects/simple";
import NativeSelect from "../../components/selects/native";
import MultipleSelect from "../../components/selects/multi";
import DialogSelect from "../../components/selects/dialog";

import CircularIndeterminate from "../../components/progressbar/circular/indeterminate";
import CircularFab from "../../components/progressbar/circular/interactive";
import CircularDeterminate from "../../components/progressbar/circular/determinate";
import LinearIndeterminate from "../../components/progressbar/linear/indeterminate";
import LinearDeterminate from "../../components/progressbar/linear/determinate";
import LinearBuffer from "../../components/progressbar/linear/buffer";
import LinearQuery from "../../components/progressbar/linear/query";

import DatePickers from "../../components/pickers/date";
import DateAndTimePickers from "../../components/pickers/dateTime";
import TimePickers from "../../components/pickers/time";

import SimpleDialogDemo from "../../components/dialogs/simple/SimpleDialogDemo";
import AlertDialog from "../../components/dialogs/alerts";
import AlertDialogSlide from "../../components/dialogs/slideAlerts/AlertDialogSlide";
import ConfirmationDialogDemo from "../../components/dialogs/confirmation";
import FullScreenDialog from "../../components/dialogs/fullScreen";
import FormDialog from "../../components/dialogs/formAlerts";

import Chip from "../../components/chips/simpleChip";
import ChipsArray from "../../components/chips/chipArray";
import IntlMessages from "../../../util/IntlMessages";

const Form = ({ match }) => {
  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader
        title={<IntlMessages id="sidebar.forms.components" />}
        match={match}
      />

      <div className="row">
        <CardBox
          styleName="col-lg-12"
          heading={<IntlMessages id="component.textFields.textfield" />}
        >

          <TextFields />
        </CardBox>
        <CardBox
          styleName="col-lg-12"
          heading={<IntlMessages id="sidebar.forms.components" />}
        >
          <ComposedTextField />
        </CardBox>
        <CardBox
          styleName="col-lg-12"
          heading={<IntlMessages id="component.textFields.layout" />}
        >
          <TextFieldMargins />
        </CardBox>
        <CardBox
          styleName="col-lg-12"
          heading={<IntlMessages id="component.textFields.inputs" />}
        >
          <Inputs />
        </CardBox>
      </div>

      <div className="row">
        <CardBox
          styleName="col-lg-12"
          heading={<IntlMessages id="component.selectionControl.checkboxes" />}
        >
          <Checkboxes />
        </CardBox>
        <CardBox
          heading={<IntlMessages id="component.selectionControl.switches" />}
        >
          <Switches />
        </CardBox>
        <CardBox
          heading={<IntlMessages id="component.selectionControl.switches" />}
        >
          <SwitchLabels />
        </CardBox>
        <CardBox
          styleName="col-lg-12"
          heading={<IntlMessages id="component.selectionControl.basicRadio" />}
        >
          <RadioButtons />
        </CardBox>
        <CardBox
          styleName="col-lg-12"
          heading={
            <IntlMessages id="component.selectionControl.radioBtnGroup" />
          }
        >
          <RadioButtonsGroup />
        </CardBox>
      </div>

      <div className="row">
        <CardBox
          styleName="col-lg-12"
          heading={<IntlMessages id="component.selects.simple" />}
        >
          <SimpleSelect />
        </CardBox>
        <CardBox
          styleName="col-lg-12"
          heading={<IntlMessages id="component.selects.native" />}
        >
          <NativeSelect />
        </CardBox>
        <CardBox heading={<IntlMessages id="component.selects.multiple" />}>
          <MultipleSelect />
        </CardBox>
        <CardBox heading={<IntlMessages id="component.selects.dialog" />}>
          <DialogSelect />
        </CardBox>
      </div>

      <div className="row">
        <CardBox
          heading={
            <IntlMessages id="component.progress.indeterminateCircular" />
          }
        >
          <CircularIndeterminate />
        </CardBox>
        <CardBox
          heading={<IntlMessages id="component.progress.determinateCircular" />}
        >
          <CircularDeterminate />
        </CardBox>
        <CardBox
          heading={<IntlMessages id="component.progress.indeterminateLinear" />}
        >
          <LinearIndeterminate />
        </CardBox>
        <CardBox
          heading={<IntlMessages id="component.progress.determinateLinear" />}
        >
          <LinearDeterminate />
        </CardBox>
        <CardBox
          heading={<IntlMessages id="component.progress.bufferLinear" />}
        >
          <LinearBuffer />
        </CardBox>
        <CardBox heading={<IntlMessages id="component.progress.queryLinear" />}>
          <LinearQuery />
        </CardBox>
        <CardBox
          styleName="col-lg-12"
          heading={
            <IntlMessages id="component.progress.interactiveIntegration" />
          }
        >
          <CircularFab />
        </CardBox>
      </div>

      <div className="row">
        <CardBox heading={<IntlMessages id="picker.date.date" />}>
          <DatePickers />
        </CardBox>
        <CardBox heading={<IntlMessages id="picker.date.time" />}>
          <TimePickers />
        </CardBox>
        <CardBox heading={<IntlMessages id="picker.date.dateNTime" />}>
          <DateAndTimePickers />
        </CardBox>
      </div>

      <div className="row">
        <CardBox
          childrenStyle="text-center"
          heading={<IntlMessages id="sidebar.components.alerts" />}
        >
          <AlertDialog />
        </CardBox>
        <CardBox childrenStyle="text-center" heading="Alert Dialogs">
          <AlertDialogSlide />
        </CardBox>
        <CardBox childrenStyle="text-center" heading="Simple Dialogs">
          <SimpleDialogDemo />
        </CardBox>
        <CardBox childrenStyle="text-center" heading="Full-Screen Dialogs">
          <FullScreenDialog />
        </CardBox>
        <CardBox childrenStyle="text-center" heading="Form Dialog">
          <div className="card d-inline-block">
            <FormDialog />
          </div>
        </CardBox>
        <CardBox childrenStyle="text-center" heading="Confirmation Dialogs">
          <div className="card d-inline-block">
            <ConfirmationDialogDemo />
          </div>
        </CardBox>
      </div>

      <div className="row">
        <CardBox
          styleName="col-lg-12"
          heading={<IntlMessages id="sidebar.components.chips" />}
        >
          <Chip />
        </CardBox>
        <CardBox
          styleName="col-lg-12"
          heading={<IntlMessages id="component.chips.array" />}
        >
          <ChipsArray />
        </CardBox>
      </div>
    </div>
  );
};

export default Form;
