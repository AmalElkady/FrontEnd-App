import React from "react";
import BasicTabs from "./basic";
import BasicTabsWrappedLabel from "./wrappedLabels";
import FullWidthTabs from "./fixed";
import CenteredTabs from "./centered";
import ScrollableTabsButtonAuto from "./scrollable/automatic";
import ScrollableTabsButtonForce from "./scrollable/forced";
import ScrollableTabsButtonPrevent from "./scrollable/prevent";
import IconTabs from "./icon";
import IconLabelTabs from "./icon/IconLabelTabs";
import DisabledTabs from "./disabled";
import CardBox from "../../../components/CardBox";
import ContainerHeader from "../../../components/ContainerHeader";
import IntlMessages from "../../../util/IntlMessages";

const Tabs = ({ match }) => {
  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader
        title={<IntlMessages id="sidebar.components.tabs" />}
        match={match}
      />

      <div className="row">
        <CardBox heading={<IntlMessages id="component.tabs.basic" />}>
          <BasicTabs />
        </CardBox>
        <CardBox heading={<IntlMessages id="component.tabs.fixed" />}>
          <FullWidthTabs />
        </CardBox>
      </div>

      <div className="row">
        <CardBox heading={<IntlMessages id="component.tabs.icon" />}>
          <IconTabs />
        </CardBox>
        <CardBox heading={<IntlMessages id="component.tabs.disabled" />}>
          <DisabledTabs />
        </CardBox>
      </div>

      <div className="row">
        <CardBox heading={<IntlMessages id="component.tabs.wrappedLabels" />}>
          <BasicTabsWrappedLabel />
        </CardBox>
        <CardBox heading={<IntlMessages id="component.tabs.iconWithLabel" />}>
          <IconLabelTabs />
        </CardBox>
      </div>

      <div className="row">
        <CardBox
          styleName="col-lg-12"
          heading={<IntlMessages id="component.tabs.fixedCentered" />}
        >
          <CenteredTabs />
        </CardBox>
      </div>

      <div className="row">
        <CardBox
          styleName="col-lg-12"
          heading={<IntlMessages id="component.tabs.automaticScroll" />}
        >
          <ScrollableTabsButtonAuto />
        </CardBox>
      </div>

      <div className="row">
        <CardBox
          styleName="col-lg-12"
          heading={<IntlMessages id="component.tabs.forcedScroll" />}
        >
          <ScrollableTabsButtonForce />
        </CardBox>
      </div>

      <div className="row">
        <CardBox
          styleName="col-lg-12"
          heading={<IntlMessages id="component.tabs.preventScroll" />}
        >
          <ScrollableTabsButtonPrevent />
        </CardBox>
      </div>
    </div>
  );
};

export default Tabs;
