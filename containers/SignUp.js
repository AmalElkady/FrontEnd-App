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

import {ARRAY_OF_YEARS ,ARRAY_OF_MONTHS, ARRAY_OF_DAYS, COUNTRY_CITY_MAP, COUNTRY_CITY_MAP_VALUE, ARRAYS_OF_MARTIAL_STATUS, ARRAYS_OF_MARTIAL_STATUS_VALUES} from '../util/data';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'



import {
  hideMessage,
  showAuthLoader,
  userSignUp,
  userCreateClear,
  hideAuthLoader,
} from '../actions/Auth';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
	  lastname: '',
	  gender: '0',
	  martial: '',
	  country: '20',
      phone: '',
	  city: '',
	  day: '',
 	  month: '',
 	  year: '',
      password: '',
	  password_confirm: ''
    }
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
    if (this.props.authUser !== null) {
	    
		NotificationManager.success('Profile created successfuly, you will be redirected to login', 'Success');
		this.props.userCreateClear();
		this.props.showAuthLoader();
		
		setTimeout(() => {
		   this.props.hideAuthLoader()
		   Router.replace('/signin');
     }, 300);
    }
  }

  render() {
    const {
      firstname,
	  lastname,
	  gender,
	  martial,
	  country,
      phone,
	  city,
	  day,
 	  month,
 	  year,
      password,
	  password_confirm
    } = this.state;
	
	
	
//	"name" : "Karem Mohammed",
//	"phone" : "01155778899",
//	"phonecountrycode": "20",
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
    const {showMessage, loader, alertMessage} = this.props;
	
    return (
      <div
        className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">
          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link href="/">
                    <a> <img src="../static/images/logo.png"
                     alt="App" title="App"/> </a>
            </Link>
          </div>

          <div className="app-login-content">
            <div className="app-login-header">
              <h2><IntlMessages id="appModule.createAccount"/></h2>
            </div>

            <div className="app-login-form">
              <form method="post" action="/">
       
				<Grid container spacing={12} style={{ minWidth: "149px"}}>
				    <Grid item xs={3} style={{ minWidth: "149px", paddingRight: "7px" }}>
						<TextField
						  type="text"
						  label={<IntlMessages id="inputLabel.firstName"/>}
						  onChange={(event) => this.setState({firstname: event.target.value})}
						  fullWidth
						  defaultValue={firstname}
						  margin="normal"
						  className="mt-2 mb-2"
						/>
					</Grid>
					<Grid item xs={3} style={{ minWidth: "149px", paddingRight: "7px"}}>
						<TextField
						  type="text"
						  label={<IntlMessages id="inputLabel.surName"/>}
						  onChange={(event) => this.setState({lastname: event.target.value})}
						  fullWidth
						  defaultValue={lastname}
						  margin="normal"
						  className="mt-2 mb-4"
						/>
					</Grid>
				</Grid>
				
				<Grid container spacing={12}>
					<Grid container spacing={12}>
						<InputLabel id="phone-label"  style={{ paddingBottom: "7px"}} ><IntlMessages id="appModule.phone"/></InputLabel>
						<PhoneInput
						  onlyCountries={['gb', 'us', 'fr','de','eg','ma','sa','dz','bh','kw','tn','ae','my','mr','af']}
						  countryCodeEditable={false}
						  country={'eg'}
						  value={this.state.country}
						  placeholder={''}
						  readonly={'readonly'}
						  onChange={(value, country, e, formattedValue) => {this.setState({ country: country.dialCode }); this.setState({ phone: value.slice(country.dialCode.length) });console.log(country.dialCode);}}
						/>	
					</Grid>
					
					<Grid container spacing={12} style={{ marginTop: "15px"}}>
						<FormControl component="fieldset">
						  <FormLabel component="legend"><IntlMessages id="inputLabel.gender"/></FormLabel>
						  <RadioGroup aria-label="gender" name="gender" value={gender} onChange={handleChange}>
							<FormControlLabel value="0" control={<Radio />} label={<IntlMessages id="inputGender.female"/>} />
							<FormControlLabel value="1" control={<Radio />} label={<IntlMessages id="inputGender.male"/>} />
						  </RadioGroup>
						</FormControl>
					</Grid>
 
				</Grid>
				
				
				<Grid container style={{ marginTop: "15px"}}>
                  <InputLabel id="birthday-label"><IntlMessages id="inputLabel.birthday"/></InputLabel>	
				</Grid>
				
				
				<Grid container spacing={3}>
				
				  <Grid item xs={3} sm={3} style={{ minWidth: "90px", paddingRight: "18px"}}>{/*min-width: 76px*/}
				  <StyledFormControl style={{ minWidth: "90px" }}>
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
					
					
					<Grid item xs={3} sm={3} style={{ minWidth: "90px", paddingRight: "18px"}}>
					<StyledFormControl style={{ minWidth: "90px" }}>
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
					
					
					<Grid item xs={3} sm={3} style={{ minWidth: "90px", paddingLeft: "18px"}}>
					<StyledFormControl style={{ minWidth: "90px" }}>
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
			
						<Grid item xs={3} style={{ minWidth: "90px", paddingRight: "18px"}}>
							
											  <StyledFormControl style={{ minWidth: "90px" }}>
												<InputLabel id="city-label"><IntlMessages id="inputLabel.city"/></InputLabel>
												<Select
												  labelId="city-label"
												  id="city"
												  value={city}
												  onChange={handleChange}
												  name="city"
												>
												
														{COUNTRY_CITY_MAP[this.state.country].map((value,i) => (
																  <MenuItem
																	key={COUNTRY_CITY_MAP_VALUE[this.state.country][i]}
																	value={COUNTRY_CITY_MAP_VALUE[this.state.country][i]}
																	control={<Radio />}
																	label={value}>
																		{value}
																  </MenuItem>
																))}
																
												</Select>
												</StyledFormControl>
						
						</Grid>
						
						<Grid item xs={3}  style={{ minWidth: "149px", paddingLeft: "18px"}}>
						
											  <StyledFormControl style={{ minWidth: "149px" }}>
												<InputLabel id="martial-label"><IntlMessages id="inputLabel.martial"/></InputLabel>
												<Select
												  labelId="martial-label"
												  id="martial"
												  value={martial}
												  onChange={handleChange}
												  name="martial"
												  style={{marginRight: "35px"}}
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
												
						</Grid>						
			</Grid>				


		
		
			<Grid container spacing={12} style={{ minWidth: "149px"}}>
			
						<Grid item xs={6} style={{ minWidth: "90px", paddingRight: "18px"}}>
							<TextField
							  type="password"
							  onChange={(event) => this.setState({password: event.target.value})}
							  label={<IntlMessages id="inputLabel.password"/>}
							  fullWidth
							  defaultValue={password}
							  margin="normal"
							  className="mt-0 mb-4"
							/>
						</Grid>
						
						<Grid item xs={6}  style={{ minWidth: "90px", paddingRight: "18px"}}>
							<TextField
							  type="password"
							  onChange={(event) => this.setState({password_confirm: event.target.value})}
							  label={<IntlMessages id="inputLabel.passwordConfirm"/>}
							  fullWidth
							  defaultValue={password_confirm}
							  margin="normal"
							  className="mt-0 mb-4"
							/>
						</Grid>						
			</Grid>
			
			
			
			
                <div className="mb-3 d-flex align-items-center justify-content-between">
                  <Button variant="contained" onClick={() => {
					  if(password != password_confirm){ NotificationManager.error("Password Mismatch")}
                      else { this.props.showAuthLoader();
                      this.props.userSignUp({phone, password, firstname, lastname, country, gender, year, month, day, city, martial}); }
                  }} color="primary">
                    <IntlMessages
                      id="appModule.regsiter"/>
                  </Button>
                  <Link href="/signin">
                    <a><IntlMessages id="signUp.alreadyMember"/></a>
                  </Link>
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
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer/>
      </div>
    )
  }
}

const mapStateToProps = ({auth}) => {
  const {loader, alertMessage, showMessage, authUser} = auth;
  return {loader, alertMessage, showMessage, authUser}
};


export default connect(mapStateToProps, {
  userSignUp,
  userCreateClear,
  hideMessage,
  showAuthLoader,
  hideAuthLoader
})(SignUp);
