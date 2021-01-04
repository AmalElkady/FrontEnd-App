import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IntlMessages from "../util/IntlMessages";
import Box from "@material-ui/core/Box";
import Router from "next/router";
import Grid from '@material-ui/core/Grid';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



import {
  hideMessage,
  showAuthLoader,
  userAddSubscribe,
  subFlagClear,
  userSignOut
} from "../actions/Auth";

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
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: "auto",
    position:"relative" ,
    marginTop:"5rem",
    padding: "0 1rem",
    textAlign:"center"
  }
}));

export default function Subscribe() {
  const subFlag = useSelector(state => state.auth.subFlag);
  const showMessage = useSelector(state => state.auth.showMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        hideMessage();
      }, 3000);
    }
    if (subFlag == true) {
      showAuthLoader();
      setTimeout(() => {
        subFlagClear();
        Router.replace("/home/content");
      }, 300);
    }
  });

  const onSubscribe = () => {
    showAuthLoader();
    dispatch(userAddSubscribe(selectedValue));
  };

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(1);

  const [selectedValue, setSelectedValue] = useState("1");

  const handleChangeSub = event => {
    setSelectedValue(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };
  const handleChange2 = (event) => {
    setValue(event.target.value);
  };



  return (
    <>
     <div className="container">

      <div className={classes.root}> 
 <Button
          variant="contained"
          onClick={() => {
            this.props.showAuthLoader();
            this.props.userSignOut();
          }}
          color="primary"
          className="linear-g-r out-btn-1"
        >
          <IntlMessages id="appModule.signOut" />
        </Button>
		
 
 
 
 
 
 <FormControl component="fieldset" style={{minWidth:"70%"}}>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange2}>
        <FormControlLabel value="0" className={selectedValue === "0"?"active-aim sub-option linear-g" :" sub-option linear-g"} control={<Radio value="0"  checked={selectedValue === "0"}  onChange={handleChangeSub} className="d-none"/>} label={
<>
<Grid container spacing={12} >
				    <Grid item xs={9}>
            <Grid item xs={12}>
            <h2 style={{color:"white"}}>
            <IntlMessages id="subscription.free"/>
            </h2>
            </Grid>
             <Grid item xs={12}>
                    <p style={{color:"white"}}>
                   <IntlMessages id="subscription.freeOption"/>
                    </p>
					      </Grid>  
					</Grid>
					<Grid item xs={3} className="d-f-reverse">

           <img style={{width:"100%"}} src="../static/images/icons/Free_Subscription_icon.svg"
                     alt="free" title="free"/> 
					</Grid>
				</Grid>

    <Grid container spacing={12} style={{marginTop: "1rem"}} >
				   <Button
           disabled={selectedValue === "0"?false:true}
        variant="contained"
       onClick={() => {
                onSubscribe();
              }}
        color="primary"
        className={selectedValue === "0"?"btn-sub-active":"btn-sub-non-active"}
      >
        <IntlMessages id="subscription.sub" />
      </Button>
				</Grid>    
</>
        } />

        <FormControlLabel value="1"  className={selectedValue === "1"?"active-aim sub-option linear-g" :" sub-option linear-g"} control={<Radio value="1"  checked={selectedValue === "1"} onChange={handleChangeSub} className="d-none"/>}
         label={
          
       <>
       <div style={{position:"relative"}}>
        <div className="best-v">
        <img style={{width:"100%"}} src="../static/images/icons/Best_Value_Icon.svg"
                     alt="free" title="free"/> 
        </div>
       <Grid container spacing={12} style={{borderBottom: ".1px solid #ffffff4d"}} >

        <Grid item xs={9}>
				      <Grid item xs={12} className="grid-s-1">
                    <h3 style={{color:"white"}}>
                    <IntlMessages id="subscription.trial"/>
                   
                    </h3>
					    </Grid>
              <Grid item xs={12} className="grid-s-1">
                 <img style={{width:"10%"}} src="../static/images/icons/plus.svg"
                     alt="plus" title="plus"/> 
					     </Grid>
               <Grid item xs={12}>
                    <h2 style={{color:"white"}}>
                    <IntlMessages id="subscription.3month"/>
                    </h2>
					      </Grid>

               <Grid item xs={12}>
                    <p style={{color:"white"}}>
                   <IntlMessages id="subscription.1monthOption1"/>
                    <br/>
                    <IntlMessages id="subscription.1monthOption2"/>
                    </p>
					      </Grid>  
            
				</Grid>  
				
        <Grid item xs={3} className="d-f-reverse">
           <img style={{width:"100%"}} src="../static/images/icons/Active_Gila_icon.svg"
                     alt="active_gila" title="active_gila"/> 
					</Grid>
			</Grid>
      <Grid container spacing={12} style={{marginTop: "1rem"}} >
           <Grid item xs={4} style={{padding: ".5rem"}} >
            <h2 style={{color:"white"}}>
            <IntlMessages id="subscription.3monthCost"/>
            </h2>
          </Grid>
           <Grid item xs={8} style={{padding: ".5rem"}} >
				   <Button
            disabled={selectedValue === "1"?false:true}
        variant="contained"
        onClick={() => {
                onSubscribe();
              }}
        color="primary"
        className={selectedValue === "1"?"btn-sub-active":"btn-sub-non-active"}
        style={{width: "100%"}} 
           >
        <IntlMessages id="subscription.sub" />
           </Button>
			</Grid>    
      </Grid>
</div>

</>
        } >
        </FormControlLabel>
        <FormControlLabel value="2"  className={selectedValue === "2"?"active-aim sub-option linear-g" :" sub-option linear-g"} control={<Radio value="2"   checked={selectedValue === "2"} onChange={handleChangeSub} className="d-none"/>} label={
        <>  
   <Grid container spacing={12} style={{borderBottom: ".1px solid #ffffff4d"}} >

        <Grid item xs={9}>
				      <Grid item xs={12} className="grid-s-1">
                    <h3 style={{color:"white"}}>
                    <IntlMessages id="subscription.trial"/>
                    </h3>
					    </Grid>
             <Grid item xs={12} className="grid-s-1">
                 <img style={{width:"10%"}} src="../static/images/icons/plus.svg"
                     alt="plus" title="plus"/> 
					     </Grid>
               <Grid item xs={12}>
                    <h2 style={{color:"white"}}>
                    <IntlMessages id="subscription.1month"/>
                    </h2>
					      </Grid>

               <Grid item xs={12}>
                    <p style={{color:"white"}}>
                    <IntlMessages id="subscription.1monthOption1"/>
                    <br/>
                    <IntlMessages id="subscription.1monthOption2"/>
                    </p>
					      </Grid>  
            
				</Grid>  
				
        <Grid item xs={3} className="d-f-reverse">
           <img style={{width:"100%"}} src="../static/images/icons/Active_Gila_icon.svg"
                     alt="active_gile" title="active_gile"/> 
					</Grid>
			</Grid>
      <Grid container spacing={12} style={{marginTop: "1rem"}} >
           <Grid item xs={4} style={{padding: ".5rem"}} >
            <h2 style={{color:"white"}}>
            <IntlMessages id="subscription.1monthCost"/>
            </h2>
          </Grid>
           <Grid item xs={8} style={{padding: ".5rem"}} >
				   <Button
        variant="contained"
         disabled={selectedValue === "2"?false:true}
      onClick={() => {
                onSubscribe();
              }}
        color="primary"
       className={selectedValue === "2"?"btn-sub-active":"btn-sub-non-active"}
        style={{width: "100%"}} 
           >
        <IntlMessages id="subscription.sub" />
           </Button>
			</Grid>    
      </Grid>
</>
        } />
      </RadioGroup>
    </FormControl>


      </div>
      </div>
    </>
  );
}
