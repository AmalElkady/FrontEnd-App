import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Router from "next/router";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { setCookie, removeCookie, getCookie } from "../../util/session";
import { tokenManagerOperations } from "../../okta/okta";
import {
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
  INSIDE_THE_HEADER
} from "../../constants/ActionTypes";
import SearchBox from "../../components/SearchBox";
import MailNotification from "../MailNotification/index";
import AppNotification from "../AppNotification/index";
import CardHeader from "../../components/dashboard/Common/CardHeader/index";
import { switchLanguage, toggleCollapsedNav } from "../../actions/Setting";
import {
  selectedHeaderIcon,
  notifiActionDone,
  notifiMsgActionDone
} from "../../actions/Home";
import { userSignOut, userSignOutSuccess } from "../../actions/Auth";
import { readMyPhotos } from "../../actions/Profile";
import { getMessagesTotalUnRCount } from "../../actions/Messages";
import {
  getNotificationViewPPLove,
  errorJwt8Success
} from "../../actions/Interaction";
import IntlMessages from "../../util/IntlMessages";
import LanguageSwitcher from "../../components/LanguageSwitcher/index";
import Menu from "../../components/TopNav/Menu";
import UserInfoPopup from "../../components/UserInfo/UserInfoPopup";

class Header extends React.Component {
  onLoveNotificationSelect = () => {
    this.setState({
      loveNotification: !this.state.loveNotification
    });
    this.props.selectedHeaderIcon("love");
  };
  onPrivatePhotosNotificationSelect = () => {
    this.setState({
      privatePhotoNotification: !this.state.privatePhotoNotification
    });
    this.props.selectedHeaderIcon("private");
  };
  onAppNotificationSelect = () => {
    this.setState({
      appNotification: !this.state.appNotification
    });
    this.props.selectedHeaderIcon("views");
  };
  onMailNotificationSelect = () => {
    this.setState({
      mailNotification: !this.state.mailNotification
    });
    this.props.selectedHeaderIcon("message");
  };
  onLangSwitcherSelect = event => {
    this.setState({
      langSwitcher: !this.state.langSwitcher,
      anchorEl: event.currentTarget
    });
  };
  // onSearchBoxSelect = () => {
  //   this.setState({
  //     searchBox: !this.state.searchBox
  //   });
  // };
  // onAppsSelect = () => {
  //   this.setState({
  //     apps: !this.state.apps
  //   });
  // };
  // onUserInfoSelect = () => {
  //   this.setState({
  //     userInfo: !this.state.userInfo
  //   });
  // };
  handleRequestClose = () => {
    this.setState({
      langSwitcher: false,
      userInfo: false,
      mailNotification: false,
      appNotification: false,
      loveNotification: false,
      privatePhotoNotification: false,
      searchBox: false,
      apps: false
    });
  };
  onToggleCollapsedNav = e => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };
  // Apps = () => {
  //   return (
  //     <ul className="jr-list jr-list-half">
  //       <li className="jr-list-item">
  //         <Link href="/app/calendar/basic">
  //           <a className="jr-list-link">
  //             <i className="zmdi zmdi-calendar zmdi-hc-fw" />
  //             <span className="jr-list-text">
  //               <IntlMessages id="sidebar.calendar.basic" />
  //             </span>
  //           </a>
  //         </Link>
  //       </li>

  //       <li className="jr-list-item">
  //         <Link href="/app/to-do">
  //           <a className="jr-list-link">
  //             <i className="zmdi zmdi-check-square zmdi-hc-fw" />
  //             <span className="jr-list-text">
  //               <IntlMessages id="sidebar.appModule.toDo" />
  //             </span>
  //           </a>
  //         </Link>
  //       </li>

  //       <li className="jr-list-item">
  //         <Link href="/app/mail">
  //           <a className="jr-list-link">
  //             <i className="zmdi zmdi-email zmdi-hc-fw" />
  //             <span className="jr-list-text">
  //               <IntlMessages id="sidebar.appModule.mail" />
  //             </span>
  //           </a>
  //         </Link>
  //       </li>

  //       <li className="jr-list-item">
  //         <Link href="/app/chat">
  //           <a className="jr-list-link">
  //             <i className="zmdi zmdi-comment zmdi-hc-fw" />
  //             <span className="jr-list-text">
  //               <IntlMessages id="sidebar.appModule.chat" />
  //             </span>
  //           </a>
  //         </Link>
  //       </li>

  //       <li className="jr-list-item">
  //         <Link href="/app/contact">
  //           <a className="jr-list-link">
  //             <i className="zmdi zmdi-account-box zmdi-hc-fw" />
  //             <span className="jr-list-text">
  //               <IntlMessages id="sidebar.appModule.contact" />
  //             </span>
  //           </a>
  //         </Link>
  //       </li>

  //       <li className="jr-list-item">
  //         <Link href="/">
  //           <a className="jr-list-link">
  //             <i className="zmdi zmdi-plus-circle-o zmdi-hc-fw" />
  //             <span className="jr-list-text">Add New</span>
  //           </a>
  //         </Link>
  //       </li>
  //     </ul>
  //   );
  // };

  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      searchBox: false,
      searchText: "",
      mailNotification: false,
      userInfo: false,
      langSwitcher: false,
      appNotification: false,
      loveNotification: false,
      privatePhotoNotification: false
    };
  }

  componentDidMount() {
    if (this.props.notificationLoveCount == null) {
      // this.props.getMessagesTotalUnRCount();
      // this.props.getNotificationViewPPLove(
      //   "C",
      //   this.props.scoreHNotificationView,
      //   this.props.scoreHNotificationPP,
      //   this.props.scoreHNotificationLove,
      //   ""
      // );
      // console.log("actionsStatus from header ", this.props.actionsStatus);
      // const subActions = this.props.actionsStatus.slice(1, 6);
      // if (
      //   this.props.actionsStatus[0] == 1 &&
      //   subActions.every(action => {
      //     return action == null;
      //   })
      // ) {
      //   console.log(
      //     "actionsStatus from header true ",
      //     this.props.actionsStatus
      //   );
      //   this.props.getNotificationViewPPLove(
      //     "C",
      //     this.props.scoreHNotificationView,
      //     this.props.scoreHNotificationPP,
      //     this.props.scoreHNotificationLove,
      //     ""
      //   );
      // }
      console.log("actionsStatus from header ", this.props.actionsStatus);
      // const subActions = this.props.actionsStatus.slice(1, 5);
       if (
         this.props.notificationLoveCount == null &&
        // this.props.actionsStatus[0] == 1 &&
         this.props.actionsStatus.every(action => {
           return action == null;
         })
       ) {
         // if (
         //   actionsStatus.every(action => {
         //     return action == null;
         //   })
         console.log("actionsStatus from header true ", this.props.actionsStatus);
         this.props.getNotificationViewPPLove(
           "C",
           this.props.scoreHNotificationView,
           this.props.scoreHNotificationPP,
           this.props.scoreHNotificationLove,
           ""
         );
       }
    }
  }
  componentDidUpdate() {
    // console.log(
    //   "errorJwt8Flag from Header component ",
    //   this.props.errorJwt8Flag,
    //   this.props.logoutFlag
    // );

    ///
  //   console.log("actionsStatus from header ", this.props.actionsStatus);
  //  // const subActions = this.props.actionsStatus.slice(1, 5);
  //   if (
  //     this.props.notificationLoveCount == null &&
  //    // this.props.actionsStatus[0] == 1 &&
  //     this.props.every(action => {
  //       return action == null;
  //     })
  //   ) {
  //     // if (
  //     //   actionsStatus.every(action => {
  //     //     return action == null;
  //     //   })
  //     console.log("actionsStatus from header true ", this.props.actionsStatus);
  //     this.props.getNotificationViewPPLove(
  //       "C",
  //       this.props.scoreHNotificationView,
  //       this.props.scoreHNotificationPP,
  //       this.props.scoreHNotificationLove,
  //       ""
  //     );
  //   }
    if (
      this.props.notificationLoveCount != null &&
      // this.props.actionsStatus[0] == 1 &&
      // subActions.every(action => {
      //   return action == null;
      // })
        this.props.actionsStatus.every(action => {
          return action == null;
        })
    ) {
      console.log(
        "notificationLoveCount from header !=null ",
        this.props.notificationLoveCount
      );
      this.props.notifiActionDone();
    }

    ////
    if (
      this.props.totalMessagesUnRCount == null 
      // this.props.actionsStatus[0] == 1 &&
      // this.props.actionsStatus[1] == 2

    ) {
      // const subArray = this.props.actionsStatus.slice(2, 6);
      // if (
      //   subArray.every(action => {
      //     return action == null
      //   })
      // ) 
      
     const subActions = this.props.actionsStatus.slice(1, 5);
      if (
        this.props.actionsStatus[0] == 1 &&
        subActions.every(action => {
          return action == null;
        })
      )

      {
        console.log(
          "subArray messages from header true*** ",
          this.props.actionsStatus
        );
        this.props.getMessagesTotalUnRCount();
      }
    }

    ////
    if (
      this.props.totalMessagesUnRCount != null 
      // this.props.actionsStatus[0] == 1 &&
      // this.props.actionsStatus[1] == 2
    ) {
      // const subArray = this.props.actionsStatus.slice(2, 5);
      // if (
      //   subArray.every(action => {
      //     return action == null;
      //   })
      // ) 
      const subActions = this.props.actionsStatus.slice(1, 5);
      if (
        this.props.actionsStatus[0] == 1 &&
        subActions.every(action => {
          return action == null;
        })
      )
      {
        console.log("totalMessagesUnRCount !=null ** ");
        this.props.notifiMsgActionDone();
      }
    }

    // && !this.props.logoutFlag
    // if (this.props.errorJwt8Flag) {
    //   console.log(
    //     "errorJwt8Flag from component true",
    //     this.props.errorJwt8Flag
    //   );
    //   // removeCookie("access_token");
    //   // this.props.userSignOut();
    //   //tokenManagerOperations.clearAllTokens("access_token");
    //   this.props.userSignOutSuccess();
    //   Router.replace("/");
    //   this.props.errorJwt8Success(false);
    // }
  }

  // updateSearchText(evt) {
  //   this.setState({
  //     searchText: evt.target.value
  //   });
  // }

  render() {
    const {
      drawerType,
      locale,
      navigationStyle,
      horizontalNavPosition,
      headerSelectedIcon
    } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "d-block d-xl-none"
      : drawerType.includes(COLLAPSED_DRAWER)
      ? "d-block"
      : "d-none";

    return (
      <AppBar
        className={`app-main-header linear-g ${
          navigationStyle === HORIZONTAL_NAVIGATION &&
          horizontalNavPosition === BELOW_THE_HEADER
            ? "app-main-header-top"
            : ""
        }`}
      >
        <div class="header-curve-main"></div>
        <Toolbar className="app-toolbar" disableGutters={false}>
          {/* {navigationStyle === HORIZONTAL_NAVIGATION ? (
            <div
              className="d-block d-md-none pointer mr-3"
              onClick={this.onToggleCollapsedNav}
            >
              <span className="jr-menu-icon">
                <span className="menu-icon" />
              </span>
            </div>
          ) : (
            <IconButton
              className={`jr-menu-icon mr-3 ${drawerStyle}`}
              aria-label="Menu"
              onClick={this.onToggleCollapsedNav}
            >
              <span className="menu-icon" />
            </IconButton>
          )} */}
          <IconButton
            className={`jr-menu-icon mr-3`}
            aria-label="Menu"
            onClick={() => {
              this.onToggleCollapsedNav();
              // this.props.readMyPhotos(0);
            }}
          >
            <img
              src="../../static/images/icons/standard/Menu_Icon_Sandard.svg"
              alt="Menu"
            />
          </IconButton>

          <Link href="/">
            <a className="app-logo mr-2 d-none d-sm-block">
              <img
                src="../../static/images/Gila_name.png"
                alt="Gila"
                title="Gila"
              />
            </a>
          </Link>

          {/* <SearchBox
            styleName="d-none d-lg-block"
            placeholder=""
            onChange={this.updateSearchText.bind(this)}
            value={this.state.searchText}
          /> */}
          {/* {navigationStyle === HORIZONTAL_NAVIGATION &&
            horizontalNavPosition === INSIDE_THE_HEADER && <Menu />} */}

          <ul className="header-notifications list-inline ml-auto ">
            {/* <li className="list-inline-item">
              <Dropdown
                className="quick-menu app-notification"
                isOpen={this.state.apps}
                toggle={this.onAppsSelect.bind(this)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <span className="app-notification-menu">
                    <i className="zmdi zmdi-apps zmdi-hc-fw zmdi-hc-lg" />
                    <span>Apps</span>
                  </span>
                </DropdownToggle>

                <DropdownMenu>{this.Apps()}</DropdownMenu>
              </Dropdown>
            </li> */}
            {/* <li className="d-inline-block d-lg-none list-inline-item">
              <Dropdown
                className="quick-menu nav-searchbox"
                isOpen={this.state.searchBox}
                toggle={this.onSearchBoxSelect.bind(this)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <IconButton className="icon-btn">
                    <i className="zmdi zmdi-search zmdi-hc-fw" />
                  </IconButton>
                </DropdownToggle>

                <DropdownMenu right className="p-0">
                  <SearchBox
                    styleName="search-dropdown"
                    placeholder=""
                    onChange={this.updateSearchText.bind(this)}
                    value={this.state.searchText}
                  />
                </DropdownMenu>
              </Dropdown>
            </li> */}
            <div class="header-curve"></div>

            {/* love not */}
            <li className="list-inline-item app-tour">
              <Dropdown
                className="quick-menu"
                isOpen={this.state.loveNotification}
                toggle={this.onLoveNotificationSelect.bind(this)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <Link
                    href={
                      this.props.notificationLoveCount == 0
                        ? "/home/love"
                        : "/home/notifications-love"
                    }
                  >
                    <IconButton className="icon-btn">
                      <img
                        src={
                          Router.pathname == "/home/love" ||
                          (Router.pathname == "/home/notifications-love" &&
                            headerSelectedIcon == "love")
                            ? "../../static/images/icons/Highlighted/Love_Icon_Highlighted.svg"
                            : "../../static/images/icons/standard/Love_Icon_Standard.svg"
                        }
                        alt="Love Icon"
                      />
                    </IconButton>
                  </Link>
                  {this.props.notificationLoveCount != 0 && (
                    <div className="love-count">
                      {this.props.notificationLoveCount}
                    </div>
                  )}
                </DropdownToggle>

                {/* <DropdownMenu right>
                  <CardHeader
                    styleName="align-items-center"
                    heading={<IntlMessages id="appNotification.title" />}
                  />
                  <AppNotification />
                </DropdownMenu> */}
              </Dropdown>
            </li>
            {/* Notifications Views */}
            <li className="list-inline-item mail-tour">
              <Dropdown
                className="quick-menu"
                isOpen={this.state.appNotification}
                toggle={this.onAppNotificationSelect.bind(this)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <Link
                    href={
                      this.props.notificationViewCount == 0
                        ? "/home/views"
                        : "/home/notifications-love"
                    }
                  >
                    <IconButton className="icon-btn">
                      {/* <i className="zmdi zmdi-comment-alt-text zmdi-hc-fw" /> */}
                      <img
                        src={
                          Router.pathname == "/home/views" ||
                          (Router.pathname == "/home/notifications-love" &&
                            headerSelectedIcon == "views")
                            ? //   ||
                              // headerSelectedIcon == "views")&&(Router.pathname != "/home/views" )
                              "../../static/images/icons/Highlighted/Profile_view_Highlighted.svg"
                            : "../../static/images/icons/standard/Profile_view.svg"
                        }
                        alt="Notifications"
                      />
                    </IconButton>
                  </Link>
                  {this.props.notificationViewCount != 0 && (
                    <div className="love-count">
                      {this.props.notificationViewCount}
                    </div>
                  )}
                </DropdownToggle>

                {/* <DropdownMenu right>
                  <CardHeader
                    styleName="align-items-center"
                    heading={<IntlMessages id="appNotification.title" />}
                  />
                  <AppNotification />
                </DropdownMenu> */}
              </Dropdown>
            </li>

            {/* Messages */}
            <li className="list-inline-item mail-tour">
              <Dropdown
                className="quick-menu"
                isOpen={this.state.mailNotification}
                toggle={this.onMailNotificationSelect.bind(this)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <Link href={"/home/messages"}>
                    <IconButton className="icon-btn">
                      {/* <i className="zmdi zmdi-comment-alt-text zmdi-hc-fw" /> */}
                      <img
                        src={
                          Router.pathname == "/home/messages" ||
                          headerSelectedIcon == "message"
                            ? "../../static/images/icons/Highlighted/Messages_Icon_Highlighted.svg"
                            : "../../static/images/icons/standard/Messages_Icon_Standard.svg"
                        }
                        alt="Notifications"
                      />
                    </IconButton>
                  </Link>
                  {this.props.totalMessagesUnRCount != 0 && (
                    <div className="love-count">
                      {this.props.totalMessagesUnRCount}
                    </div>
                  )}
                </DropdownToggle>
                {/* <DropdownMenu right>
                  <CardHeader
                    styleName="align-items-center"
                    heading={<IntlMessages id="mailNotification.title" />}
                  />
                  <MailNotification />
                </DropdownMenu> */}
              </Dropdown>
            </li>

            {/* private photos notif */}
            <li className="list-inline-item app-tour">
              <Dropdown
                className="quick-menu"
                isOpen={this.state.privatePhotoNotification}
                toggle={this.onPrivatePhotosNotificationSelect.bind(this)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <Link
                    href={
                      this.props.notificationPPCount == 0
                        ? "/home/private-photos"
                        : "/home/notifications-love"
                    }
                  >
                    <IconButton className="icon-btn">
                      <img
                        src={
                          Router.pathname == "/home/private-photos" ||
                          (Router.pathname == "/home/notifications-love" &&
                            headerSelectedIcon == "private")
                            ? "../../static/images/icons/Highlighted/PP-Highlighted.svg"
                            : "../../static/images/icons/standard/PP.svg"
                        }
                        alt="private Photo Icon"
                      />
                    </IconButton>
                  </Link>
                  {this.props.notificationPPCount != 0 && (
                    <div className="love-count">
                      {this.props.notificationPPCount}
                    </div>
                  )}
                </DropdownToggle>

                {/* <DropdownMenu right>
                  <CardHeader
                    styleName="align-items-center"
                    heading={<IntlMessages id="appNotification.title" />}
                  />
                  <AppNotification />
                </DropdownMenu> */}
              </Dropdown>
            </li>

            {navigationStyle === HORIZONTAL_NAVIGATION && (
              <li className="list-inline-item user-nav">
                <Dropdown
                  className="quick-menu"
                  isOpen={this.state.userInfo}
                  toggle={this.onUserInfoSelect.bind(this)}
                >
                  <DropdownToggle
                    className="d-inline-block"
                    tag="span"
                    data-toggle="dropdown"
                  >
                    <IconButton className="icon-btn size-30">
                      <Avatar
                        alt="..."
                        src={"https://via.placeholder.com/150x150"}
                        className="size-30"
                      />
                    </IconButton>
                  </DropdownToggle>

                  <DropdownMenu right>
                    <UserInfoPopup />
                  </DropdownMenu>
                </Dropdown>
              </li>
            )}
          </ul>

          {/* Language */}
          {/* <li className="list-inline-item"> */}
          <Dropdown
            className="quick-menu"
            isOpen={this.state.langSwitcher}
            toggle={this.onLangSwitcherSelect.bind(this)}
          >
            <DropdownToggle
              className="d-inline-block"
              tag="span"
              data-toggle="dropdown"
            >
              <IconButton className="">
                <i className={`flag flag-24 flag-${locale.icon}`} />
              </IconButton>
            </DropdownToggle>

            <DropdownMenu right className="w-50">
              <LanguageSwitcher
                switchLanguage={this.props.switchLanguage}
                handleRequestClose={this.handleRequestClose}
              />
            </DropdownMenu>
          </Dropdown>
          {/* </li> */}
          {/* End Lang */}

          <div className="ellipse-shape"></div>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ auth, settings, home, interaction, messages }) => {
  const {
    drawerType,
    locale,
    navigationStyle,
    horizontalNavPosition
  } = settings;
  const {
    notificationViewCount,
    notificationPPCount,
    notificationLoveCount,
    scoreHNotificationView,
    scoreHNotificationPP,
    scoreHNotificationLove,
    errorJwt8Flag
  } = interaction;
  const { logoutFlag } = auth;
  const { totalMessagesUnRCount } = messages;
  const { headerSelectedIcon, actionsStatus } = home;

  return {
    drawerType,
    locale,
    navigationStyle,
    horizontalNavPosition,
    headerSelectedIcon,
    notificationViewCount,
    notificationLoveCount,
    notificationPPCount,
    scoreHNotificationView,
    scoreHNotificationPP,
    scoreHNotificationLove,
    totalMessagesUnRCount,
    errorJwt8Flag,
    actionsStatus,
    logoutFlag
  };
};

export default withRouter(
  connect(mapStateToProps, {
    toggleCollapsedNav,
    switchLanguage,
    selectedHeaderIcon,
    readMyPhotos,
    getNotificationViewPPLove,
    getMessagesTotalUnRCount,
    errorJwt8Success,
    userSignOutSuccess,
    userSignOut,
    notifiActionDone,
    notifiMsgActionDone
  })(Header)
);
