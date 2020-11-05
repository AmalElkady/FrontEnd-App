import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { allCountriesOnline } from "../actions/Home";
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
  displayFlex: {
    display: "flex",
    justifyContent: "space-around"
  },
  margintop: {
    marginTop: "1.5rem"
  }
}));

const AgeOptions = [
  "18 - 25",
  "26 - 33",
  "34 - 41",
  "42 - 49",
  "50 - 57",
  "58 - 65",
  "66 - 73",
  "74 - 81",
  "82 - 89"
];
// const CountriesOptionsOnline = [
//   "Egypt  30",
//   "Morcoo 20",
//   "Kuwait 10",
//   "France 10",
//   "Turkey 5",
//   "India  5"
// ];

const CountriesOptionsOfline = [
  "canada  30",
  "Italy 20",
  "Tunisia 10",
  "Oman 10"
];
const ITEM_HEIGHT = 48;

export default function Search() {
  const classes = useStyles();
  // const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElC, setAnchorElC] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexC, setSelectedIndexC] = useState(0);

  const CountriesOptionsOnline = useSelector(
    state => state.home.allCountriesOnline
  );
  const dispatch = useDispatch();

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget);
  };
  //for Countries
  const handleClickListItemC = event => {
    setAnchorElC(event.currentTarget);
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

  const handleClose = () => {
    setAnchorEl(null);
  };

  //for Countries
  const handleCloseC = () => {
    setAnchorElC(null);
  };

  useEffect(() => {
    dispatch(allCountriesOnline());
  }, []);

  return (
    <>
      <Card className={classes.root}>
        <form
          className={classes.displayFlex}
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
                  secondary={AgeOptions[selectedIndex]}
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
              {AgeOptions.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={event => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
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
                      CountriesOptionsOnline.list_of_results[selectedIndexC]
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
                <Typography variant="h6" gutterBottom>
                  ONLINE
                </Typography>
                {CountriesOptionsOnline.list_of_results?.map(
                  (option, index) =>
                    index % 2 === 0 && (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndexC}
                        onClick={event => handleMenuItemClickC(event, index)}
                      >
                        {option}
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
