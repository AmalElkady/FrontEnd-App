import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  allCountriesOnline,
  countryCitiesOnline,
  countryAgerangesOnline,
  agerangeCountriesOnline,
  countryCitiesAgerangeOnline,
  countryCityAgerangesOnline,
  allCountriesOffline,
  countryCitiesOffline,
  countryRecentActiveUsers,
  countryCityRecentActiveUsers,
  allCountriesOfflineUsers,
  resetStates
} from "../actions/Home";
import { showAuthLoader } from "../actions/Auth";

import { COUNTRY_CITY_MAP, ARRAY_OF_AGE_RANGE } from "../util/data";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

//import convertArrayToArrayOfObjects from "../helpers/convertArrayToArrayOfObjects";

import IntlMessages from "../util/IntlMessages";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "70%",
    margin: "2rem auto",
    textAlign: "center"
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  ///modal
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "3px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  displayB: {
    display: "block"
  },
  positionR: {
    position: "relative",
    padding: "1rem .5rem 2rem .5rem"
  },
  positionA: {
    position: "absolute",
    right: ".5rem",
    bottom: "-1rem"
  },
  ////
  menu: {
    backgroundColor: theme.palette.background.paper
  },
  displayFlexSA: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  displayFlexSB: {
    display: "flex",
    justifyContent: "space-between"
  },
  flexDirection: {
    flexDirection: "row"
  },
  margintop: {
    marginTop: "1.5rem"
  },
  margin: {
    margin: "1rem"
  },
  padding: {
    padding: ".5rem"
  },

  width: {
    width: "10rem"
  }
}));
const ITEM_HEIGHT = 48;

