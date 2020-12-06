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
  allCountriesSelectedOnline,
  agerangeAllCountriesSelectedOnline,
  allCountriesOffline,
  countryCitiesOffline,
  allCountriesOfflineUsers,
  countryRecentActiveUsers,
  countryCityRecentActiveUsers,
  resetStatesOnline,
  resetEndRes,
  resetEndResUsers,
  resetStatesOffline,
  resetStatesListCountryOnline,
  resetStatesListCityOnline,
  resetStatesListAgerangeOnline,
  selectedAgerangeIndex,
  selectedCountryIndex,
  selectedCityIndex,
  setAgeScores,
  setSearchState,
  countrySelectedOnline,
  countryCitySelectedOnline,
  countryCitiesAgerangeSelectedOnline,
  countryCityAgerangeSelectedOnline
} from "../actions/Home";
import { showAuthLoader } from "../actions/Auth";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";

import { COUNTRY_CITY_MAP, ARRAY_OF_AGE_RANGE } from "../util/data";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { calcSlShFromAgerange } from "../helpers/calcSlShFromAgerange";

import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

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

  const OffsetOnline = useSelector(state => state.home.OffsetOnline);
  const scoreLOnline = useSelector(state => state.home.scoreLOnline);

  //AgeRanges
  const CountryAgerangesOptionsOnline = useSelector(
    state => state.home.countryAgerangesOnline
  );
  const CountryAgerangesOptionsOnlineCount = useSelector(
    state => state.home.countryAgerangesOnlineCount
  );

  const CountryCityAgerangesOptionsOnline = useSelector(
    state => state.home.countryCityAgerangesOnline
  );

  const CountryCityAgerangesOptionsOnlineCount = useSelector(
    state => state.home.countryCityAgerangesOnlineCount
  );

  // Countries
  const CountriesOptionsOnline = useSelector(
    state => state.home.allCountriesOnline
  );
  const CountriesOptionsOnlineCount = useSelector(
    state => state.home.allCountriesOnlineCount
  );
  const AgerangeCountriesOptionsOnline = useSelector(
    state => state.home.agerangeCountriesOnline
  );
  const AgerangeCountriesOptionsOnlineCount = useSelector(
    state => state.home.agerangeCountriesOnlineCount
  );
  const OffsetOnlineCo = useSelector(state => state.home.OffsetOnlineCo);
  const scoreLOnlineCo = useSelector(state => state.home.scoreLOnlineCo);
  const endOfResultOnCo = useSelector(state => state.home.endOfResultOnCo);
  // for city list online
  const OffsetOnlineCi = useSelector(state => state.home.OffsetOnlineCi);
  const scoreLOnlineCi = useSelector(state => state.home.scoreLOnlineCi);
  const endOfResultOnCi = useSelector(state => state.home.endOfResultOnCi);

  //for agerange list online
  const OffsetOnlineAge = useSelector(state => state.home.OffsetOnlineAge);
  const scoreLOnlineAge = useSelector(state => state.home.scoreLOnlineAge);
  const endOfResultOnAge = useSelector(state => state.home.endOfResultOnAge);

  //users
  const AllCountriesSelectedOnline = useSelector(
    state => state.home.allCountriesSelectedOnline
  );

  // Cities
  const CountryCitiesOptionsOnline = useSelector(
    state => state.home.countryCitiesOnline
  );
  const CountryCitiesOptionsOnlineCount = useSelector(
    state => state.home.countryCitiesOnlineCount
  );

  const CountryCitiesAgerangeOptionsOnline = useSelector(
    state => state.home.countryCitiesAgerangeOnline
  );
  const CountryCitiesAgerangeOptionsOnlineCount = useSelector(
    state => state.home.countryCitiesAgerangeOnlineCount
  );

  ////////// Offline
  // Countries
  const CountriesOptionsOffline = useSelector(
    state => state.home.allCountriesOffline
  );
  const CountriesOptionsOfflineCount = useSelector(
    state => state.home.allCountriesOfflineCount
  );

  const AllCountriesOfflineUsers = useSelector(
    state => state.home.allCountriesOfflineUsers
  );

  const currentIndexAllCountriesOffline = useSelector(
    state => state.home.currentIndexAllCountriesOffline
  );

  const OffsetOfflineCo = useSelector(state => state.home.OffsetOfflineCo);
  const scoreLOfflineCo = useSelector(state => state.home.scoreLOfflineCo);
  const endOfResultCo = useSelector(state => state.home.endOfResultCo);

  // Cities
  const CountryCitiesOptionsOffline = useSelector(
    state => state.home.countryCitiesOffline
  );

  const CountryCitiesOptionsOfflineCount = useSelector(
    state => state.home.countryCitiesOfflineCount
  );
  const OffsetOfflineCi = useSelector(state => state.home.OffsetOfflineCi);
  const scoreLOfflineCi = useSelector(state => state.home.scoreLOfflineCi);
  const endOfResultCi = useSelector(state => state.home.endOfResultCi);

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
    // reset states
    setSelectedIndex(-1);
    setSelectedIndexC(-1);
    setSelectedIndexCit(-1);
    dispatch(resetStatesOnline());
    dispatch(resetEndResUsers());
    dispatch(resetEndRes());
    dispatch(setSearchState(optionValue));
    // fill dropdowns based on optionValue
    if (optionValue == "most recent") {
      //Get all Countries Offline first time
      CountriesOptionsOffline.length == 0
        ? dispatch(allCountriesOffline("", 0))
        : "";
    } else {
      // Get all Countries Online first time
      dispatch(resetStatesListCountryOnline());
      CountriesOptionsOnline.length == 0
        ? dispatch(allCountriesOnline("", 0))
        : "";
    }
  }, [optionValue]);

  useEffect(() => {
    if (optionValue == "active") {
      if (selectedIndexC != -1 && selectedIndex == -1) {
        // Get Cities based on Country only first time
        dispatch(resetStatesListCityOnline());
        dispatch(
          countryCitiesOnline(CountriesOptionsOnline[selectedIndexC], "", 0)
        );

        // Get Ageranges based on Country only
        dispatch(resetStatesListAgerangeOnline());
        if (CountriesOptionsOnline.length != 0) {
          dispatch(
            countryAgerangesOnline(
              CountriesOptionsOnline[selectedIndexC],
              "",
              0
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
        dispatch(resetStatesListCityOnline());
        if (
          CountryAgerangesOptionsOnline.length != 0 &&
          AgerangeCountriesOptionsOnline.length == 0
        ) {
          // country --->agerange
          dispatch(
            countryCitiesAgerangeOnline(
              CountriesOptionsOnline[selectedIndexC],
              CountryAgerangesOptionsOnline[selectedIndex],
              "",
              0
            )
          );
        } else {
          //agerange --->country
          dispatch(
            countryCitiesAgerangeOnline(
              AgerangeCountriesOptionsOnline[selectedIndexC],
              ARRAY_OF_AGE_RANGE[selectedIndex].replace(/\s/g, ""),
              "",
              0
            )
          );
        }
      }
    } else if (optionValue == "most recent") {
      if (selectedIndexC != -1) {
        // Get Cities Offline based on Country only (first time)
        dispatch(
          countryCitiesOffline(CountriesOptionsOffline[selectedIndexC], "", 0)
        );
      }
    }
  }, [selectedIndexC]);

  useEffect(() => {
    if (optionValue == "active") {
      if (selectedIndexC == -1 && selectedIndex != -1) {
        // Get countries based on agerange
        dispatch(resetStatesListCountryOnline());
        dispatch(
          agerangeCountriesOnline(
            ARRAY_OF_AGE_RANGE[selectedIndex].replace(/\s/g, ""),
            "",
            0
          )
        );
      }
      // Get cities based on agerange and country
      else if (selectedIndexC != -1 && selectedIndex != -1) {
        dispatch(resetStatesListCityOnline());
        if (
          CountryAgerangesOptionsOnline.length != 0 &&
          AgerangeCountriesOptionsOnline.length == 0
        ) {
          // country-->agerange
          dispatch(
            countryCitiesAgerangeOnline(
              CountriesOptionsOnline[selectedIndexC],
              CountryAgerangesOptionsOnline[selectedIndex],
              "",
              0
            )
          );
        } else {
          // agerange -->country
          //Get countries based on agerange
          dispatch(resetStatesListCountryOnline());
          dispatch(
            agerangeCountriesOnline(
              ARRAY_OF_AGE_RANGE[selectedIndex].replace(/\s/g, ""),
              "",
              0
            )
          );
          // Get cities
          setSelectedIndexC(-1);
          setSelectedIndexCit(-1);
          dispatch(
            countryCitiesAgerangeOnline(
              AgerangeCountriesOptionsOnline[selectedIndexC],
              ARRAY_OF_AGE_RANGE[selectedIndex].replace(/\s/g, ""),
              "",
              0
            )
          );
        }
      } else if (selectedIndexC == -1 && selectedIndex == -1) {
        // Get all countries online
        if (AgerangeCountriesOptionsOnline.length != 0) {
          dispatch(resetStatesListCountryOnline());
          dispatch(allCountriesOnline("", 0));
        }
      } else if (selectedIndexC != -1 && selectedIndex == -1) {
        // Get cities based on country only
        dispatch(resetStatesListCityOnline());
        dispatch(
          countryCitiesOnline(CountriesOptionsOnline[selectedIndexC], "", 0)
        );
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
        dispatch(resetStatesListAgerangeOnline());
        dispatch(
          countryCityAgerangesOnline(
            CountriesOptionsOnline[selectedIndexC],
            CountryCitiesOptionsOnline[selectedIndexCit],
            "",
            0
          )
        );
      }
    }
  }, [selectedIndexCit]);

  /// online
  useEffect(() => {
    if (
      CountriesOptionsOnline.length != 0 &&
      AllCountriesSelectedOnline.length == 0
    ) {
      // Get online users options for first call
      dispatch(allCountriesSelectedOnline(scoreLOnline, OffsetOnline));
    }
  }, [CountriesOptionsOnline]);

  //offline
  useEffect(() => {
    if (CountriesOptionsOffline.length != 0 && AllCountriesOfflineUsers == 0) {
      // Get online users options for first call
      dispatch(
        allCountriesOfflineUsers(
          CountriesOptionsOffline[currentIndexAllCountriesOffline],
          "",
          0
        )
      );
    }
  }, [CountriesOptionsOffline]);

  //// scroll lists
  // online
  const handleScrollCountriesOnline = () => {
    if (!endOfResultOnCo) {
      // Get countries online (next options)
      if (AgerangeCountriesOptionsOnline.length != 0) {
        dispatch(
          agerangeCountriesOnline(
            ARRAY_OF_AGE_RANGE[selectedIndex].replace(/\s/g, ""),
            scoreLOnlineCo,
            OffsetOnlineCo
          )
        );
      } else {
        dispatch(allCountriesOnline(scoreLOnlineCo, OffsetOnlineCo));
      }
    }
  };
  const handleScrollCitiesOnline = () => {
    if (!endOfResultOnCi) {
      if (CountryCitiesAgerangeOptionsOnline.length != 0) {
        //get cities based on country and agerange
        if (
          CountryAgerangesOptionsOnline.length != 0 &&
          AgerangeCountriesOptionsOnline.length == 0
        ) {
          dispatch(
            countryCitiesAgerangeOnline(
              CountriesOptionsOnline[selectedIndexC],
              CountryAgerangesOptionsOnline[selectedIndex],
              scoreLOnlineCi,
              OffsetOnlineCi
            )
          );
        } else {
          dispatch(
            countryCitiesAgerangeOnline(
              AgerangeCountriesOptionsOnline[selectedIndexC],
              ARRAY_OF_AGE_RANGE[selectedIndex].replace(/\s/g, ""),
              scoreLOnlineCi,
              OffsetOnlineCi
            )
          );
        }
      } else {
        // Get Cities online based on Country only (next options)
        dispatch(
          countryCitiesOnline(
            CountriesOptionsOnline[selectedIndexC],
            scoreLOnlineCi,
            OffsetOnlineCi
          )
        );
      }
    }
  };

  const handleScrollAgerangeOnline = () => {
    if (!endOfResultOnAge) {
      // Get countries online (next options)
      if (selectedIndexC != -1 && selectedIndexCit == -1) {
        if (CountriesOptionsOnline.length != 0) {
          dispatch(
            countryAgerangesOnline(
              CountriesOptionsOnline[selectedIndexC],
              scoreLOnlineAge,
              OffsetOnlineAge
            )
          );
        }
      } else if (selectedIndexC != -1 && selectedIndexCit != -1) {
        dispatch(
          countryCityAgerangesOnline(
            CountriesOptionsOnline[selectedIndexC],
            CountryCitiesOptionsOnline[selectedIndexCit],
            scoreLOnlineAge,
            OffsetOnlineAge
          )
        );
      }
    }
  };

  // offline
  const handleScrollCountriesOffline = () => {
    if (!endOfResultCo) {
      // Get countries Offline (next options)
      dispatch(allCountriesOffline(scoreLOfflineCo, OffsetOfflineCo));
    }
  };

  const handleScrollCitiesOffline = () => {
    if (!endOfResultCi) {
      // Get Cities Offline based on Country only (next options)
      dispatch(
        countryCitiesOffline(
          CountriesOptionsOffline[selectedIndexC],
          scoreLOfflineCi,
          OffsetOfflineCi
        )
      );
    }
  };

  const onSearch = () => {
    if (optionValue == "active") {
      dispatch(resetEndRes());
      dispatch(resetEndResUsers());
      dispatch(resetStatesOnline());
      // Get online users based on agerange only
      if (
        selectedIndex != -1 &&
        selectedIndexC == -1 &&
        selectedIndexCit == -1
      ) {
        //Get agerangeAllCountriesSelectedOnline Options (first time)
        dispatch(selectedAgerangeIndex(selectedIndex));
        dispatch(
          agerangeAllCountriesSelectedOnline(
            ARRAY_OF_AGE_RANGE[selectedIndex].replace(/\s/g, ""),
            "",
            0
          )
        );
      } //Get online users based on country only
      else if (
        selectedIndex == -1 &&
        selectedIndexC != -1 &&
        selectedIndexCit == -1
      ) {
        //Get countrySelectedOnline Options (first time)

        dispatch(selectedCountryIndex(selectedIndexC));
        dispatch(
          countrySelectedOnline(CountriesOptionsOnline[selectedIndexC], "", 0)
        );
      }
      //Get online users based on country and city only
      else if (
        selectedIndex == -1 &&
        selectedIndexC != -1 &&
        selectedIndexCit != -1
      ) {
        //Get countryCitySelectedOnline Options (first time)
        //dispatch(countryCitySelectedOnline("EG", "3"));

        dispatch(selectedCountryIndex(selectedIndexC));
        dispatch(selectedCityIndex(selectedIndexCit));
        dispatch(
          countryCitySelectedOnline(
            CountriesOptionsOnline[selectedIndexC],
            CountryCitiesOptionsOnline[selectedIndexCit],
            "",
            0
          )
        );
      }

      //Get online users based on country and agerange only
      else if (
        selectedIndex != -1 &&
        selectedIndexC != -1 &&
        selectedIndexCit == -1
      ) {
        //Get countryCitiesAgerangeSelectedOnline Options click country --> ageRange (first time)
        dispatch(selectedCountryIndex(selectedIndexC));
        dispatch(selectedAgerangeIndex(selectedIndex));
        if (
          CountryAgerangesOptionsOnline.length != 0 &&
          AgerangeCountriesOptionsOnline.length == 0
        ) {
          dispatch(
            countryCitiesAgerangeSelectedOnline(
              CountriesOptionsOnline[selectedIndexC],
              CountryAgerangesOptionsOnline[selectedIndex],
              "",
              0
            )
          );
        } else {
          dispatch(
            countryCitiesAgerangeSelectedOnline(
              AgerangeCountriesOptionsOnline[selectedIndexC],
              ARRAY_OF_AGE_RANGE[selectedIndex].replace(/\s/g, ""),
              "",
              0
            )
          );
        }
      }
      //Get online users based on country and city and agerange
      else if (
        selectedIndex != -1 &&
        selectedIndexC != -1 &&
        selectedIndexCit != -1
      ) {
        dispatch(selectedCountryIndex(selectedIndexC));
        dispatch(selectedAgerangeIndex(selectedIndex));
        dispatch(selectedCityIndex(selectedIndexCit));
        if (
          CountryAgerangesOptionsOnline.length != 0 &&
          AgerangeCountriesOptionsOnline.length == 0
        ) {
          dispatch(
            countryCityAgerangeSelectedOnline(
              CountriesOptionsOnline[selectedIndexC],
              CountryCitiesOptionsOnline[selectedIndexCit],
              CountryAgerangesOptionsOnline[selectedIndex],
              "",
              0
            )
          );
        } else {
          dispatch(
            countryCityAgerangeSelectedOnline(
              AgerangeCountriesOptionsOnline[selectedIndexC],
              CountryCitiesAgerangeOptionsOnline[selectedIndexCit],
              ARRAY_OF_AGE_RANGE[selectedIndex].replace(/\s/g, ""),
              "",
              0
            )
          );
        }
      }
    } else if (optionValue == "most recent") {
      //without Agerange
      dispatch(resetStatesOffline());
      if (selectedIndex == -1) {
        if (selectedIndexC != -1 && selectedIndexCit == -1) {
          // Get Users based on country only

          dispatch(selectedCountryIndex(selectedIndexC));
          dispatch(
            countryRecentActiveUsers(
              CountriesOptionsOffline[selectedIndexC],
              "",
              "",
              0
            )
          );
        } else if (selectedIndexC != -1 && selectedIndexCit != -1) {
          // Get Users based on country and city
          dispatch(selectedCountryIndex(selectedIndexC));
          dispatch(selectedCityIndex(selectedIndexCit));
          dispatch(
            countryCityRecentActiveUsers(
              CountriesOptionsOffline[selectedIndexC],
              CountryCitiesOptionsOffline[selectedIndexCit],
              "",
              "",
              0
            )
          );
        }
      } else {
        // calc scoreH and scoreL from age range
        const { scoreL, scoreH } = calcSlShFromAgerange(
          ARRAY_OF_AGE_RANGE[selectedIndex]
        );
        dispatch(selectedAgerangeIndex(selectedIndex));
        dispatch(setAgeScores(scoreL, scoreH));

        if (selectedIndexC != -1 && selectedIndexCit == -1) {
          // Get Users based on country only
          dispatch(selectedCountryIndex(selectedIndexC));
          dispatch(
            countryRecentActiveUsers(
              CountriesOptionsOffline[selectedIndexC],
              scoreL,
              scoreH,
              0
            )
          );
        } else if (selectedIndexC != -1 && selectedIndexCit != -1) {
          // Get Users based on country and city
          dispatch(selectedCountryIndex(selectedIndexC));
          dispatch(selectedCityIndex(selectedIndexCit));
          dispatch(
            countryCityRecentActiveUsers(
              CountriesOptionsOffline[selectedIndexC],
              CountryCitiesOptionsOffline[selectedIndexCit],
              scoreH,
              scoreL,
              0
            )
          );
        }
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
                        ? CountryAgerangesOptionsOnline.length != 0
                          ? selectedIndex == -1
                            ? "Select Age Range"
                            : CountryAgerangesOptionsOnline[selectedIndex]
                          : selectedIndex == -1
                          ? "Select Age Range"
                          : ARRAY_OF_AGE_RANGE[selectedIndex]
                        : CountryCityAgerangesOptionsOnline.length != 0
                        ? selectedIndex == -1
                          ? "Select Age Range"
                          : CountryCityAgerangesOptionsOnline[selectedIndex]
                        : selectedIndex == -1
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
                    {CountryAgerangesOptionsOnline.length != 0 ? (
                      <InfiniteScroll
                        dataLength={CountryAgerangesOptionsOnline.length}
                        next={handleScrollAgerangeOnline}
                        height={100}
                        hasMore={!endOfResultOnAge}
                        loader={<CircularProgress />}
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
                            setSelectedIndex(-1);
                            setAnchorEl(null);
                          }}
                          className={classes.displayFlexSB}
                        >
                          <Typography variant="button" gutterBottom>
                            No Select
                          </Typography>
                        </MenuItem>
                        {CountryAgerangesOptionsOnline?.map((option, index) => (
                          <MenuItem
                            className={`${classes.displayFlexSB} ${classes.width}`}
                            key={option}
                            selected={index === selectedIndex}
                            onClick={event => handleMenuItemClick(event, index)}
                          >
                            <Typography variant="button" gutterBottom>
                              {option}
                            </Typography>
                            <Typography
                              variant="button"
                              color="primary"
                              gutterBottom
                            >
                              {CountryAgerangesOptionsOnlineCount[index]}
                            </Typography>
                          </MenuItem>
                        ))}
                      </InfiniteScroll>
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

                {selectedIndexC != -1 &&
                  selectedIndexCit != -1 &&
                  (CountryCityAgerangesOptionsOnline.length != 0 ? (
                    <InfiniteScroll
                      dataLength={
                        CountryCityAgerangesOptionsOnline.length
                        // CountryCityAgerangesOptionsOnline.length != 0
                        //   ? CountryCityAgerangesOptionsOnline.length
                        //   : 0
                      }
                      next={handleScrollAgerangeOnline}
                      height={100}
                      hasMore={!endOfResultOnAge}
                      loader={<CircularProgress />}
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
                          setSelectedIndex(-1);
                          setAnchorEl(null);
                        }}
                        className={classes.displayFlexSB}
                      >
                        <Typography variant="button" gutterBottom>
                          No Select
                        </Typography>
                      </MenuItem>
                      {CountryCityAgerangesOptionsOnline?.map(
                        (option, index) => (
                          <MenuItem
                            className={`${classes.displayFlexSB} ${classes.width}`}
                            key={option}
                            selected={index === selectedIndex}
                            onClick={event => handleMenuItemClick(event, index)}
                          >
                            <Typography variant="button" gutterBottom>
                              {option}
                            </Typography>
                            <Typography
                              variant="button"
                              color="primary"
                              gutterBottom
                            >
                              {CountryCityAgerangesOptionsOnlineCount[index]}
                            </Typography>
                          </MenuItem>
                        )
                      )}
                    </InfiniteScroll>
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
                  ))}
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

          {/* countries list Online*/}
          {optionValue == "active" && (
            // CountriesOptionsOnline.length != 0 &&
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
                      AgerangeCountriesOptionsOnline.length == 0
                        ? selectedIndexC == -1
                          ? "Select Country"
                          : CountriesOptionsOnline[selectedIndexC]
                        : selectedIndexC == -1
                        ? "Select Country"
                        : AgerangeCountriesOptionsOnline[selectedIndexC]
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
                <InfiniteScroll
                  dataLength={
                    AgerangeCountriesOptionsOnline.length != 0
                      ? AgerangeCountriesOptionsOnline.length
                      : CountriesOptionsOnline.length != 0
                      ? CountriesOptionsOnline.length
                      : 0
                  }
                  next={handleScrollCountriesOnline}
                  height={100}
                  hasMore={!endOfResultOnCo}
                  loader={<CircularProgress />}
                  // endMessage={
                  //   <p style={{ textAlign: "center" }}>
                  //     <b>end countries</b>
                  //   </p>
                  // }
                >
                  {selectedIndex != -1 && selectedIndexC == -1 && (
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
                          setSelectedIndexC(-1);
                          setAnchorElC(null);
                        }}
                        className={classes.displayFlexSB}
                      >
                        <Typography variant="button" gutterBottom>
                          No Select
                        </Typography>
                      </MenuItem>
                      {AgerangeCountriesOptionsOnline?.map((option, index) => (
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
                            {AgerangeCountriesOptionsOnlineCount[index]}
                          </Typography>
                        </MenuItem>
                      ))}
                    </div>
                  )}
                  {((selectedIndex == -1 && selectedIndexC == -1) ||
                    (selectedIndex != -1 &&
                      selectedIndexC != -1 &&
                      AgerangeCountriesOptionsOnline.length == 0) ||
                    (selectedIndex == -1 && selectedIndexC != -1)) && (
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
                          setSelectedIndexC(-1);
                          setAnchorElC(null);
                        }}
                        className={classes.displayFlexSB}
                      >
                        <Typography variant="button" gutterBottom>
                          No Select
                        </Typography>
                      </MenuItem>

                      {CountriesOptionsOnline?.map((option, index) => (
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
                            {CountriesOptionsOnlineCount[index]}
                          </Typography>
                        </MenuItem>
                      ))}
                    </div>
                  )}

                  {selectedIndex != -1 &&
                    selectedIndexC != -1 &&
                    AgerangeCountriesOptionsOnline.length != 0 && (
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
                            setSelectedIndexC(-1);
                            setAnchorElC(null);
                          }}
                          className={classes.displayFlexSB}
                        >
                          <Typography variant="button" gutterBottom>
                            No Select
                          </Typography>
                        </MenuItem>
                        {AgerangeCountriesOptionsOnline?.map(
                          (option, index) => (
                            <MenuItem
                              key={option}
                              selected={index === selectedIndexC}
                              onClick={event =>
                                handleMenuItemClickC(event, index)
                              }
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
                                {AgerangeCountriesOptionsOnlineCount[index]}
                              </Typography>
                            </MenuItem>
                          )
                        )}
                      </div>
                    )}
                </InfiniteScroll>
              </Menu>
            </div>
          )}

          {/* Contries list Offline  */}
          {optionValue == "most recent" && CountriesOptionsOffline.length != 0 && (
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
                      CountriesOptionsOffline
                        ? selectedIndexC == -1
                          ? "Select Country"
                          : // ? CountriesOptionsOffline.list_of_results[
                            //     selectedIndexCOf + 1
                            //   ]
                            CountriesOptionsOffline[selectedIndexC]
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
                <InfiniteScroll
                  dataLength={CountriesOptionsOffline.length}
                  next={handleScrollCountriesOffline}
                  height={100}
                  hasMore={!endOfResultCo}
                  loader={<CircularProgress />}
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
                  {CountriesOptionsOffline?.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndexC}
                      onClick={event => handleMenuItemClickC(event, index)}
                      className={classes.displayFlexSB}
                    >
                      <Typography variant="button" gutterBottom>
                        {option}
                      </Typography>
                      <Typography variant="button" color="primary" gutterBottom>
                        {CountriesOptionsOfflineCount[index]}
                      </Typography>
                    </MenuItem>
                  ))}
                </InfiniteScroll>
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
                        ? CountryCitiesOptionsOnline.length != 0
                          ? selectedIndexCit == -1
                            ? "select City"
                            : COUNTRY_CITY_MAP[
                                CountriesOptionsOnline[
                                  selectedIndexC
                                ].toLowerCase()
                              ][
                                CountryCitiesOptionsOnline[selectedIndexCit] - 1
                              ]
                          : "select City"
                        : //else index!=0
                        CountryCitiesAgerangeOptionsOnline.length != 0
                        ? CountriesOptionsOnline.length != 0
                          ? selectedIndexCit == -1
                            ? "Select City"
                            : COUNTRY_CITY_MAP[
                                CountriesOptionsOnline[
                                  selectedIndexC
                                ].toLowerCase()
                              ][
                                CountryCitiesOptionsOnline[selectedIndexCit] - 1
                              ]
                          : AgerangeCountriesOptionsOnline.length != 0
                          ? selectedIndexCit == -1
                            ? "Select City"
                            : COUNTRY_CITY_MAP[
                                AgerangeCountriesOptionsOnline[
                                  selectedIndexC
                                ].toLowerCase()
                              ][
                                CountryCitiesAgerangeOptionsOnline[
                                  selectedIndexCit
                                ] - 1
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
                  <InfiniteScroll
                    dataLength={CountryCitiesOptionsOnline.length}
                    next={handleScrollCitiesOnline}
                    height={100}
                    hasMore={!endOfResultOnCi}
                    loader={<CircularProgress />}
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
                        setSelectedIndexCit(-1);
                        setAnchorElCit(null);
                      }}
                      className={classes.displayFlexSB}
                    >
                      <Typography variant="button" gutterBottom>
                        No Select
                      </Typography>
                    </MenuItem>
                    {CountryCitiesOptionsOnline?.map((option, index) => (
                      <MenuItem
                        key={option}
                        value={option}
                        //label={value}
                        selected={index === selectedIndexCit}
                        onClick={event => handleMenuItemClickCit(event, index)}
                        className={classes.displayFlexSB}
                      >
                        <Typography variant="button" gutterBottom>
                          {
                            COUNTRY_CITY_MAP[
                              CountriesOptionsOnline[
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
                          {CountryCitiesOptionsOnlineCount[index]}
                        </Typography>
                      </MenuItem>
                    ))}
                  </InfiniteScroll>
                )}
                {selectedIndexC != -1 &&
                  selectedIndex != -1 &&
                  (AgerangeCountriesOptionsOnline.length == 0 ? (
                    <InfiniteScroll
                      dataLength={CountryCitiesAgerangeOptionsOnline.length}
                      next={handleScrollCitiesOnline}
                      height={100}
                      hasMore={!endOfResultOnCi}
                      loader={<CircularProgress />}
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
                          setSelectedIndexCit(-1);
                          setAnchorElCit(null);
                        }}
                        className={classes.displayFlexSB}
                      >
                        <Typography variant="button" gutterBottom>
                          No Select
                        </Typography>
                      </MenuItem>
                      {CountryCitiesAgerangeOptionsOnline?.map(
                        (option, index) => (
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
                                  CountriesOptionsOnline[
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
                              {CountryCitiesAgerangeOptionsOnlineCount[index]}
                            </Typography>
                          </MenuItem>
                        )
                      )}
                    </InfiniteScroll>
                  ) : (
                    //countries from agerange
                    <InfiniteScroll
                      dataLength={CountryCitiesAgerangeOptionsOnline.length}
                      next={handleScrollCitiesOnline}
                      height={100}
                      hasMore={!endOfResultOnCi}
                      loader={<CircularProgress />}
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
                          setSelectedIndexCit(-1);
                          setAnchorElCit(null);
                        }}
                        className={classes.displayFlexSB}
                      >
                        <Typography variant="button" gutterBottom>
                          No Select
                        </Typography>
                      </MenuItem>
                      {CountryCitiesAgerangeOptionsOnline?.map(
                        (option, index) => (
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
                                  AgerangeCountriesOptionsOnline[
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
                              {CountryCitiesAgerangeOptionsOnlineCount[index]}
                            </Typography>
                          </MenuItem>
                        )
                      )}
                    </InfiniteScroll>
                  ))}
              </Menu>
            </div>
          )}

          {/* Cities list Offline */}
          {optionValue == "most recent" &&
            CountryCitiesOptionsOffline.length != 0 &&
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
                            ? "Select City"
                            : COUNTRY_CITY_MAP[
                                CountriesOptionsOffline[
                                  selectedIndexC
                                ].toLowerCase()
                              ][
                                CountryCitiesOptionsOffline[selectedIndexCit] -
                                  1
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
                  <InfiniteScroll
                    dataLength={CountryCitiesOptionsOffline.length}
                    next={handleScrollCitiesOffline}
                    height={150}
                    hasMore={!endOfResultCi}
                    loader={<CircularProgress />}
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
                        {/* apply scroll  */}

                        {CountryCitiesOptionsOffline?.map((option, index) => (
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
                                  CountriesOptionsOffline[
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
                              {CountryCitiesOptionsOfflineCount[index]}
                            </Typography>
                          </MenuItem>
                        ))}
                      </div>
                    )}
                  </InfiniteScroll>
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
