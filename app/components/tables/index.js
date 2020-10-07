import React from "react";
import BasicTable from "./basic";
import EnhancedTable from "./enhanced";
import ContainerHeader from "../../../components/ContainerHeader";
import CardBox from "../../../components/CardBox";
import IntlMessages from "../../../util/IntlMessages";

const Tables = ({ match }) => {
  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader
        title={<IntlMessages id="sidebar.components.tables" />}
        match={match}
      />

      <div className="row mb-md-3">
        <CardBox
          styleName="col-12"
          cardStyle="p-0"
          heading={<IntlMessages id="sidebar.tables.basicTable" />}
          headerOutside
        >
          <BasicTable />
        </CardBox>
      </div>

      <div className="row">
        <CardBox
          styleName="col-12"
          cardStyle="p-0"
          heading={<IntlMessages id="sidebar.tables.dataTable" />}
          headerOutside
        >
          <EnhancedTable />
        </CardBox>
      </div>
    </div>
  );
};

export default Tables;
