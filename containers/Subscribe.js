import React, { useState,useEffect  } from "react";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "50%",
  },
}));



export default function Subscribe() {
const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(1);

  const [selectedValue, setSelectedValue] = useState('1 month');

  const handleChangeSub = (event) => {
      console.log("selected value ",event.target.value );
    setSelectedValue(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >

         {/*FREE  */}

          <Tab label={
                <FormControlLabel
          value="Free"
          control={<Radio checked={selectedValue === 'free'}
         onChange={handleChangeSub} color="primary"
         value="free"
         name="radio-button-demo"
         inputProps={{ 'aria-label': 'Free' }}
          />}
          label="Free"
        />}   
       {...a11yProps(0)}/>

       {/* 1 MONTH */}
          <Tab label={
           <FormControlLabel
          value="Free"
          control={
          <Radio
        checked={selectedValue === '1 month'}
        onChange={handleChangeSub}
        color="primary"
        value="1 month"
        name="radio-button-demo"
        inputProps={{ 'aria-label': '1 Month' }}
      />}
          label="1 Month"
        />} {...a11yProps(1)} />

        {/* 3 MONTH */}
          <Tab label={
           <FormControlLabel
          value="3 month"
          control={
          <Radio
        checked={selectedValue === '3 months'}
        onChange={handleChangeSub}
        color="primary"
        value="3 months"
        name="radio-button-demo"
        inputProps={{ 'aria-label': '3 Months' }}
      />} label="3 Months"
        />} 
         {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
         Free
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
         1 Month
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          3 Months
        </TabPanel>
      </SwipeableViews>
    </div>
    </>
  );
}
