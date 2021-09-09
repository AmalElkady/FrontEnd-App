import React from "react";
import Link from "next/link"
import {withRouter} from "next/router"
import Menu from "../../components/TopNav/Menu";

class TopNav extends React.Component {
  render() {
    return (
      <div className={`app-top-nav d-none d-md-block ${this.props.styleName}`}>
        <div className="d-flex app-toolbar align-items-center">
          <Menu />
        </div>
      </div>
    );
  }
}

export default withRouter(TopNav);

TopNav.defaultProps = {
  styleName: ""
};
