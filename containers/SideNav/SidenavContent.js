import React, { Component } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { userSignOut } from "../../actions/Auth";
import { resetStates } from "../../actions/Home";
import Button from "@material-ui/core/Button";

import IntlMessages from "../../util/IntlMessages";
import CustomScrollbars from "../../util/CustomScrollbars";

class SidenavContent extends Component {
  componentDidMount() {
    const { router } = this.props;
    const that = this;
    const pathname = router.pathname; // get current path

    const menuLi = document.getElementsByClassName("menu");
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function(event) {
        const parentLiEle = that.closest(this, "li");
        if (menuLi[i].classList.contains("menu") && parentLiEle !== null) {
          event.stopPropagation();

          if (menuLi[i].classList.contains("open")) {
            menuLi[i].classList.remove("open", "active");
          } else {
            menuLi[i].classList.add("open", "active");
          }
        } else {
          for (let j = 0; j < menuLi.length; j++) {
            const parentLi = that.closest(this, "li");
            if (
              menuLi[j] !== this &&
              (parentLi === null || !parentLi.classList.contains("open"))
            ) {
              menuLi[j].classList.remove("open");
            } else {
              if (menuLi[j].classList.contains("open")) {
                menuLi[j].classList.remove("open");
              } else {
                menuLi[j].classList.add("open");
              }
            }
          }
        }
      };
    }

    const activeLi = document.querySelector('a[href="' + pathname + '"]'); // select current a element
    try {
      const activeNav = this.closest(activeLi, "ul"); // select closest ul
      if (activeNav.classList.contains("sub-menu")) {
        this.closest(activeNav, "li").classList.add("open");
      } else {
        this.closest(activeLi, "li").classList.add("open");
      }
    } catch (error) {}
  }

  componentWillReceiveProps(nextProps) {
    const pathname = nextProps.router.pathname; // get current path

    const activeLi = document.querySelector('a[href="' + pathname + '"]'); // select current a element
    try {
      const activeNav = this.closest(activeLi, "ul"); // select closest ul
      if (activeNav.classList.contains("sub-menu")) {
        this.closest(activeNav, "li").classList.add("open");
      } else {
        this.closest(activeLi, "li").classList.add("open");
      }
    } catch (error) {}
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      [
        "matches",
        "webkitMatchesSelector",
        "mozMatchesSelector",
        "msMatchesSelector",
        "oMatchesSelector"
      ].some(function(fn) {
        if (typeof document.body[fn] === "function") {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (e) {}

    return null;
  }

  render() {
    return (
      <CustomScrollbars className=" scrollbar">
        <ul className="nav-menu">
          <li className="menu no-arrow">
            <Link href="/home/profile?flag=readMe">
              <a className="prepend-icon">
                {/* <i className="zmdi zmdi-email zmdi-hc-fw" /> */}
                <span className="nav-text">
                  <IntlMessages id="sidebar.profile" />
                </span>
              </a>
            </Link>
          </li>

          <li className="menu no-arrow">
            <Link href="/home/views">
              <a className="prepend-icon">
                {/* <i className="zmdi zmdi-account-box zmdi-hc-fw" /> */}
                <span className="nav-text">
                  <IntlMessages id="sidebar.views" />
                </span>
              </a>
            </Link>
          </li>

          <li className="menu no-arrow">
            <Link href="/app/to-do">
              <a className="prepend-icon">
                {/* <i className="zmdi zmdi-check-square zmdi-hc-fw" /> */}
                <span className="nav-text">
                  <IntlMessages id="sidebar.notification" />
                </span>
              </a>
            </Link>
          </li>

          {/* <li className="menu no-arrow">
            <Link href="/app/contact">
              <a className="prepend-icon">
                <i className="zmdi zmdi-account-box zmdi-hc-fw" />
                <span className="nav-text">
                  <IntlMessages id="sidebar.match" />
                </span>
              </a>
            </Link>
          </li> */}

          <li className="menu no-arrow">
            <Link href="/home/blockedUsers">
              <a className="prepend-icon">
                {/* <i className="zmdi zmdi-account-box zmdi-hc-fw" /> */}
                <span className="nav-text">
                  <IntlMessages id="sidebar.blockedUsers" />
                </span>
              </a>
            </Link>
          </li>

          <li className="menu no-arrow">
            <Link href="/app/chat">
              <a className="prepend-icon">
                {/* <i className="zmdi zmdi-comment zmdi-hc-fw" /> */}
                <span className="nav-text">
                  <IntlMessages id="sidebar.setting" />
                </span>
              </a>
            </Link>
          </li>
          <li
            className="menu no-arrow"
            onClick={() => {
              this.props.resetStates();
              this.props.userSignOut();
            }}
          >
            <a className="prepend-icon">
              {/* <i className="zmdi zmdi-account-box zmdi-hc-fw" /> */}
              <span className="nav-text">
                <IntlMessages id="sidebar.logout" />
              </span>
            </a>
          </li>
          <li className="menu no-arrow no-border">
            <p className="no-margin">
              <IntlMessages id="sidebar.privacy" />
            </p>
            <p className="no-margin">Love Gila &copy; 2021</p>
          </li>
        </ul>
      </CustomScrollbars>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};
export default withRouter(
  connect(mapStateToProps, {
    userSignOut,
    resetStates
  })(SidenavContent)
);
