import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  allCountriesOnline,
  countryCitiesOnline,
  countryAgerangesOnline,
  agerangeCountriesOnline
} from "../actions/Home";
import { COUNTRY_CITY_MAP, ARRAY_OF_AGE_RANGE } from "../util/data";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
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
    margin: "2rem auto"
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
    justifyContent: "space-around"
  },
  displayFlexSB: {
    display: "flex",
    justifyContent: "space-between"
  },
  margintop: {
    marginTop: "1.5rem"
  },
  padding: {
    padding: ".5rem"
  },
  width: {
    width: "10rem"
  }
}));

const CountriesOptionsOfline = [
  "canada  30",
  "Italy 20",
  "Tunisia 10",
  "Oman 10"
];
const ITEM_HEIGHT = 48;

export default function Search() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElC, setAnchorElC] = useState(null);
  const [anchorElCit, setAnchorElCit] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedIndexC, setSelectedIndexC] = useState(-1);
  const [selectedIndexCit, setSelectedIndexCit] = useState(-1);

  //AgeRanges
  const CountryAgerangesOptionsOnline = useSelector(
    state => state.home.countryAgerangesOnline
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
    dispatch(allCountriesOnline());
  }, []);
  useEffect(() => {
    // Get Cities based on Country without ageRange
    if (selectedIndexC != -1 && selectedIndex == -1) {
      dispatch(
        countryCitiesOnline(
          CountriesOptionsOnline.list_of_results[selectedIndexC]
        )
      );
    }
    // Get Cities based on Country and ageRange
    else if (selectedIndexC != -1 && selectedIndex != -1) {
    }

    if (CountriesOptionsOnline.list_of_results != null && selectedIndex == -1) {
      // Get AgeRanges based on Country
      dispatch(
        countryAgerangesOnline(
          CountriesOptionsOnline.list_of_results[selectedIndexC]
        )
      );
    }
  }, [selectedIndexC]);

  useEffect(() => {
    if (selectedIndexC == -1 && selectedIndex != -1) {
      // Get countries based on agerange
      dispatch(
        agerangeCountriesOnline(
          ARRAY_OF_AGE_RANGE[selectedIndex].replace(/\s/g, "")
        )
      );
    }
  }, [selectedIndex]);

  return (
    <>
      {console.log(
        "AgerangeCountriesOptionsOnline get countries age search component ",
        AgerangeCountriesOptionsOnline
      )}
      <Card className={classes.root}>
        <form
          className={classes.displayFlexSA}
          onKeyPress={event => {
            if (event.key === "Enter") {
            }
          }}
        >
          {/* Age Range  */}
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
                        ? ARRAY_OF_AGE_RANGE[selectedIndex + 1]
                        : ARRAY_OF_AGE_RANGE[selectedIndex]
                      : CountryAgerangesOptionsOnline.list_of_results
                      ? selectedIndex == -1
                        ? CountryAgerangesOptionsOnline.list_of_results[
                            selectedIndex + 1
                          ]
                        : CountryAgerangesOptionsOnline.list_of_results[
                            selectedIndex
                          ]
                      : ""
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
              {selectedIndexC == -1 &&
                ARRAY_OF_AGE_RANGE.map((option, index) => (
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
              {selectedIndexC != -1 && selectedIndex == -1 && (
                <div>
                  {" "}
                  <Typography
                    variant="h6"
                    className={classes.padding}
                    gutterBottom
                  >
                    ONLINE
                  </Typography>
                  {CountryAgerangesOptionsOnline.list_of_results?.map(
                    (option, index) =>
                      index % 2 == 0 && (
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
                            {
                              CountryAgerangesOptionsOnline.list_of_results[
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

          {/* contries list */}
          {CountriesOptionsOnline.list_of_results && (
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
                          ? CountriesOptionsOnline.list_of_results[
                              selectedIndexC + 1
                            ]
                          : CountriesOptionsOnline.list_of_results[
                              selectedIndexC
                            ]
                        : selectedIndexC == -1
                        ? AgerangeCountriesOptionsOnline.list_of_results[
                            selectedIndexC + 1
                          ]
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
                {selectedIndex != -1 &&
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
                {selectedIndex == -1 &&
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

                {/* <Typography variant="h6" gutterBottom>
                  MOST RECENT
                </Typography>
                {CountriesOptionsOfline.map((option, index) => (
                  <MenuItem
                    key={option}
                    selected={index === selectedIndexC}
                    onClick={event => handleMenuItemClickC(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))} */}
              </Menu>
            </div>
          )}

          {/* Cities list */}
          {selectedIndexC >= 0 &&
            CountryCitiesOptionsOnline.list_of_results != null && (
              <div className={classes.menu}>
                <List component="nav" aria-label="Countries">
                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu2"
                    aria-label="Countries"
                    onClick={handleClickListItemCit}
                  >
                    <ListItemText
                      primary="Cities"
                      secondary={
                        selectedIndexCit == -1 &&
                        CountryCitiesOptionsOnline.list_of_results
                          ? COUNTRY_CITY_MAP[
                              CountriesOptionsOnline.list_of_results[
                                selectedIndexC
                              ].toLowerCase()
                            ][
                              CountryCitiesOptionsOnline.list_of_results[
                                selectedIndexCit + 1
                              ] - 1
                            ]
                          : COUNTRY_CITY_MAP[
                              CountriesOptionsOnline.list_of_results[
                                selectedIndexC
                              ].toLowerCase()
                            ][
                              CountryCitiesOptionsOnline.list_of_results[
                                selectedIndexCit
                              ] - 1
                            ]
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
                  <Typography
                    variant="h6"
                    className={classes.padding}
                    gutterBottom
                  >
                    ONLINE
                  </Typography>
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
                </Menu>
              </div>
            )}

          <div className={classes.margintop}>
            <Button
              onClick={() => {
                showAuthLoader();
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
