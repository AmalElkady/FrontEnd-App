import React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Link from "next/link"
import Router from "next/router"
import IntlMessages from '../util/IntlMessages';
import { styled } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Male, Female } from "react-gender";
import ReCAPTCHA from "react-google-recaptcha";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import ModalSettings from "../components/Modals/modalSettings";

import {ARRAY_OF_YEARS ,ARRAY_OF_MONTHS, ARRAY_OF_DAYS, COUNTRY_CITY_MAP, COUNTRY_CITY_MAP_VALUE, ARRAYS_OF_MARTIAL_STATUS, ARRAYS_OF_MARTIAL_STATUS_VALUES,ARRAYS_OF_TERMS} from '../util/data';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'



import {
  hideMessage,
  showAuthLoader,
  userSignUp,
  userCreateClear,
  hideAuthLoader,
  userSignIn,
  formSwitch
} from '../actions/Auth';

import {
	openModal
  } from "../actions/Profile";


class SignUp extends React.Component {
  constructor() {
	super();
    this.state = {
      firstname: '',
	  lastname: '',
	  gender: '5',
	  martial: '',
	  country: '20',
	  countryiso2: 'eg',
      phone: '',
	  city: '',
	  day: '',
 	  month: '',
 	  year: '',
      password: '',
	  password_confirm: '',
      terms:{
		0: false
	  }
    }
  }


  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
    if (this.props.authUser !== null) {
	   
		NotificationManager.success(<IntlMessages id="appModule.createSuccess"/>);
		this.props.userCreateClear();
		this.props.showAuthLoader();
		
		setTimeout(() => {
		   this.props.hideAuthLoader();
		    //Router.replace('/signin');
			console.log("login direct")
		   this.props.userSignIn({
                          phone: this.state.phone,
                          password:this.state.password,
                          country: this.state.country
                        });
		   Router.replace('/home/content');
		  // Router.replace('/verifyemail');
     }, 300);
    }
  }

  onChange(value) {
    console.log("Captcha value:", value);
  }
  render() {
    const {
      firstname,
	  lastname,
	  gender,
	  martial,
	  country,
	  countryiso2,
      phone,
	  city,
	  day,
 	  month,
 	  year,
      password,
	  password_confirm,
	  terms
    } = this.state;
	
	
	
//	"name" : "Karem Mohammed",
//	"phone" : "01155778899",
//	"phonecountrycode": "20",
//  "countryiso2" : "eg" //countryCode
//	"gender": "1",
//	"password" : "Password#123",
//	"year" : "1997",
//	"month" : "07",
//	"day" : "01",
//	"city": "2",
//	"martial":"0"

  //const [value, setValue] = React.useState('female');
		const StyledFormControl = styled(FormControl)({
		  formControl: {
			margin: 2,
			'& select': {
				paddingRight: "22px",
			},
			
		  },
		  selectEmpty: {
			marginTop: 0,
		  },

		});



  const handleChange = (event) => {
    this.setState({[`${event.target.name}`] : `${event.target.value}`})
  };

  const handleChangeTerms = event => {
    console.log(
      "clicked terms ",
      event.target.name,
      event.target.checked,
      terms
    );
//	setReason({ ...reason, [event.target.name]: event.target.checked });
	this.setState({terms:{ ...terms, [event.target.name]: event.target.checked }})
  };

  const checkTermsValues = () => {
    for (var i in terms) {
      if (terms[i] != true) {
        return false;
      }
    }
    return true;
  };

    const {showMessage, loader, alertMessage} = this.props;
	
    return (
      <div
        className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3 app-register-container">
        <div className="app-login-main-content app-login-main-content-2">
          {/* <div className="app-logo-content d-flex align-items-center justify-content-center linear-g">
            <Link href="/">
                    <a> <img src="../static/images/Gila_Final_Logo_White.svg"
                     alt="App" title="App"/> </a>
            </Link>
          </div> */}

          <div className="app-login-content app-login-content-2">
            <div className="app-login-header">
              <h2><IntlMessages id="appModule.createAccount"/></h2>
            </div>

            <div className="app-login-form">
              <form method="post" action="/">
       
				<Grid container spacing={12} >
				    <Grid item xs={6} className="grid-width-1" >
						<TextField
						  type="text"
						  label={<IntlMessages id="inputLabel.firstName"/>}
						  onChange={(event) => this.setState({firstname: event.target.value})}
						  fullWidth
						  defaultValue={firstname}
						  margin="normal"
						  className="mt-2 mb-2 to-right"
						/>
					</Grid>
					<Grid item xs={6} className="grid-width-1"  >
						<TextField
						  type="text"
						  label={<IntlMessages id="inputLabel.surName"/>}
						  onChange={(event) => this.setState({lastname: event.target.value})}
						  fullWidth
						  defaultValue={lastname}
						  margin="normal"
						  className="mt-2 mb-2 to-right"
						/>
					</Grid>
				</Grid>
				
				<Grid container spacing={12}>
					<Grid container spacing={12} style={{ marginTop: "1rem"}}>
						<InputLabel id="phone-label"  style={{ paddingBottom: "7px"}} ><IntlMessages id="appModule.phone"/></InputLabel>
						<PhoneInput
						  onlyCountries={['gb', 'us', 'fr','de','eg','ma','sa','dz','bh','kw','tn','ae','my','mr','af']}
						  countryCodeEditable={false}
						  country={'eg'}
						  value={this.state.country}
						  placeholder={''}
						  readonly={'readonly'}
						  onChange={(value, country, e, formattedValue) => {this.setState({ country: country.dialCode, countryiso2: country.countryCode }); this.setState({ phone: value.slice(country.dialCode.length) });}}
						/>	
					</Grid>
					
					<Grid container spacing={12} style={{ marginTop: "15px"}}>
						<FormControl component="fieldset">
						  <FormLabel component="legend"><IntlMessages id="inputLabel.gender"/></FormLabel>
						  <RadioGroup aria-label="gender" name="gender" value={gender} onChange={handleChange}>
							<FormControlLabel style={{marginBottom:"0.5rem"}} value="0" className="gender-selected" control={<Radio />} label={<> <Female color="#d61f5f" width="1.5rem"  height="3rem"/> <IntlMessages id="inputGender.female"/></>} />
							<FormControlLabel value="1" className="gender-selected" control={<Radio />} label={<> <Male color="#d61f5f"  width="1.5rem"  height="3rem"/><IntlMessages id="inputGender.male"/></>} />
						  </RadioGroup>
						</FormControl>
					</Grid>
 
				</Grid>
				
				
				<Grid container style={{ marginTop: "15px"}}>
                  <InputLabel id="birthday-label"><IntlMessages id="inputLabel.birthday"/></InputLabel>	
				</Grid>
				
				
				<Grid container spacing={12}>
				
				  <Grid item xs={3} className="grid-width-2">
				   <StyledFormControl className="sub-select to-right">
					<InputLabel id="day-label"><IntlMessages id="inputLabel.day"/></InputLabel>
					<Select
					  labelId="day-label"
					  id="day"
					  value={day}
					  onChange={handleChange}
					  name="day"
					>
					
							{ARRAY_OF_DAYS.map((value) => (
									  <MenuItem
										key={parseInt(value)}
										value={value}
										control={<Radio />}
										label={value}>
											{value}
									  </MenuItem>
									))}
									
					</Select>
					</StyledFormControl>
				</Grid>
					
					
			  <Grid item xs={3} className="grid-width-2">
					<StyledFormControl className="sub-select to-right" >
					<InputLabel id="month-label"><IntlMessages id="inputLabel.month"/></InputLabel>
					<Select
					  labelId="month-label"
					  id="month"
					  value={month}
					  onChange={handleChange}
					   name="month"
					>
					
							{ARRAY_OF_MONTHS.map((value,index) => (
									  <MenuItem
										key={index}
										value={ (index+1) > 9 ? `${(index+1)}` : `0${(index+1)}`}
										control={<Radio />}
										label= {value}>
											{value}
									  </MenuItem>
									))}
									
					</Select>
					</StyledFormControl>
			 </Grid>
					
					
			  <Grid item xs={3} className="grid-width-2">
					<StyledFormControl className="sub-select to-right">
					<InputLabel id="year-label"><IntlMessages id="inputLabel.year"/></InputLabel>
					<Select
					  labelId="year-label"
					  id="year"
					  value={year}
					  onChange={handleChange}
					   name="year"
					>
					
							{ARRAY_OF_YEARS.map((value) => (
									  <MenuItem
										key={value}
										value={value.toString()}
										control={<Radio />}
										label={value.toString()}>
											{value.toString()}
									  </MenuItem>
									))}
									
					</Select>					
				  </StyledFormControl>
			 </Grid>
				
			</Grid>
				

			<Grid container spacing={12}>
			
						<Grid item xs={3} className="grid-width-1">
							
											  <StyledFormControl  className="sub-select to-right">
												<InputLabel id="city-label"><IntlMessages id="inputLabel.city"/></InputLabel>
												<Select
												  labelId="city-label"
												  id="city"
												  value={city}
												  onChange={handleChange}
												  name="city"
												>
													{console.log("this.state.countryiso2 ",this.state.countryiso2)}
												
														{COUNTRY_CITY_MAP[this.state.countryiso2].map((value,i) => (
																  <MenuItem
																	key={COUNTRY_CITY_MAP_VALUE[this.state.countryiso2][i]}
																	value={COUNTRY_CITY_MAP_VALUE[this.state.countryiso2][i]}
																	control={<Radio />}
																	label={value}>
																		{value}
																  </MenuItem>
																))}
																
												</Select>
												</StyledFormControl>
						
						</Grid>
						
						<Grid item xs={3} className="grid-width-1" >
						
									{(this.state.gender==0||this.state.gender==1)&&		  
									<StyledFormControl  className="sub-select to-right">
												<InputLabel id="martial-label"><IntlMessages id="inputLabel.martial"/></InputLabel>
												<Select
												  labelId="martial-label"
												  id="martial"
												  value={martial}
												  onChange={handleChange}
												  name="martial"
												  
												>
												
														{ARRAYS_OF_MARTIAL_STATUS[this.state.gender].map((value,i) => (
																  <MenuItem
																	key={ARRAYS_OF_MARTIAL_STATUS_VALUES[this.state.gender][i]}
																	value={ARRAYS_OF_MARTIAL_STATUS_VALUES[this.state.gender][i]}
																	control={<Radio />}
																	label={value}>
																		{value}
																  </MenuItem>
																))}
																
												</Select>
												</StyledFormControl>
									}
					</Grid>					
			</Grid>				


		
		
			<Grid container spacing={12}>
			
						<Grid item xs={6} className="grid-width-1" >
							<TextField
							  type="password"
							  onChange={(event) => this.setState({password: event.target.value})}
							  label={<IntlMessages id="inputLabel.password"/>}
							  fullWidth
							  defaultValue={password}
							  margin="normal"
							  className="mt-0 mb-3 to-right"
							/>
						</Grid>
						
						<Grid item xs={6} className="grid-width-1" >
							<TextField
							  type="password"
							  onChange={(event) => this.setState({password_confirm: event.target.value})}
							  label={<IntlMessages id="inputLabel.passwordConfirm"/>}
							  fullWidth
							  defaultValue={password_confirm}
							  margin="normal"
							  className="mt-0 mb-3 to-right"
							/>
						</Grid>	
						<Grid item xs={12}>
                      {/* <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={this.onChange}
                        className="not-robot"
					  /> */}
					     <FormGroup>
                            {/* {ARRAYS_OF_TERMS.map((value, i) => ( */}
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={terms[0]}
                                    onChange={handleChangeTerms}
                                    name={0}
                                  />
                                }
                                label={<><IntlMessages id="singup.term1"/> <Link href="/home/privacyStatements"><a className="prepend-icon link-1"><IntlMessages id="sidebar.privacyStatements"/></a></Link><IntlMessages id="singup.term2"/>  <Link href="/home/termsAndConditions"><a className="prepend-icon link-1"><IntlMessages id="sidebar.termsConditions"/></a></Link></>}
                              />
                            {/* ))} */}
                          </FormGroup>
                    </Grid>
                  					
			</Grid>
			
			
			
			{/* d-flex align-items-center justify-content-between */}
			
                <div>
                 {phone!=''&& password!=''&& firstname!=''&& lastname!=''&& country!=''&&countryiso2!=''&& gender!='5'&& year!=''&& month!=''&& day!=''&& city!=''&& martial!=''&& password_confirm!=''&&  checkTermsValues() && <Button variant="contained" onClick={() => {
					  if(password != password_confirm){ NotificationManager.error(<IntlMessages id="error.passMis" />)}
                      else {
				    //  this.props.showAuthLoader();
					//   this.props.userSignUp({phone, password, firstname, lastname, country,countryiso2, gender, year, month, day, city, martial});
					this.props.openModal(true)
					
					}
                  }} color="primary" style={{width: "100%"}} className="linear-g-r">
                    <IntlMessages
                      id="appModule.regsiter"/>
                  </Button>
				 }

				<div style={{marginTop: ".4rem",textAlign:"center"}}>	
                  {/* <Link href="/signin"> */}
                    <a className="a-underLine-none" onClick={()=>{this.props.formSwitch(false)}} ><IntlMessages id="signUp.alreadyMember"/></a>
                  {/* </Link> */}
				  </div>
                </div>
				

              </form>
            </div>
          </div>

        </div>

        {
          loader &&
          <div className="loader-view">
            <CircularProgress/>
          </div>
		}
		{this.props.OpenModal &&(
        <ModalSettings confirmTerms={true} user={{phone, password, firstname, lastname, country,countryiso2, gender, year, month, day, city, martial}} />
      )}
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer/>
      </div>
    )
  }
}

const mapStateToProps = ({auth,profile}) => {
  const {loader, alertMessage, showMessage, authUser} = auth;
  const {openModal}=profile;
  const OpenModal=openModal;
  return {loader, alertMessage, showMessage, authUser,OpenModal}
};


export default connect(mapStateToProps, {
  userSignUp,
  userCreateClear,
  hideMessage,
  showAuthLoader,
  hideAuthLoader,
  userSignIn,
  formSwitch,
  openModal
})(SignUp);
