import React from "react";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { IntlProvider } from "react-intl";

import Footer from "../../components/Footer";
import RTL from "../../util/RTL";
import Header from "../../components/Header/index";
import Sidebar from "../../containers/SideNav/index";
import TopNav from "../../components/TopNav";
import indigoTheme from "../themes/indigoTheme";
import cyanTheme from "../themes/cyanTheme";
import darkTheme from "../themes/darkTheme";
import orangeTheme from "../themes/orangeTheme";
import amberTheme from "../themes/amberTheme";
import pinkTheme from "../themes/pinkTheme";
import blueTheme from "../themes/blueTheme";
import purpleTheme from "../themes/purpleTheme";
import greenTheme from "../themes/greenTheme";
import mainTheme from "../themes/mainTheme";
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION
} from "../../constants/ActionTypes";
import AppLocale from "../../lngProvider";
import Customizer from "../../containers/Customizer/index";
import {
  AMBER,
  BLUE,
  CYAN,
  DARK_AMBER,
  DARK_BLUE,
  DARK_CYAN,
  DARK_DEEP_ORANGE,
  DARK_DEEP_PURPLE,
  DARK_GREEN,
  DARK_INDIGO,
  DARK_PINK,
  DEEP_ORANGE,
  DEEP_PURPLE,
  GREEN,
  INDIGO,
  PINK,
  MAIN_THEME
} from "../../constants/ThemeColors";

class App extends React.Component {
  getColorTheme(themeColor, applyTheme) {
    switch (themeColor) {
      case MAIN_THEME: {
        applyTheme = createMuiTheme(mainTheme);
        break;
      }
      case INDIGO: {
        applyTheme = createMuiTheme(indigoTheme);
        break;
      }
      case CYAN: {
        applyTheme = createMuiTheme(cyanTheme);
        break;
      }
      case AMBER: {
        applyTheme = createMuiTheme(amberTheme);
        break;
      }
      case DEEP_ORANGE: {
        applyTheme = createMuiTheme(orangeTheme);
        break;
      }
      case PINK: {
        applyTheme = createMuiTheme(pinkTheme);
        break;
      }
      case BLUE: {
        applyTheme = createMuiTheme(blueTheme);
        break;
      }
      case DEEP_PURPLE: {
        applyTheme = createMuiTheme(purpleTheme);
        break;
      }
      case GREEN: {
        applyTheme = createMuiTheme(greenTheme);
        break;
      }
      case DARK_INDIGO: {
        applyTheme = createMuiTheme(indigoTheme);
        break;
      }
      case DARK_CYAN: {
        applyTheme = createMuiTheme(cyanTheme);
        break;
      }
      case DARK_AMBER: {
        applyTheme = createMuiTheme(amberTheme);
        break;
      }
      case DARK_DEEP_ORANGE: {
        applyTheme = createMuiTheme(orangeTheme);
        break;
      }
      case DARK_PINK: {
        applyTheme = createMuiTheme(pinkTheme);
        break;
      }
      case DARK_BLUE: {
        applyTheme = createMuiTheme(blueTheme);
        break;
      }
      case DARK_DEEP_PURPLE: {
        applyTheme = createMuiTheme(purpleTheme);
        break;
      }
      case DARK_GREEN: {
        applyTheme = createMuiTheme(greenTheme);
        break;
      }
      default:
        createMuiTheme(indigoTheme);
    }
    return applyTheme;
  }

  componentDidMount(nextProps, nextContext) {
    //   if (nextProps.isDarkTheme || nextProps.darkTheme) {
    //     document.body.classList.add("dark-theme");
    //   } else {
    //     document.body.classList.remove("dark-theme");
    //   }
    //
    //   if (nextProps.isDirectionRTL) {
    //     document.body.classList.add("rtl");
    //   } else {
    //     document.body.classList.remove("rtl");
    //   }
  }

  render() {
    const {
      locale,
      children,
      themeColor,
      isDirectionRTL,
      drawerType,
      isDarkTheme,
      navigationStyle,
      horizontalNavPosition
    } = this.props;

    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "fixed-drawer"
      : drawerType.includes(COLLAPSED_DRAWER)
      ? "collapsible-drawer"
      : "mini-drawer";

    let applyTheme = createMuiTheme(indigoTheme);

    if (isDirectionRTL) {
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
    }

    if (isDirectionRTL) {
      applyTheme.direction = "rtl";
    } else {
      applyTheme.direction = "ltr";
    }
    if (isDarkTheme) {
      applyTheme = createMuiTheme(darkTheme);
    } else {
      applyTheme = this.getColorTheme(themeColor, applyTheme);
    }

    const currentAppLocale = AppLocale[locale.locale];

    return (
      <ThemeProvider theme={applyTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
          >
            <RTL>
              <div className="app-main">
                <div className={`app-container ${drawerStyle}`}>
                  <Sidebar />
                  <div className="app-main-container">
                    <div
                      className={`app-header ${
                        navigationStyle === HORIZONTAL_NAVIGATION
                          ? "app-header-horizontal"
                          : ""
                      }`}
                    >
                      {navigationStyle === HORIZONTAL_NAVIGATION &&
                        horizontalNavPosition === ABOVE_THE_HEADER && (
                          <TopNav styleName="app-top-header" />
                        )}
                      <Header />
                      {navigationStyle === HORIZONTAL_NAVIGATION &&
                        horizontalNavPosition === BELOW_THE_HEADER && (
                          <TopNav />
                        )}
                    </div>
                    <main className="app-main-content-wrapper ">
                      <div className="app-main-content">{children}</div>
                      <Footer>
                        <div className="gx-layout-footer-content">demo</div>
                      </Footer>
                    </main>
                  </div>
                  <Customizer />
                </div>
              </div>
            </RTL>
          </IntlProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const {
    drawerType,
    darkTheme,
    isDirectionRTL,
    navigationStyle,
    horizontalNavPosition,
    width,
    themeType,
    themeColor,
    layoutType,
    navStyle,
    locale
  } = settings;
  return {
    isDarkTheme: darkTheme,
    isDirectionRTL,
    drawerType,
    navigationStyle,
    horizontalNavPosition,
    width,
    themeType,
    layoutType,
    themeColor,
    navStyle,
    locale
  };
};
export default withRouter(connect(mapStateToProps)(App));