export default function Search() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElC, setAnchorElC] = useState(null);
  const [anchorElCit, setAnchorElCit] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedIndexC, setSelectedIndexC] = useState(-1);
  const [selectedIndexCit, setSelectedIndexCit] = useState(-1);
  const [optionValue, setOptionValue] = useState("active");

  const handleChangeOptionValue = event => {
    setOptionValue(event.target.value);
  };

  //AgeRanges
  const CountryAgerangesOptionsOnline = useSelector(
    state => state.home.countryAgerangesOnline
  );

  const CountryCityAgerangesOptionsOnline = useSelector(
    state => state.home.countryCityAgerangesOnline
  );

  // Countries
  const CountriesOptionsOnline = useSelector(
    state => state.home.allCountriesOnline
  );
  const AgerangeCountriesOptionsOnline = useSelector(
    state => state.home.agerangeCountriesOnline
  );

  // Cities
  const CountryCitiesOptionsOnline = useSelector(
    state => state.home.countryCitiesOnline
  );

  const CountryCitiesAgerangeOptionsOnline = useSelector(
    state => state.home.countryCitiesAgerangeOnline
  );

  // Offline
  // Countries
  const CountriesOptionsOffline = useSelector(
    state => state.home.allCountriesOffline
  );
  // Cities
  const CountryCitiesOptionsOffline = useSelector(
    state => state.home.countryCitiesOffline
  );

  const selectedCountryIndexForUsers = useSelector(
    state => state.home.selectedCountryIndexForUsers
  );

  const dispatch = useDispatch();

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget);
  };
  //for Countries
  const handleClickListItemC = event => {
    setAnchorElC(event.currentTarget);
  };

  //for Cities
  const handleClickListItemCit = event => {
    setAnchorElCit(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  //for Countries
  const handleMenuItemClickC = (event, index) => {
    setSelectedIndexC(index);
    setAnchorElC(null);
  };

  //for Cities
  const handleMenuItemClickCit = (event, index) => {
    setSelectedIndexCit(index);
    setAnchorElCit(null);
  };

  ////

  const handleClose = () => {
    setAnchorEl(null);
  };

  //for Countries
  const handleCloseC = () => {
    setAnchorElC(null);
  };

  //for Cities
  const handleCloseCit = () => {
    setAnchorElCit(null);
  };

  useEffect(() => {
    // fill dropdowns based on optionValue
    setSelectedIndex(-1);
    setSelectedIndexC(-1);
    setSelectedIndexCit(-1);
    if (optionValue == "most recent") {
      //Get all Countries Offline
      dispatch(allCountriesOffline());
    } else {
      // Get all Countries Online
      dispatch(allCountriesOnline());
    }
  }, [optionValue]);

  useEffect(() => {
    if (optionValue == "active") {
      if (selectedIndexC != -1 && selectedIndex == -1) {
        // Get Cities based on Country only
        dispatch(
          countryCitiesOnline(
            CountriesOptionsOnline.list_of_results[selectedIndexC]
          )
        );

        // Get Ageranges based on Country only
        if (CountriesOptionsOnline.list_of_results != null) {
          dispatch(
            countryAgerangesOnline(
              CountriesOptionsOnline.list_of_results[selectedIndexC]
            )
          );
        }
      }
      // Get cities based on agerange and country
      else if (
        selectedIndex != -1 &&
        selectedIndexC != -1 &&
        selectedIndexCit == -1
      ) {
        if (
          CountryAgerangesOptionsOnline.list_of_results &&
          !AgerangeCountriesOptionsOnline.list_of_results
        ) {
          dispatch(
            countryCitiesAgerangeOnline(
              allCountriesOnline.list_of_results[selectedIndexC],
              CountryAgerangesOptionsOnline.list_of_results[selectedIndex]
            )
          );
        } else {
          dispatch(
            countryCitiesAgerangeOnline(
              AgerangeCountriesOptionsOnline.list_of_results[selectedIndexC],
              ARRAY_OF_AGE_RANGE[selectedIndex].replace(/\s/g, "")
            )
          );
        }
      }
    } else if (optionValue == "most recent") {
      if (selectedIndexC != -1) {
        // Get Cities Offline based on Country only
        dispatch(
          countryCitiesOffline(
            CountriesOptionsOffline.list_of_results[selectedIndexC]
          )
        );
      }
    }
  }, [selectedIndexC]);

  useEffect(() => {
    if (optionValue == "active") {
      if (selectedIndexC == -1 && selectedIndex != -1) {
        // Get countries based on agerange
        dispatch(
          agerangeCountriesOnline(
            ARRAY_OF_AGE_RANGE[selectedIndex].replace(/\s/g, "")
          )
        );
      }
      // Get cities based on agerange and country
      else if (selectedIndexC != -1 && selectedIndex != -1) {
        if (
          CountryAgerangesOptionsOnline.list_of_results &&
          !AgerangeCountriesOptionsOnline.list_of_results
        ) {
          dispatch(
            countryCitiesAgerangeOnline(
              CountriesOptionsOnline.list_of_results[selectedIndexC],
              CountryAgerangesOptionsOnline.list_of_results[selectedIndex]
            )
          );
        } else {
          //Get countries based on agerange
          dispatch(
            agerangeCountriesOnline(
              ARRAY_OF_AGE_RANGE[selectedIndex + 1].replace(/\s/g, "")
            )
          );
          dispatch(
            countryCitiesAgerangeOnline(
              AgerangeCountriesOptionsOnline.list_of_results[selectedIndexC],
              ARRAY_OF_AGE_RANGE[selectedIndex + 1].replace(/\s/g, "")
            )
          );
        }
      }
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (optionValue == "active") {
      // Get AgeRanges based on Country and city
      if (
        selectedIndexC != -1 &&
        selectedIndexCit != -1 &&
        selectedIndex == -1
      ) {
        dispatch(
          countryCityAgerangesOnline(
            CountriesOptionsOnline.list_of_results[selectedIndexC],
            CountryCitiesOptionsOnline.list_of_results[selectedIndexCit]
          )
        );
      }
    } else if (optionValue == "most recent") {
    }
  }, [selectedIndexCit]);

  useEffect(() => {
    if (CountriesOptionsOffline != null) {
      console.log(
        "get allCountriesOfflineUsers first time from search Component : "
      );
      // Get most recent users for first call
      dispatch(
        allCountriesOfflineUsers(
          CountriesOptionsOffline.list_of_results[selectedCountryIndexForUsers],
          "",
          0
        )
      );
    }
  }, [CountriesOptionsOffline]);

  const onSearch = () => {
    if (optionValue == "active") {
    } else if (optionValue == "most recent") {
      //without Agerange
      if (selectedIndex == -1) {
        if (selectedIndexC != -1 && selectedIndexCit == -1) {
          // Get Users based on country only
          dispatch(
            countryRecentActiveUsers(
              CountriesOptionsOffline.list_of_results[selectedIndexC],
              "",
              "",
              0
            )
          );
        } else if (selectedIndexC != -1 && selectedIndexCit != -1) {
          // Get Users based on country and city
          dispatch(
            countryCityRecentActiveUsers(
              CountriesOptionsOffline.list_of_results[selectedIndexC],
              CountryCitiesOptionsOffline.list_of_results[selectedIndexCit],
              "",
              "",
              0
            )
          );
        }
      } else {
        // calc scoreH and scoreL from age range
      }
    }
  };
  return (
    <>
      <Card className={classes.root}>
        <FormControl component="fieldset" className={classes.margin}>
          <FormLabel component="legend">Select Your option </FormLabel>
          <RadioGroup
            aria-label="option"
            name="option"
            value={optionValue}
            onChange={handleChangeOptionValue}
            className={classes.flexDirection}
          >
            <FormControlLabel
              value="active"
              control={<Radio />}
              label="ACTIVE"
            />
            <FormControlLabel
              value="most recent"
              control={<Radio />}
              label="MOST RECENT ACTIVE"
            />
          </RadioGroup>
        </FormControl>

        {/* /////////// */}
        <form
          className={classes.displayFlexSA}
          onKeyPress={event => {
            if (event.key === "Enter") {
            }
          }}
        >
          {/* Age Range  */}
          {optionValue == "active" && (
            <div className={classes.menu}>
              <List component="nav" aria-label="Age Range">
                <ListItem
                  button
                  aria-haspopup="true"
                  aria-controls="lock-menu"
                  aria-label="Age Range"
                  onClick={handleClickListItem}
                >
                  <ListItemText
                    primary="Age Range"
                    secondary={
                      selectedIndexC == -1
                        ? selectedIndex == -1
                          ? "Select Age Range"
                          : ARRAY_OF_AGE_RANGE[selectedIndex]
                        : selectedIndexCit == -1
                        ? CountryAgerangesOptionsOnline.list_of_results
                          ? selectedIndex == -1
                            ? "Select Age Range"
                            : CountryAgerangesOptionsOnline.list_of_results[
                                selectedIndex
                              ]
                          : ARRAY_OF_AGE_RANGE[selectedIndex]
                        : CountryCityAgerangesOptionsOnline.list_of_results
                        ? selectedIndex == -1
                          ? "Select Age Range"
                          : CountryCityAgerangesOptionsOnline.list_of_results[
                              selectedIndex
                            ]
                        : ARRAY_OF_AGE_RANGE[selectedIndex]
                    }
                  />
                </ListItem>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {selectedIndexC == -1 && (
                  <div>
                    <MenuItem
                      onClick={() => {
                        setSelectedIndex(-1);
                        setAnchorEl(null);
                      }}
                      className={classes.displayFlexSB}
                    >
                      <Typography variant="button" gutterBottom>
                        No Select
                      </Typography>
                    </MenuItem>
                    {ARRAY_OF_AGE_RANGE.map((option, index) => (
                      <MenuItem
                        className={classes.displayFlexSB}
                        key={option}
                        selected={index === selectedIndex}
                        onClick={event => handleMenuItemClick(event, index)}
                      >
                        <Typography variant="button" gutterBottom>
                          {option}
                        </Typography>
                      </MenuItem>
                    ))}
                  </div>
                )}
                {selectedIndexC != -1 && selectedIndexCit == -1 && (
                  <div>
                    {" "}
                    {CountryAgerangesOptionsOnline.list_of_results ? (
                      <div>
                        <Typography
                          variant="h6"
                          className={classes.padding}
                          gutterBottom
                        >
                          ONLINE
                        </Typography>
                        <MenuItem
                          onClick={() => {
                            setSelectedIndex(-1);
                            setAnchorEl(null);
                          }}
                          className={classes.displayFlexSB}
                        >
                          <Typography variant="button" gutterBottom>
                            No Select
                          </Typography>
                        </MenuItem>
                        {CountryAgerangesOptionsOnline.list_of_results?.map(
                          (option, index) =>
                            index % 2 == 0 && (
                              <MenuItem
                                className={`${classes.displayFlexSB} ${classes.width}`}
                                key={option}
                                selected={index === selectedIndex}
                                onClick={event =>
                                  handleMenuItemClick(event, index)
                                }
                              >
                                <Typography variant="button" gutterBottom>
                                  {option}
                                </Typography>
                                <Typography
                                  variant="button"
                                  color="primary"
                                  gutterBottom
                                >
                                  {
                                    CountryAgerangesOptionsOnline
                                      .list_of_results[index + 1]
                                  }
                                </Typography>
                              </MenuItem>
                            )
                        )}
                      </div>
                    ) : (
                      <div>
                        <MenuItem
                          onClick={() => {
                            setSelectedIndex(-1);
                            setAnchorEl(null);
                          }}
                          className={classes.displayFlexSB}
                        >
                          <Typography variant="button" gutterBottom>
                            No Select
                          </Typography>
                        </MenuItem>
                        {ARRAY_OF_AGE_RANGE.map((option, index) => (
                          <MenuItem
                            className={classes.displayFlexSB}
                            key={option}
                            selected={index === selectedIndex}
                            onClick={event => handleMenuItemClick(event, index)}
                          >
                            <Typography variant="button" gutterBottom>
                              {option}
                            </Typography>
                          </MenuItem>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {selectedIndexC != -1 && selectedIndexCit != -1 && (
                  <div>
                    {" "}
                    <Typography
                      variant="h6"
                      className={classes.padding}
                      gutterBottom
                    >
                      ONLINE
                    </Typography>
                    <MenuItem
                      onClick={() => {
                        setSelectedIndex(-1);
                        setAnchorEl(null);
                      }}
                      className={classes.displayFlexSB}
                    >
                      <Typography variant="button" gutterBottom>
                        No Select
                      </Typography>
                    </MenuItem>
                    {CountryCityAgerangesOptionsOnline.list_of_results
                      ? CountryCityAgerangesOptionsOnline.list_of_results?.map(
                          (option, index) =>
                            index % 2 == 0 && (
                              <MenuItem
                                className={`${classes.displayFlexSB} ${classes.width}`}
                                key={option}
                                selected={index === selectedIndex}
                                onClick={event =>
                                  handleMenuItemClick(event, index)
                                }
                              >
                                <Typography variant="button" gutterBottom>
                                  {option}
                                </Typography>
                                <Typography
                                  variant="button"
                                  color="primary"
                                  gutterBottom
                                >
                                  {
                                    CountryCityAgerangesOptionsOnline
                                      .list_of_results[index + 1]
                                  }
                                </Typography>
                              </MenuItem>
                            )
                        )
                      : ARRAY_OF_AGE_RANGE.map((option, index) => (
                          <MenuItem
                            className={classes.displayFlexSB}
                            key={option}
                            selected={index === selectedIndex}
                            onClick={event => handleMenuItemClick(event, index)}
                          >
                            <Typography variant="button" gutterBottom>
                              {option}
                            </Typography>
                          </MenuItem>
                        ))}
                  </div>
                )}
              </Menu>
            </div>
          )}

          {optionValue == "most recent" && (
            <div className={classes.menu}>
              <List component="nav" aria-label="Age Range">
                <ListItem
                  button
                  aria-haspopup="true"
                  aria-controls="lock-menu"
                  aria-label="Age Range"
                  onClick={handleClickListItem}
                >
                  <ListItemText
                    primary="Age Range"
                    secondary={
                      selectedIndex == -1
                        ? "Select Age Range"
                        : ARRAY_OF_AGE_RANGE[selectedIndex]
                    }
                  />
                </ListItem>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    setSelectedIndex(-1);
                    setAnchorEl(null);
                  }}
                  className={classes.displayFlexSB}
                >
                  <Typography variant="button" gutterBottom>
                    No Select
                  </Typography>
                </MenuItem>
                {ARRAY_OF_AGE_RANGE.map((option, index) => (
                  <MenuItem
                    className={classes.displayFlexSB}
                    key={option}
                    selected={index === selectedIndex}
                    onClick={event => handleMenuItemClick(event, index)}
                  >
                    <Typography variant="button" gutterBottom>
                      {option}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}

          {/* contries list Online*/}
          {optionValue == "active" && CountriesOptionsOnline.list_of_results && (
            <div className={classes.menu}>
              <List component="nav" aria-label="Countries">
                <ListItem
                  button
                  aria-haspopup="true"
                  aria-controls="lock-menu2"
                  aria-label="Countries"
                  onClick={handleClickListItemC}
                >
                  <ListItemText
                    primary="Countries"
                    secondary={
                      AgerangeCountriesOptionsOnline.list_of_results == null
                        ? selectedIndexC == -1
                          ? // ? CountriesOptionsOnline.list_of_results[
                            //     selectedIndexC + 1
                            //   ]
                            "Select Country"
                          : CountriesOptionsOnline.list_of_results[
                              selectedIndexC
                            ]
                        : selectedIndexC == -1
                        ? // ? AgerangeCountriesOptionsOnline.list_of_results[
                          //     selectedIndexC + 1
                          //   ]
                          "Select Country"
                        : AgerangeCountriesOptionsOnline.list_of_results[
                            selectedIndexC
                          ]
                    }
                  />
                </ListItem>
              </List>
              <Menu
                id="lock-menu2"
                anchorEl={anchorElC}
                keepMounted
                open={Boolean(anchorElC)}
                onClose={handleCloseC}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "30ch"
                  }
                }}
              >
                <Typography
                  variant="h6"
                  className={classes.padding}
                  gutterBottom
                >
                  ONLINE
                </Typography>
                <MenuItem
                  onClick={() => {
                    setSelectedIndexC(-1);
                    setAnchorElC(null);
                  }}
                  className={classes.displayFlexSB}
                >
                  <Typography variant="button" gutterBottom>
                    No Select
                  </Typography>
                </MenuItem>
                {selectedIndex != -1 &&
                  selectedIndexC == -1 &&
                  AgerangeCountriesOptionsOnline.list_of_results?.map(
                    (option, index) =>
                      index % 2 === 0 && (
                        <MenuItem
                          key={option}
                          selected={index === selectedIndexC}
                          onClick={event => handleMenuItemClickC(event, index)}
                          className={classes.displayFlexSB}
                        >
                          <Typography variant="button" gutterBottom>
                            {option}
                          </Typography>
                          <Typography
                            variant="button"
                            color="primary"
                            gutterBottom
                          >
                            {
                              AgerangeCountriesOptionsOnline.list_of_results[
                                index + 1
                              ]
                            }
                          </Typography>
                        </MenuItem>
                      )
                  )}
                {((selectedIndex == -1 && selectedIndexC == -1) ||
                  (selectedIndex != -1 &&
                    selectedIndexC != -1 &&
                    AgerangeCountriesOptionsOnline.list_of_results == null) ||
                  (selectedIndex == -1 && selectedIndexC != -1)) &&
                  CountriesOptionsOnline.list_of_results?.map(
                    (option, index) =>
                      index % 2 === 0 && (
                        <MenuItem
                          key={option}
                          selected={index === selectedIndexC}
                          onClick={event => handleMenuItemClickC(event, index)}
                          className={classes.displayFlexSB}
                        >
                          <Typography variant="button" gutterBottom>
                            {option}
                          </Typography>
                          <Typography
                            variant="button"
                            color="primary"
                            gutterBottom
                          >
                            {CountriesOptionsOnline.list_of_results[index + 1]}
                          </Typography>
                        </MenuItem>
                      )
                  )}

                {selectedIndex != -1 &&
                  selectedIndexC != -1 &&
                  AgerangeCountriesOptionsOnline.list_of_results != null &&
                  AgerangeCountriesOptionsOnline.list_of_results?.map(
                    (option, index) =>
                      index % 2 === 0 && (
                        <MenuItem
                          key={option}
                          selected={index === selectedIndexC}
                          onClick={event => handleMenuItemClickC(event, index)}
                          className={classes.displayFlexSB}
                        >
                          <Typography variant="button" gutterBottom>
                            {option}
                          </Typography>
                          <Typography
                            variant="button"
                            color="primary"
                            gutterBottom
                          >
                            {
                              AgerangeCountriesOptionsOnline.list_of_results[
                                index + 1
                              ]
                            }
                          </Typography>
                        </MenuItem>
                      )
                  )}
              </Menu>
            </div>
          )}

          {/* Contries list Offline  */}
          {optionValue == "most recent" && CountriesOptionsOffline && (
            <div className={classes.menu}>
              <List component="nav" aria-label="Countries">
                <ListItem
                  button
                  aria-haspopup="true"
                  aria-controls="lock-menu2"
                  aria-label="Countries"
                  onClick={handleClickListItemC}
                >
                  <ListItemText
                    primary="Countries"
                    secondary={
                      CountriesOptionsOffline.list_of_results
                        ? selectedIndexC == -1
                          ? "Select Country"
                          : // ? CountriesOptionsOffline.list_of_results[
                            //     selectedIndexCOf + 1
                            //   ]
                            CountriesOptionsOffline.list_of_results[
                              selectedIndexC
                            ]
                        : ""
                    }
                  />
                </ListItem>
              </List>
              <Menu
                id="lock-menu2"
                anchorEl={anchorElC}
                keepMounted
                open={Boolean(anchorElC)}
                onClose={handleCloseC}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "30ch"
                  }
                }}
              >
                <Typography
                  variant="h6"
                  className={classes.padding}
                  gutterBottom
                >
                  MOST RECENT
                </Typography>
                <MenuItem
                  onClick={() => {
                    setSelectedIndexC(-1);
                    setAnchorElC(null);
                  }}
                  className={classes.displayFlexSB}
                >
                  <Typography variant="button" gutterBottom>
                    No Select
                  </Typography>
                </MenuItem>
                {CountriesOptionsOffline.list_of_results?.map(
                  (option, index) =>
                    index % 2 === 0 && (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndexC}
                        onClick={event => handleMenuItemClickC(event, index)}
                        className={classes.displayFlexSB}
                      >
                        <Typography variant="button" gutterBottom>
                          {option}
                        </Typography>
                        <Typography
                          variant="button"
                          color="primary"
                          gutterBottom
                        >
                          {CountriesOptionsOffline.list_of_results[index + 1]}
                        </Typography>
                      </MenuItem>
                    )
                )}
              </Menu>
            </div>
          )}

          {/* Cities list Online */}
          {optionValue == "active" && selectedIndexC != -1 && (
            <div className={classes.menu}>
              <List component="nav" aria-label="cities">
                <ListItem
                  button
                  aria-haspopup="true"
                  aria-controls="lock-menu2"
                  aria-label="cities"
                  onClick={handleClickListItemCit}
                >
                  <ListItemText
                    primary="Cities"
                    secondary={
                      selectedIndex == -1
                        ? CountryCitiesOptionsOnline.list_of_results
                          ? selectedIndexCit == -1
                            ? "select City"
                            : COUNTRY_CITY_MAP[
                                CountriesOptionsOnline.list_of_results[
                                  selectedIndexC
                                ].toLowerCase()
                              ][
                                CountryCitiesOptionsOnline.list_of_results[
                                  selectedIndexCit
                                ] - 1
                              ]
                          : CountryCitiesAgerangeOptionsOnline.list_of_results
                          ? setSelectedIndexC(-1)
                          : ""
                        : CountryCitiesAgerangeOptionsOnline.list_of_results
                        ? CountriesOptionsOnline.list_of_results
                          ? selectedIndexCit == -1
                            ? // ? COUNTRY_CITY_MAP[
                              //     CountriesOptionsOnline.list_of_results[
                              //       selectedIndexC
                              //     ].toLowerCase()
                              //   ][
                              //     CountryCitiesAgerangeOptionsOnline
                              //       .list_of_results[selectedIndexCit + 1] - 1
                              //   ]
                              "Select City"
                            : COUNTRY_CITY_MAP[
                                CountriesOptionsOnline.list_of_results[
                                  selectedIndexC
                                ].toLowerCase()
                              ][
                                CountryCitiesAgerangeOptionsOnline
                                  .list_of_results[selectedIndexCit] - 1
                              ]
                          : AgerangeCountriesOptionsOnline.list_of_results
                          ? selectedIndexCit == -1
                            ? "Select City"
                            : // ? COUNTRY_CITY_MAP[
                              //     AgerangeCountriesOptionsOnline.list_of_results[
                              //       selectedIndexC
                              //     ].toLowerCase()
                              //   ][
                              //     CountryCitiesAgerangeOptionsOnline
                              //       .list_of_results[selectedIndexCit + 1] - 1
                              //   ]
                              COUNTRY_CITY_MAP[
                                AgerangeCountriesOptionsOnline.list_of_results[
                                  selectedIndexC
                                ].toLowerCase()
                              ][
                                CountryCitiesAgerangeOptionsOnline
                                  .list_of_results[selectedIndexCit] - 1
                              ]
                          : ""
                        : ""
                    }
                  />
                </ListItem>
              </List>
              <Menu
                id="lock-menu2"
                anchorEl={anchorElCit}
                keepMounted
                open={Boolean(anchorElCit)}
                onClose={handleCloseCit}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "30ch"
                  }
                }}
              >
                {selectedIndexC != -1 && selectedIndex == -1 && (
                  <div>
                    <Typography
                      variant="h6"
                      className={classes.padding}
                      gutterBottom
                    >
                      ONLINE
                    </Typography>
                    <MenuItem
                      onClick={() => {
                        setSelectedIndexCit(-1);
                        setAnchorElCit(null);
                      }}
                      className={classes.displayFlexSB}
                    >
                      <Typography variant="button" gutterBottom>
                        No Select
                      </Typography>
                    </MenuItem>
                    {CountryCitiesOptionsOnline.list_of_results?.map(
                      (option, index) =>
                        index % 2 === 0 && (
                          <MenuItem
                            key={option}
                            value={option}
                            //label={value}
                            selected={index === selectedIndexCit}
                            onClick={event =>
                              handleMenuItemClickCit(event, index)
                            }
                            className={classes.displayFlexSB}
                          >
                            <Typography variant="button" gutterBottom>
                              {
                                COUNTRY_CITY_MAP[
                                  CountriesOptionsOnline.list_of_results[
                                    selectedIndexC
                                  ].toLowerCase()
                                ][option - 1]
                              }
                            </Typography>
                            <Typography
                              variant="button"
                              color="primary"
                              gutterBottom
                            >
                              {
                                CountryCitiesOptionsOnline.list_of_results[
                                  index + 1
                                ]
                              }
                            </Typography>
                          </MenuItem>
                        )
                    )}
                  </div>
                )}
                {selectedIndexC != -1 && selectedIndex != -1 && (
                  <div>
                    <Typography
                      variant="h6"
                      className={classes.padding}
                      gutterBottom
                    >
                      ONLINE
                    </Typography>
                    <MenuItem
                      onClick={() => {
                        setSelectedIndexCit(-1);
                        setAnchorElCit(null);
                      }}
                      className={classes.displayFlexSB}
                    >
                      <Typography variant="button" gutterBottom>
                        No Select
                      </Typography>
                    </MenuItem>
                    {CountryCitiesAgerangeOptionsOnline.list_of_results?.map(
                      (option, index) =>
                        index % 2 === 0 && (
                          <MenuItem
                            key={option}
                            value={option}
                            //label={value}
                            selected={index === selectedIndexCit}
                            onClick={event =>
                              handleMenuItemClickCit(event, index)
                            }
                            className={classes.displayFlexSB}
                          >
                            <Typography variant="button" gutterBottom>
                              {
                                COUNTRY_CITY_MAP[
                                  CountriesOptionsOnline.list_of_results[
                                    selectedIndexC
                                  ].toLowerCase()
                                ][option - 1]
                              }
                            </Typography>
                            <Typography
                              variant="button"
                              color="primary"
                              gutterBottom
                            >
                              {
                                CountryCitiesAgerangeOptionsOnline
                                  .list_of_results[index + 1]
                              }
                            </Typography>
                          </MenuItem>
                        )
                    )}
                  </div>
                )}
              </Menu>
            </div>
          )}

          {/* Cities list Offline */}
          {optionValue == "most recent" &&
            CountryCitiesOptionsOffline &&
            selectedIndexC != -1 && (
              <div className={classes.menu}>
                <List component="nav" aria-label="Cities">
                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu2"
                    aria-label="cities"
                    onClick={handleClickListItemCit}
                  >
                    <ListItemText
                      primary="Cities"
                      secondary={
                        CountryCitiesOptionsOffline
                          ? selectedIndexCit == -1
                            ? // ? COUNTRY_CITY_MAP[
                              //     CountriesOptionsOffline.list_of_results[
                              //       selectedIndexC
                              //     ].toLowerCase()
                              //   ][
                              //     CountryCitiesOptionsOffline.list_of_results[
                              //       selectedIndexCit + 1
                              //     ] - 1
                              //   ]
                              "Select City"
                            : COUNTRY_CITY_MAP[
                                CountriesOptionsOffline.list_of_results[
                                  selectedIndexC
                                ].toLowerCase()
                              ][
                                CountryCitiesOptionsOffline.list_of_results[
                                  selectedIndexCit
                                ] - 1
                              ]
                          : ""
                      }
                    />
                  </ListItem>
                </List>
                <Menu
                  id="lock-menu2"
                  anchorEl={anchorElCit}
                  keepMounted
                  open={Boolean(anchorElCit)}
                  onClose={handleCloseCit}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "30ch"
                    }
                  }}
                >
                  {selectedIndexC != -1 && (
                    <div>
                      <Typography
                        variant="h6"
                        className={classes.padding}
                        gutterBottom
                      >
                        Most Recent
                      </Typography>

                      <MenuItem
                        onClick={() => {
                          setSelectedIndexCit(-1);
                          setAnchorElCit(null);
                        }}
                        className={classes.displayFlexSB}
                      >
                        <Typography variant="button" gutterBottom>
                          No Select
                        </Typography>
                      </MenuItem>
                      {CountryCitiesOptionsOffline.list_of_results?.map(
                        (option, index) =>
                          index % 2 === 0 && (
                            <MenuItem
                              key={option}
                              value={option}
                              //label={value}
                              selected={index === selectedIndexCit}
                              onClick={event =>
                                handleMenuItemClickCit(event, index)
                              }
                              className={classes.displayFlexSB}
                            >
                              <Typography variant="button" gutterBottom>
                                {
                                  COUNTRY_CITY_MAP[
                                    CountriesOptionsOffline.list_of_results[
                                      selectedIndexC
                                    ].toLowerCase()
                                  ][option - 1]
                                }
                              </Typography>
                              <Typography
                                variant="button"
                                color="primary"
                                gutterBottom
                              >
                                {
                                  CountryCitiesOptionsOffline.list_of_results[
                                    index + 1
                                  ]
                                }
                              </Typography>
                            </MenuItem>
                          )
                      )}
                    </div>
                  )}
                </Menu>
              </div>
            )}
          <div className={classes.margintop}>
            <Button
              onClick={() => {
                dispatch(showAuthLoader());
                onSearch();
              }}
              variant="contained"
              color="primary"
            >
              <IntlMessages id="appModule.search" />
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}
