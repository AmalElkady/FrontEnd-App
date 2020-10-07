import React from "react";
import {
  AlphaPicker,
  BlockPicker,
  ChromePicker,
  CirclePicker,
  CompactPicker,
  GithubPicker,
  HuePicker,
  MaterialPicker,
  PhotoshopPicker,
  SketchPicker,
  SwatchesPicker,
  TwitterPicker
} from "react-color";

import CardBox from "../../../components/CardBox";
import Basic from "../../pickers/Color/basic";
import BasicToggle from "../../pickers/Color/basicToggle";
import BasicPositioning from "../../pickers/Color/basicPositioning";
import CustomPicker from "../../pickers/Color/customPicker";
import CustomPointer from "../../pickers/Color/customPointer";
import WithRedux from "../../pickers/Color/withRedux";
import ContainerHeader from "../../../components/ContainerHeader";
import IntlMessages from "../../../util/IntlMessages";

const ColorPicker = ({ match }) => {
  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader
        title={<IntlMessages id="sidebar.components.colorPicker" />}
        match={match}
      />

      <div className="row">
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.alpha" />}
        >
          <AlphaPicker />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.hue" />}
        >
          <HuePicker />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.circle" />}
        >
          <CirclePicker />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.compact" />}
        >
          <CompactPicker />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.block" />}
        >
          <BlockPicker />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.chrome" />}
        >
          <ChromePicker />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.github" />}
        >
          <GithubPicker />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.twitter" />}
        >
          <TwitterPicker />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.withRedux" />}
        >
          <WithRedux />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.sketch" />}
        >
          <SketchPicker />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.material" />}
        >
          <MaterialPicker />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.basic" />}
        >
          <Basic />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.basicToggle" />}
        >
          <BasicToggle />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.custom" />}
        >
          <CustomPicker />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.customPointer" />}
        >
          <CustomPointer />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.photoshop" />}
        >
          <PhotoshopPicker />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.swatches" />}
        >
          <SwatchesPicker />
        </CardBox>
        <CardBox
          styleName="col-md-6"
          childrenStyle="d-flex justify-content-center"
          heading={<IntlMessages id="picker.color.basicPositioning" />}
        >
          <BasicPositioning />
        </CardBox>
      </div>
    </div>
  );
};

export default ColorPicker;
