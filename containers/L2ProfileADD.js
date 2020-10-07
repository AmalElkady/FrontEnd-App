import React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Grid from '@material-ui/core/Grid';
import Link from "next/link"
import {COUNTRY_CODE_TO_NAME_MAP} from '../util/data';
import Router from "next/router"
import IntlMessages from '../util/IntlMessages';
import { styled } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import {ARRAY_OF_WORKD} from '../util/data';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


import {
  hideMessage,
  showAuthLoader,
  userAddProfileL2,
  stepFlagClear,
  hideAuthLoader,
  userSignOut
} from '../actions/Auth';




class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
			nationality: '',
			tpercent: '1',
			workd: '',
			title: '',
			education: '',
			bio: ''
    }
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
    if (this.props.stepFlag == true) {
		this.props.showAuthLoader();
		
		setTimeout(() => {
		   this.props.stepFlagClear();
		   Router.replace('/dashboard/crypto');
     }, 300);
    }
  }

componentDidMount () {
	document.querySelector('.form-control').style = "width: 150px; pointer-events: none;"
}



  render() {
	  
    const {
			nationality,
			tpercent,
			workd,
			title,
			education,
			bio
		} = this.state;
	
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
	  console.log(event.target.name);
	  console.log(event.target.value);
    this.setState({[`${event.target.name}`] : `${event.target.value}`})
  };

    const {showMessage, loader, alertMessage, stepFlag, gender, country} = this.props;
	
    return (
	
	<>
				<Button variant="contained" onClick={() => {
                    
					this.props.showAuthLoader();
                    this.props.userSignOut();
					 
                  }} color="primary">
                    <IntlMessages
                      id="appModule.signOut"/>
                  </Button>
	
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
              <h2><IntlMessages id="appModule.profileL2Add"/></h2>
            </div>

            <div className="app-login-form">
              <form method="post" action="/">
       
				<Grid container spacing={12} style={{ minWidth: "149px",paddingBottom:"9px"}}>
						<Grid item xs={12}>
							<InputLabel id="nationality-label"  style={{ paddingBottom: "7px"}} ><IntlMessages id="inputLabel.nationality"/></InputLabel>
						</Grid>
						<Grid item xs={12}>
							<PhoneInput
							  countryCodeEditable={false}
							  disableCountryCode={true}
							  country={COUNTRY_CODE_TO_NAME_MAP[this.state.nationality] || COUNTRY_CODE_TO_NAME_MAP[country] || COUNTRY_CODE_TO_NAME_MAP["+"+country]}
							  value={this.state.nationality}
							  placeholder={'Choose Country'}
							  readonly={'readonly'}
							  onChange={(value, country, e, formattedValue) => {this.setState({ nationality: country.dialCode });}}
							/>
						</Grid>
				</Grid>
				


		  {!gender && <Grid container spacing={12} style={{ minWidth: "149px", paddingTop:"9px",paddingBottom:"9px"}}>
						<Grid item xs={12}>
							<InputLabel id="tpercent-label"><IntlMessages id="inputLabel.tpercent"/></InputLabel>
						</Grid>
						<Grid item xs={12}>
						  <StyledFormControl style={{ minWidth: "149px" }}>
								<Select
								  labelId="tpercent-label"
								  id="tpercent"
								  value={tpercent}
								  onChange={handleChange}
								  name="tpercent"
								>
	

												  <MenuItem
													key={1}
													value={1}
													control={<Radio />}
													label={"With no conditions"}>
														{"With no conditions"}
												  </MenuItem>
	
												  <MenuItem
													key={2}
													value={2}
													control={<Radio />}
													label={"With conditions"}>
														{"With conditions"}
												  </MenuItem>
												  
												
								</Select>
							</StyledFormControl>
						</Grid>
					</Grid> }



				<Grid container spacing={12} style={{ minWidth: "149px", paddingTop:"9px",paddingBottom:"9px"}}>
						<Grid item xs={12}>
							<InputLabel id="education-label"><IntlMessages id="inputLabel.education"/></InputLabel>
						</Grid>
						<Grid item xs={12}>
						  <StyledFormControl style={{ minWidth: "149px" }}>
								<Select
								  labelId="education-label"
								  id="education"
								  value={education}
								  onChange={handleChange}
								  name="education"
								>
	
												  
												  <MenuItem
													key={"1"}
													value={"1"}
													control={<Radio />}
													label={<IntlMessages id="education.1"/>}>
														{<IntlMessages id="education.1"/>}
												  </MenuItem>												  
												  <MenuItem
													key={"2"}
													value={"2"}
													control={<Radio />}
													label={<IntlMessages id="education.2"/>}>
														{<IntlMessages id="education.2"/>}
												  </MenuItem>												  
												  <MenuItem
													key={"3"}
													value={"3"}
													control={<Radio />}
													label={<IntlMessages id="education.3"/>}>
														{<IntlMessages id="education.3"/>}
												  </MenuItem>
	
	
												
								</Select>
							</StyledFormControl>
						</Grid>
				</Grid>
				


				<Grid container spacing={12} style={{ minWidth: "149px", paddingTop:"9px", paddingBottom:"-3px"}}>
						<Grid item xs={12}>
							<InputLabel id="workd-label"><IntlMessages id="inputLabel.workd"/></InputLabel>
						</Grid>
						<Grid item xs={12}>
						  <StyledFormControl style={{ minWidth: "149px" }}>
								<Select
								  labelId="workd-label"
								  id="workd"
								  value={workd}
								  onChange={handleChange}
								  name="workd"
								>
	

										{ARRAY_OF_WORKD.map((value) => {
										    let v = parseInt(`${value.props.id}`.split(".")[1]);
											return  <MenuItem
													key={v}
													value={v}
													control={<Radio />}
													label={value}>
														{value}
												  </MenuItem>
										})}
												
								</Select>
							</StyledFormControl>
						</Grid>
				</Grid>
				



				
			<Grid container spacing={12} style={{ paddingBottom:"9px"}}>
			
						<Grid item xs={6} style={{ width: "100%", paddingRight: "18px"}}>
							<TextField
							  type="text"
							  onChange={handleChange}
							  fullWidth
							  label={<IntlMessages id="inputLabel.title"/>}
							  defaultValue={title}
							  margin="normal"
							  name="title"
							  style={{width: "100%"}}
							/>
						</Grid>
						
			</Grid>
			
	
				<Grid container spacing={12} style={{paddingTop:"9px",paddingBottom:"9px"}}>
						<Grid container spacing={12}>
							<InputLabel id="bio-label"><IntlMessages id="inputLabel.bio"/></InputLabel>
						</Grid>
						<Grid container spacing={12}>

							<TextareaAutosize
							  onChange={handleChange}
							  aria-label="minimum height"
							  fullWidth
							  defaultValue={bio}
							  rowsMin={3}
							  name="bio"
							  style={{width: "100%"}}
							/>
					
						</Grid>
				</Grid>
				
		
			
                <div className="mb-3 d-flex align-items-center justify-content-between">
                  <Button variant="contained" onClick={() => {
					  this.props.showAuthLoader();
                      this.props.userAddProfileL2({tpercent,nationality,workd,title,education,bio});
					 // console.log(country);
					//   console.log(nationality);
					//   console.log(tpercent);
					//   console.log(workd);
					//   console.log(title);
					//   console.log(education);
					//   console.log(bio);
                  }} color="primary">
                    <IntlMessages
                      id="appModule.submit"/>
                  </Button>
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
	  
	 </>
    )
  }
}

const mapStateToProps = ({auth}) => {
  const {loader, alertMessage, showMessage, authUser, stepFlag, gender, country} = auth;
  return {loader, alertMessage, showMessage, authUser, stepFlag, gender, country}
};


export default connect(mapStateToProps, {
  userAddProfileL2,
  stepFlagClear,
  hideMessage,
  showAuthLoader,
  hideAuthLoader,
  userSignOut
})(SignUp);
