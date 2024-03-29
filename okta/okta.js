import axios from "axios";
import {useDispatch } from "react-redux";
import {setCookie,removeCookie,getCookie} from '../util/session';
import IntlMessages from "../util/IntlMessages";
import base64url from 'base64url';
import {mapUserPhotoPath} from "../helpers/mapUserPhotoPath";
import {convertListToTwoArrays} from "../helpers/convertListToTwoArrays";
import Router from "next/router"
import {userSignOutSuccess}from "../actions/Auth"
import imageCompression from 'browser-image-compression';

const auth = {};
const home={};
const tokenManagerOperations = {};
let tokenForAccess = {}
//setCookie(key, value)

function getBase64FromImageUrl(url) {
    var img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width =this.width;
        canvas.height =this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    };

    img.src = url;
}

let axiosRequest = axios.create({
							  baseURL: "http://128.199.32.156/api/",
							  responseType: "json"
							});
							
//upload call exception

//  uploadToS3 = async (options, file, signedRequest) => {
//
//    
//    console.log( "AXIOS YA HAMADA = " + result);
//  };
  
  
let callAxios = (options) => {

		return new Promise(  async (resolve, reject) => {			
				try{
				let response = await axiosRequest(options);
				
				if(!response.data){
				resolve({"data" : {"message":"error"}});
				} else {
					
					
						if(response.data.token && (response.data.status != "ACTIVE"||response.data.status == null)) {
							// && response.data.status != "ACTIVE"
								setCookie("access_token",response.data.token);
															
								if(response.data.verify) {
									resolve({"data" : {"response":"ok"}})
								} else if(response.data.signedRequest){
									 resolve({"data" : {"signedRequest":response.data.signedRequest}});
								}else if(response.data.responseMP){
								
									resolve(response);
							   }else {
									options.headers.Authorization = "Bearer " + response.data.token;
									response = await axiosRequest(options);
									resolve(response);								
								}
								
							} else if(response.data.message) {
								
								if(response.data.message == "unauthorized") {
									
									removeCookie("access_token");
									resolve({"data" : {"code":"unauthorized","message":"unauthorized"}})
								}else if(response.data.code=="JWT_8"||response.data.code=="JWT_7"){
									
									//removeCookie("access_token");
									//auth.signOut();
								//	Router.replace('/');
								resolve({
									data: { code: "JWT_8" }
								  });
								}
								// else if(response.data.code=="JWT_7"){
								// 	console.log("**********expired token*********");
								// 	//resolve({"code":"JWT_7"})
								// 	// const dispatch = useDispatch();
								// 	// dispatch(userSignOutSuccess());
								//   //  Router.replace("/");
								//   resolve({
								// 	data: { code: "JWT_8" }
								//   });
								// }
								 else {
									resolve(response);
								}
								
								
							} else {
								resolve(response);
							}	
						
					}
				
				} catch (error) {
				
					resolve({"data" : {"message":"error"}});
				}
		}).catch((err) => {console.log(err)});
		
	}
//{
//    "response": "true",
//    "status": "ACTIVE",
//    "L1": {
//        "n": "Mohammed Abdelhamid",
//        "b": "19900701",
//        "m": "3",
//        "mp": "_mp2.png"
//    },
//    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE1OTQ2MDQ3LCJpZCI6IjE1MTFlZGY2LTVmMTYtNDgxMy04MDFmLWE0MGNlOGUzNTVhMiIsInB2IjoxLCJwcm9maWxlIjowLCJnZCI6IjEiLCJjbyI6IjIwIiwiY2kiOiIxIiwidmEiOjEsImFnIjoyOSwiam50IjoxNTkwMjIxNywiaWF0IjoxNTkzMTUyMjczLCJleHAiOjE1OTMxNTU4NzN9.weC8LDG9mOobL5JuaJkSJ-h1E0QqGhks17c6aJdCltA"
//}

//{
// "nationality": "20",
// "tpercent": "1",
// "title" :  "Accounting Department Head",
// "workd": "6",
// "education": "2",
// "bio": "Here I Am, Nice To Meet You"
//}http://localhost:3001/api/addupdateprofile

auth.signInWithPhoneAndPassword = function (username,password,country,key) {
	
		      return new Promise(  async (resolve, reject) => {				

					if(username && password && country) {
						try {
							
							
							let options = {
										  url: '/loginaccess',
										  method: 'POST',
										  headers: {
											'Accept': 'application-json',
											'Content-Type': 'application/json;charset=UTF-8',
											
										  },
										  data: {
										     "phonecountrycode": country,
											"phone" : username,
											"password" : password
											,key
										  }
										};

							
										
													let resX = await callAxios(options);	
													
													let res = resX.data;
													
													
													if(res.response && res.status == "ACTIVE" && res.token){
														
											
															 let tokenUserData = JSON.parse(base64url.decode(`${res.token}`.split(".")[1]));	
															
															 
															tokenManagerOperations.setTokenAndValidate("access_token",res.token);
															if(res.L1){
																
																resolve({"accessToken": "access_token", "n": res.L1.n, "m": res.L1.m, "b": res.L1.b, "gender":tokenUserData.gd,"sub":tokenUserData.sub,"jnt":tokenUserData.jnt});
															}
															else{
															
																resolve({"message": "profile not available"});	
															}
															
													
													}else if(res.message.code=="ADDINGUSERONLINE_9"){
													
														await new Promise(resolve => setTimeout(resolve, 5000));
														//auth.signInWithPhoneAndPassword(username,password,country)
														resolve({"loginAgain":true});	

													} 
													
													else {
														// resolve({"message": res.message});
														if(res.code=="LOGINACCESS_1"){
															resolve({"message": <IntlMessages id="error.notCorrectPhone" />});
														}
														else if(res.code=="LOGINACCESS_2"&& !res.aws=="NotAuthorizedException"){
															resolve({"message": <IntlMessages id="error.notCorrectPass" />});
														}else if(res.code=="LOGINACCESS_2"&& res.aws=="NotAuthorizedException"){
															resolve({"message": <IntlMessages id="error.userSuspended" />});
														}
														else if(res.code=="ADDINGUSERONLINE_9"){
														
															auth.signInWithPhoneAndPassword(username,password,country)

														}
													}
													
								
								
										
			  } catch (err) {
				  resolve({"message": err.message});
			  }
										  
			  }	else {
				  if(!username && password && !country){
					resolve({"message": <IntlMessages id="error.emptyPhone" />});
				  }else if(username && !password && country){

					  resolve({"message":   <IntlMessages id="error.emptyPass" />});
				  }else{
					resolve({"message":   <IntlMessages id="error.emptyPhonePass" />});
				  }
			  }															
									
      }).catch((err) => {console.log(err)});	
}


auth.createUserWithPhoneAndPassword = function (username,password,firstName,lastName,country,countryiso2, gender, year, month, day, city, martial,score, key) {

			let newUser = {
								"name" : firstName + " " + lastName,
								"phone" : username,
								"phonecountrycode": country,
								"countryiso2":countryiso2.toUpperCase(),
								 gender,
								 password,
								 year,
								 month,
								 day,
								 city,
								 martial,score, key
							}



			      return new Promise(  async (resolve, reject) => {				
						
					
						if( (`${username}`.trim() !== '') && (`${password}`.trim() !== '') && (`${firstName}`.trim() !== '') && (`${lastName}`.trim() !== '') && (parseInt(gender) == 0 || parseInt(gender) == 1)&& martial!==''&& month!==''&& year!==''&& day!=='' && city!=='' ) {

							try {
								
								let options = {
											  url: '/createuser',
											  method: 'POST',
											  headers: {
												'Accept': 'application/json',
												'Content-Type': 'application/json;charset=UTF-8'
											  },
											  data: newUser
											};

								let responseX = await callAxios(options);
								let response =	responseX.data;
								
											if(response.response == "ok") {
											
												//let tokenUserData = JSON.parse(base64url.decode(`${response.token}`.split(".")[1]));	
												//	await tokenManagerOperations.setTokenAndValidate("access_token",response.token);
												// login API
												//auth.signInWithPhoneAndPassword(newUser.phone,password,newUser.phonecountrycode)
											 //  resolve({"accessToken": "access_token","phone": newUser.phone, "country": newUser.country,"countryiso2":newUser.countryiso2, "n": newUser.name, "m": newUser.martial, "b": `${newUser.year}${newUser.month}${newUser.day}`,"gender" : newUser.gender,"sub":tokenUserData.sub});
											 resolve({"response":"ok"})
								
											} else {
												if(response.code=="CREATEUSER_9"){
													//resolve({"message": response.message});
													resolve({"message":<IntlMessages id="error.wrongPass" />});
												}
												else if(response.code=="CREATEUSER_10"){
													
													resolve({"message":<IntlMessages id="error.wrongPhone" />});
												}
												else if(response.code=="CREATEUSER_4"){
													resolve({"message":<IntlMessages id="error.userAlready" />});
												}else if(response.code=="CREATEUSER_14"){

												}
											}
												
										


							}catch(err) {
								
								resolve({"message": err});
							}									
				  } else {

					if((`${firstName}`.trim() === '')){
						resolve({"message": <IntlMessages id="error.emptyFirstName" />});
					}
					else if((`${lastName}`.trim() === '')){
						resolve({"message": <IntlMessages id="error.emptyLastName" />});
					}
					else if((`${username}`.trim()=== '')){
						resolve({"message": <IntlMessages id="error.emptyPhone" />});
					}
				    else if( (parseInt(gender) != 0 && parseInt(gender) != 1)){
						resolve({"message": <IntlMessages id="error.emptyGender" />});
					}
					else if(day===''){
						resolve({"message": <IntlMessages id="error.emptyDay" />});
					}
					else if(month===''){
						resolve({"message": <IntlMessages id="error.emptyMonth" />});
					}
					else if(year===''){
						resolve({"message": <IntlMessages id="error.emptyYear" />});
					}
					else if(city===''){
						resolve({"message": <IntlMessages id="error.emptyCity" />});
					}
					else if(martial===''){
						resolve({"message": <IntlMessages id="error.emptyMartial" />});
					}
					else if((`${password}`.trim() === '')){
						resolve({"message": <IntlMessages id="error.emptyPass" />});
					}
					  
					//   resolve({"message": "empty values not allowed !"});
					  
				  }
										
      }).catch((err) => {console.log(err)});			
	
}

auth.uploadMainProfilePhoto = function (file) {
			      return new Promise(  async (resolve, reject) => {				
					  
						if(file) {
							try {
								
								//http:// /api/checkmpupload
								//http:// /api/requestphotoupload?photo=0
								const tokenValue = getCookie("access_token",false);
								
								let optionsCheck = {
											  url: '/checkmpupload',
											  method: 'POST',
											  crossDomain: true,
												xhrFields: {
													withCredentials: true
												},
											  headers: {
												'Accept': 'application/json',
												'Content-Type': 'application/json;charset=UTF-8',
												//"Access-Control-Allow-Origin": "*",
												'Authorization': "Bearer " + tokenValue
											  }
											};		

								let checkMPUploadResponse = await callAxios(optionsCheck);
								
								//IF APPROVED RETURN WITH SUCCESS 
								//IF MESSAGE RETURN ERORR
								//ELSE CONTINUE AND REQUEST PHOTO UPLOAD then USE RETURNED S3 SIGNED REQUEST TO UPLOAD PHOTO
									//IF UPLOADED --- > CALL (CHECK MP UPLOAD) RETURN SUCCESS
									//ELSE ------> RETURN ERROR
								
								if(checkMPUploadResponse.data.code == "CHECKMPUPLOAD_4" ||checkMPUploadResponse.data.code == "CHECKMPUPLOAD_6" || checkMPUploadResponse.data.code == "CHECKMPUPLOAD_9") {
									
									
									optionsCheck.url = "/requestphotoupload?photo=0";
									optionsCheck.data = {'filetype':`${file.type}`.slice(5), 'filesize': file.size/*file.size*/}
									
								    let checkUploadRequestResponse = await callAxios(optionsCheck);
								    
									
								    		if(checkUploadRequestResponse.data.code) {
								    			resolve({"message": checkUploadRequestResponse.data.code});
								    		} else if(checkUploadRequestResponse.data.signedRequest) {
												//upload file axios
												//file
														//let regx = /(?<=\/)(.*)(?=\?Content-Type=)/g
														//let newName = `${checkUploadRequestResponse.data.signedRequest}`.match(regx)[0].split("/")[5]
												
											    //let newName = `${checkUploadRequestResponse.data.signedRequest}`.match(regx)[0].split("/s3-profile-photos.s3.me-south-1.amazonaws.com/")[1]
												// const myNewFile = new File([file], newName, {type: file.type});
												
												// console.log(newName);
												// console.log("new file ", myNewFile);
												
												//let textData = await myNewFile.__proto__.__proto__.text();
												//console.log("new file ", textData);
												
												 		// let bodyFormData = new FormData();
												 		// bodyFormData.set('image', myNewFile, newName);
												 		//bodyFormData.append('name', fileName)

													
												 	//console.log("bodyFormData \n", bodyFormData);
												 	// const uploadImageRequest = {
												 	// 		method: 'PUT',
												 	// 		url: checkUploadRequestResponse.data.signedRequest,
												 	// 		content: bodyFormData,
												 	// 	 	headers: {
												 	// 	 		'content-type': 'multipart/form-data'//file.type
												 	// 	 	}
												 	// 	}
												 	
												 	// console.log(uploadImageRequest);													
												 	//let imageUploadResult = await callAxios(uploadImageRequest);
													
													//    const UploadOptions = {
													//			  headers: {
													//				"Content-Type": myNewFile.type
													//			  }
													//			};
													//let imageUploadResult = await axios.put(checkUploadRequestResponse.data.signedRequest, myNewFile, uploadImageRequest);
													
												//let imageUploadResult = await uploadFileToS3(checkUploadRequestResponse.data.signedRequest,file);
                                                   const formData = new FormData();
    Object.keys(checkUploadRequestResponse.data.signedRequest.fields).forEach(key => {
      formData.append(key, checkUploadRequestResponse.data.signedRequest.fields[key]);
    });
    // Actual file has to be appended last.
    formData.append("file", file);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", checkUploadRequestResponse.data.signedRequest.url, true);
    xhr.send(formData);
    xhr.onload = async function() {
     if(this.status === 204 ){
	
			optionsCheck.url = "/checkmpupload";
			let checkUploadRequestResponseNew = await callAxios(optionsCheck);
		
														//await callAxios(optionsCheck);
														if(checkUploadRequestResponseNew.data.token != 0 && checkUploadRequestResponseNew.data.token){
															
															setCookie("access_token",checkUploadRequestResponseNew.data.token);
															resolve(true);
														}
														else if(checkUploadRequestResponseNew.data.token==0){
														
															resolve({"token0": true});
														}
														else if(checkUploadRequestResponseNew.data.code== "CHECKMPUPLOAD_6"){
															resolve(true);
														}
														else if(checkUploadRequestResponseNew.data.code== "CHECKMPUPLOAD_11"||checkUploadRequestResponseNew.data.code== "CHECKMPUPLOAD_12"){
														
															checkUploadRequestResponseNew = await callAxios(optionsCheck);
															if(checkUploadRequestResponseNew.data.token!=0){
																setCookie("access_token",checkUploadRequestResponseNew.data.token);
																resolve(true);
															}
															else if(checkUploadRequestResponseNew.data.token==0){
																resolve({"token0": true});
															}

														}
														
	 } else{
		 reject(this.responseText);
	 }
    };
         
												
													// console.log("imageUploadResult ",imageUploadResult);
													
													// if(imageUploadResult.data.message){
												    // resolve({"message": imageUploadResult.data.message});
												    // }else{
													// 	optionsCheck.url = "/checkmpupload";
													// 	await callAxios(optionsCheck);
													// 	resolve(true);
													// }
													//when resolve true refresh page (MPUpload)
													//when resolve true in create user refresh page (SignUp)
													
												
								    		} else {
												resolve({"message": "Error"});
											}
											
											
								} else {
									
									resolve({"message": checkMPUploadResponse.data.code});

								}
								
				
							}catch(err) {
								
								resolve({"message": err});
							}									
				  } else {
					  
					  resolve({"message": "empty values not allowed !"});
					  
				  }
										
      }).catch((err) => {console.log(err)});			
	
}

auth.checkMPUploadphoto=function(){
	return new Promise(  async (resolve, reject) => {				
			try {
				
				//http:// /api/checkmpupload
				const tokenValue = getCookie("access_token",false);
				let optionsCheck = {
							  url: '/checkmpupload',
							  method: 'POST',
							  headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json;charset=UTF-8',
								'Authorization': "Bearer " + tokenValue
							  }
							};		

				let checkMPUploadResponse = await callAxios(optionsCheck);
				
			
				if(checkMPUploadResponse.data.code == "CHECKMPUPLOAD_4" || checkMPUploadResponse.data.code == "CHECKMPUPLOAD_9") {
					
					resolve(false);
				} else {
	                resolve(true);
				}
				

			}catch(err) {
			
				resolve({"message": err});
			}									
 
						
}).catch((err) => {console.log(err)});			


	
}

auth.changeUserPhoneBeforeVerif = function (newPhone,
	phonecountrycode,
	countryiso2,
	newCity) {

		  return new Promise(  async (resolve, reject) => {				
					try {
						
						const tokenValue = getCookie("access_token",false);
						let options = {
									  url: '/changeuserloginphonebeforeverification',
									  method: 'POST',
									  headers: {
										'Accept': 'application/json',
										'Content-Type': 'application/json;charset=UTF-8',
										'Authorization': "Bearer " + tokenValue
									  },
									  data: {newPhone,
										phonecountrycode,
										countryiso2,
										newCity}
									};

						let responseX = await callAxios(options);
						let response =	responseX.data;
						
									
										if(response.response && response.token){
											
															 let tokenUserData = JSON.parse(base64url.decode(`${response.token}`.split(".")[1]));															 
						
															 
															tokenManagerOperations.setTokenAndValidate("access_token",response.token);

											resolve(true);
									
									
									} else {
										resolve({"message": response.code});
									}
										
								


					}catch(err) {
					
						resolve({"message": err});
					}									
		  
								
}).catch((err) => {console.log(err)});			

}



auth.addUpdateProfileLayer2 = function (addUpdateFlag,nationality,tpercent,workd,title,education,bio) {

			let profileL2 = {
								nationality,
								tpercent,
								workd,
								title,
								education,
								bio
							};
	
	
			      return new Promise(  async (resolve, reject) => {				
					
					
						
						if( (`${nationality}`.trim() !== '') && (parseInt(tpercent) > 0) && (`${title}`.trim() !== '') && (parseInt(workd) > 0) && (parseInt(education) > 0) && (`${bio}`.trim() !== '')) {

							try {
								
								const tokenValue = getCookie("access_token",false);
								let options = {
											  url: '/addupdateprofile' + (addUpdateFlag == "update" ? "?update=L2" : ""),
											  method: 'POST',
											  headers: {
												'Accept': 'application/json',
												'Content-Type': 'application/json;charset=UTF-8',
												'Authorization': "Bearer " + tokenValue
											  },
											  data: profileL2
											};

								let responseX = await callAxios(options);
								let response =	responseX.data;
								
											if(response.response == "ok") {
												
													resolve(true);
											
											
											} else {
												resolve({"message": response.code});
											}
												
										


							}catch(err) {
								
								resolve({"message": err});
							}									
				  } else {
					
					if((`${nationality}`.trim() === '')){
						resolve({"message": <IntlMessages id="error.emptyNationality" />});
					}
					else if(parseInt(tpercent) == 0){
						resolve({"message": <IntlMessages id="error.emptyTpercent" />});
					}
					else if(education == ''){
						resolve({"message": <IntlMessages id="error.emptyEducation" />});
					}
				    else if(workd ==''){
						resolve({"message": <IntlMessages id="error.emptyWorkd" />});
					}
					else if((`${title}`.trim()=== '')){
						resolve({"message": <IntlMessages id="error.emptyTitle" />});
					}
					else if((`${bio}`.trim() === '')){
						resolve({"message": <IntlMessages id="error.emptyBio" />});
					}
			

					  //resolve({"message": "empty values not allowed !"});
					  
				  }
										
      }).catch((err) => {console.log(err)});			
	
}


auth.sendVerificationCodeForUserPhone = function (verificationCode) {
			      
				  return new Promise(  async (resolve, reject) => {				
				  
								const tokenValue = getCookie("access_token",false);
							    const options = {
							    				  url: '/verifyuser',
							    				  method: 'POST',
							    				  headers: {
							    					'Accept': 'application/json',
							    					'Content-Type': 'application/json;charset=UTF-8',
							 						'Authorization': "Bearer " + tokenValue
							    				  },
												  data : {
														"verifyTokenCode" : verificationCode
													}
							    				};
							    
													let responseX = await callAxios(options);
													let response = responseX.data;
										 
												   if(response){
														
														 if(response.response == "ok"){
															resolve({...response});
														 } else if(response.code) {
															 if(response.code =="TIME"){
																resolve({"message": <><IntlMessages id="error.codeTime" />{response.time} <IntlMessages id="error.codeTimeM" /> </>});
															 }else if(response.code =="VERIFYUSER_9"){
																resolve({"message": <IntlMessages id="error.wrongCode" />});
															}else if(response.code =="VERIFYUSER_2"){
																resolve({"message": <IntlMessages id="error.tooWrongCode" />});
															}
															else{

																 resolve({"message": response.message,"code":response.code});
															 }
														 } else {
															 resolve({"message": "error call"});
														 }

														
												   } else {
													   resolve({"message": "Something Went Wrong !"});
												   }
								
												
									
      }).catch((err) => {console.log(err)});		
}



auth.subscribe = function (subscribePack,sessionId) {
	
	return new Promise(  async (resolve, reject) => {				
	
				  const tokenValue = getCookie("access_token",false);
				  const options = {
									url: '/subscribe',
									method: 'POST',
									headers: {
									  'Accept': 'application/json',
									  'Content-Type': 'application/json;charset=UTF-8',
									   'Authorization': "Bearer " + tokenValue
									},
									data : {
										subscribePack,sessionId
									  }
								  };
						
									  let responseX = await callAxios(options);
									  let response = responseX.data;
									 
									 if(response){
										  
										   if(response.token){
											  resolve(true);
										   } else if(response.code) {
											  resolve({"message": response.code});
										   } else {
											   resolve({"message": "error call"});
										   }

										  
									 } else {
										 resolve({"message": "Something Went Wrong !"});
									 }
				  
								  
					  
}).catch((err) => {console.log(err)});		
}

///////

auth.addPayingCustomer = function () {

	return new Promise(  async (resolve, reject) => {				
	
				  const tokenValue = getCookie("access_token",false);
				  const options = {
									url: '/addpayingcustomer',
									method: 'POST',
									headers: {
									  'Accept': 'application/json',
									  'Content-Type': 'application/json;charset=UTF-8',
									   'Authorization': "Bearer " + tokenValue
									}
								  };
				  
									  let responseX = await callAxios(options);
									  let response = responseX.data;
									
									 if(response){
										   if(response.stripe_id){
											  resolve(response.stripe_id);
										   } else if(response.code) {
											  resolve({"message": response.code});
										   } else {
											   resolve({"message": "error call"});
										   }

										  
									 } else {
										 resolve({"message": "Something Went Wrong !"});
									 }
				  
								  
					  
}).catch((err) => {console.log(err)});		
}


auth.createCheckOutSession = function (pack) {

	return new Promise(  async (resolve, reject) => {				
	
				  const tokenValue = getCookie("access_token",false);
				  const options = {
									url: '/createcheckoutsession',
									method: 'POST',
									headers: {
									  'Accept': 'application/json',
									  'Content-Type': 'application/json;charset=UTF-8',
									   'Authorization': "Bearer " + tokenValue
									},
									data : {
										 pack
									  }
								  };
				  
									  let responseX = await callAxios(options);
									  let response = responseX.data;
									
									 if(response){
										   if(response.url){
											  resolve(response);
										   } else if(response.code) {
											  resolve({"message": response.code});
										   } else {
											   resolve({"message": "error call"});
										   }

										  
									 } else {
										 resolve({"message": "Something Went Wrong !"});
									 }
				  
								  
					  
}).catch((err) => {console.log(err)});		
}




///////



auth.resendVerificationToUserPhone = function () {
			      
				  return new Promise(  async (resolve, reject) => {				
				  
								const tokenValue = getCookie("access_token",false);
							    const options = {
							    				  url: '/senduserverificationcode',
							    				  method: 'POST',
							    				  headers: {
							    					'Accept': 'application/json',
							    					'Content-Type': 'application/json;charset=UTF-8',
							 						'Authorization': "Bearer " + tokenValue
							    				  }
							    				};
						
													let responseX = await callAxios(options);
													
													let response = responseX.data;
										 
											    
												   if(response){
														
														 if(response.response == "ok"){
															resolve({...response});
														 } else if(response.code) {
															//resolve({"message": response.message,"code":response.code,"time":response.time});
															if(response.code =="TIME"){
															   resolve({"message": <><IntlMessages id="error.codeTime" />{response.time} <IntlMessages id="error.codeTimeM" /> </>});
															}
															else{

																resolve({"message": response.message,"code":response.code});
															}
														 } else {
															 resolve({"message": "error call"});
														 }
														
												   } else {
													   resolve({"message": "Something Went Wrong !"});
												   }
										
									
      }).catch((err) => {console.log(err)});		
}


auth.sendResetPasswordTokenForUserPhone = function (username,phonecountrycode,countryiso2) {

			      return new Promise( async (resolve, reject) => {				
								
								if(username && phonecountrycode&&countryiso2) {
								try {

												const options = {
															  url: '/resetuserpassword',
															  method: 'POST',
															  headers: {
																'Accept': 'application/json',
																'Content-Type': 'application/json;charset=UTF-8'
															  },
															  data: { 
																phonecountrycode,
																phone : username,
																countryiso2:countryiso2.toUpperCase(),
															  }
															};

													let responseX = await callAxios(options);
													let response = responseX.data;
													//{"response" : "ok", "uid" : hw}
											    
												   if(response){
														
														 if(response.response == "ok"){
															resolve({"tokenReturned": "ok","hw": response.uid});
														 } else {
															//resolve({"message": response.code});
															resolve({"message": response.message,"code":response.code,"time":response.time});
														 }

														
												   } else {
													   resolve({"message": "Something Went Wrong !"});
												   }
										
											
								} catch(err) {
									resolve({"message": err.message});		
								}
													
				  } else {
					   resolve({"message": "empty values not allowed !"});
				  }																					                          

										
      }).catch((err) => {console.log(err)});			
	
}



auth.changePasswordWithTokenForUserPhone = function (token,password,hw) {

		//{
		//	"token" : "963109",
		//	"uid": {
		//        "iv": "L%jdi##1M9*s@47&",
		//        "encryptedData": "7b2570752cff489a6904a4d138cbd3cd46c0397ef3f518521a9dc13c43cfed2c7851f2f78d95d1e4989896b6a7450ada"
		//    },
		//	"pass" : "Password#1234567"	
		//}	
			
			      return new Promise(  async (resolve, reject) => {				
											
								if(token && password && hw) {
										try {
											
											const options = {
															  url: '/verifyresetpasswordcode',
															  method: 'POST',
															  headers: {
																'Accept': 'application/json',
																'Content-Type': 'application/json;charset=UTF-8'
															  },
															  data: {token, pass : password, "uid" : hw}
															};

											let responseX = await callAxios(options);
											let response = responseX.data;
											
											   if(response){
												   
															 if(response.response == "ok"){
																resolve({"passwordChanged": "ok"});					 
															 } else {
																resolve({"message": response.code});
															 }
												
											   } else {
												   
												   resolve({"message": "no response !"})
											   }
								
										} catch(err) {
											resolve({"message": err.message});
										}		

				  } else {
					   resolve({"message": "empty values not allowed !"});
				  }			
										
      }).catch((err) => {console.log(err)});			
	
}

auth.signOut = function () {
			      return new Promise(  async (resolve, reject) => {				
								
								//http://localhost:3001/api/logout
								const tokenValue = getCookie("access_token",false);
							    const options = {
							    				  url: '/logout',
							    				  method: 'POST',
							    				  headers: {
							    					'Accept': 'application/json',
							    					'Content-Type': 'application/json;charset=UTF-8',
							 						'Authorization': "Bearer " + tokenValue
							    				  }
							    				};
							    
							    let responseX = await callAxios(options);
										
								tokenManagerOperations.clearAllTokens("access_token");
								resolve(undefined);
								
												
									
      }).catch((err) => {console.log(err)});		
}
////////////////////////////// Home ////////////
///// ONLINE
home.getAllCountriesOnline = function (SH, offset) {

	// "allcountriesflag": true,
    // "searchlistid" : "all_countries_online",
    // "country" : "",
    // "city" : "",
    // "agerange" : "",
    // "key":"",
    // "scoreH":"",
    // "offset":""
					  return new Promise(  async (resolve, reject) => {				
											try {
												
												const tokenValue = getCookie("access_token",false);
												const options = {
																  url: '/availablesearch',
																  method: 'POST',
																  headers: {
																	'Accept': 'application/json',
																	'Content-Type': 'application/json;charset=UTF-8',
																	'Authorization': "Bearer " + tokenValue
																  },
																  data: {
																	allcountriesflag: true,
																     searchlistid : "all_countries_online",
																	 scoreH:SH,
																	 offset
																  }
																};
	
												let responseX = await callAxios(options);
												let response = responseX.data;	
												   if(response){	
																	const mapedList =convertListToTwoArrays(response.list_of_results);					   
																   resolve(mapedList);						 
												   } else {
													   
													   resolve({"message": "no response !"})
												   }
									
											} catch(err) {
												resolve({"message": err.message});
											}		
	
					  		
											
		  }).catch((err) => {console.log(err)});			
		
	}

home.getCountryCitiesOnline = function ( country, SH, offset ) {

	// "allcountriesflag": false,
    // "searchlistid" : "EG_country_cities_online",
    // "country" : "",
    // "city" : "",
    // "agerange" : "",
    // "key":"",
    // "scoreH":"",
	// "offset":""
						  return new Promise(  async (resolve, reject) => {				
												try {
													
													const tokenValue = getCookie("access_token",false);
													const options = {
																	  url: '/availablesearch',
																	  method: 'POST',
																	  headers: {
																		'Accept': 'application/json',
																		'Content-Type': 'application/json;charset=UTF-8',
																		'Authorization': "Bearer " + tokenValue
																	  },
																	  data: {
																		allcountriesflag: false,
																		 searchlistid : `${country}_country_cities_online`,
																		 scoreH:SH,
																		 offset
																	  }
																	};
		
													let responseX = await callAxios(options);
													let response = responseX.data;
	
													
													   if(response){
																		//resolve(response);			
																		const mapedList =convertListToTwoArrays(response.list_of_results);
																												   
																	   resolve(mapedList);			 
													   } else {
														   
														   resolve({"message": "no response !"})
													   }
										
												} catch(err) {
													resolve({"message": err.message});
												}		
		
								  
												
			  }).catch((err) => {console.log(err)});			
			
		}
home.getCountryAgerangesOnline = function ( country, SH, offset) {

			// "allcountriesflag": false,
			// "searchlistid" : "EG_country_ageranges_online",
			// "country" : "",
			// "city" : "",
			// "agerange" : "",
			// "key":"",
			// "scoreH":"",
			// "offset":""
			
								  return new Promise(  async (resolve, reject) => {				
														try {
															
															const tokenValue = getCookie("access_token",false);
															const options = {
																			  url: '/availablesearch',
																			  method: 'POST',
																			  headers: {
																				'Accept': 'application/json',
																				'Content-Type': 'application/json;charset=UTF-8',
																				'Authorization': "Bearer " + tokenValue
																			  },
																			  data: {
																				allcountriesflag: false,
																				 searchlistid : `${country}_country_ageranges_online`,
																				 scoreH:SH,
																				 offset
																			  }
																			};
				
															let responseX = await callAxios(options);
															let response = responseX.data;
			
															   if(response){
																				//resolve(response);	
																				const mapedList =convertListToTwoArrays(response.list_of_results);
																											   
																   resolve(mapedList);				 
															   } else {
																   
																   resolve({"message": "no response !"})
															   }
												
														} catch(err) {
															resolve({"message": err.message});
														}		
				
										  
														
					  }).catch((err) => {console.log(err)});			
					
				}
home.getAgerangeCountriesOnline = function (agerange, SH, offset) {

					// "allcountriesflag": true,
					// "searchlistid" : "${ageRange}_agerange_countries_online",
					// "country" : "",
					// "city" : "",
					// "agerange" : "",
					// "key":"",
					// "scoreH":"",
					// "offset":""
				
										  return new Promise(  async (resolve, reject) => {				
																try {
																	
																	const tokenValue = getCookie("access_token",false);
																	const options = {
																					  url: '/availablesearch',
																					  method: 'POST',
																					  headers: {
																						'Accept': 'application/json',
																						'Content-Type': 'application/json;charset=UTF-8',
																						'Authorization': "Bearer " + tokenValue
																					  },
																					  data: {
																						allcountriesflag: true,
																						 searchlistid : `${agerange}_agerange_countries_online`,
																						 scoreH:SH,
																						 offset
																					  }
																					};
						
																	let responseX = await callAxios(options);
																	let response = responseX.data;
					
																	
																	   if(response){
																						//resolve(response);
																						const mapedList =convertListToTwoArrays(response.list_of_results);
																											   
																   resolve(mapedList);						 
																	   } else {
																		   
																		   resolve({"message": "no response !"})
																	   }
														
																} catch(err) {
																	resolve({"message": err.message});
																}		
						
												  
																
							  }).catch((err) => {console.log(err)});			
							
						}							
home.getCountryCitiesAgerangeOnline = function (country,agerange, SH, offset) {

							// "allcountriesflag": false,
							// "searchlistid" : "${co}_${ageRange}_country_cities_agerange_online",
							// "country" : "",
							// "city" : "",
							// "agerange" : "",
							// "key":"",
							// "scoreH":"",
							// "offset":""
						
												  return new Promise(  async (resolve, reject) => {				
																		try {
																			
																			const tokenValue = getCookie("access_token",false);
																			const options = {
																							  url: '/availablesearch',
																							  method: 'POST',
																							  headers: {
																								'Accept': 'application/json',
																								'Content-Type': 'application/json;charset=UTF-8',
																								'Authorization': "Bearer " + tokenValue
																							  },
																							  data: {
																								allcountriesflag: false,
																								 searchlistid : `${country}_${agerange}_country_cities_agerange_online`,
																								 scoreH:SH,
																								 offset
																							  }
																							};
								
																			let responseX = await callAxios(options);
																			let response = responseX.data;
							
																			   if(response){
																								//resolve(response);
																								const mapedList =convertListToTwoArrays(response.list_of_results);
																																		   
																							   resolve(mapedList);						 
																			   } else {
																				   
																				   resolve({"message": "no response !"})
																			   }
																
																		} catch(err) {
																			resolve({"message": err.message});
																		}		
								
														  
																		
									  }).catch((err) => {console.log(err)});			
									
								}	
																
home.getCountryCityAgerangesOnline = function (country,city, SH, offset) {

									// "allcountriesflag": false,
									// "searchlistid" : "${co}_${ci}_country_city_ageranges_online",
									// "country" : "",
									// "city" : "",
									// "agerange" : "",
									// "key":"",
									// "scoreH":"",
									// "offset":""
									
														  return new Promise(  async (resolve, reject) => {				
																				try {
																					
																					const tokenValue = getCookie("access_token",false);
																					const options = {
																									  url: '/availablesearch',
																									  method: 'POST',
																									  headers: {
																										'Accept': 'application/json',
																										'Content-Type': 'application/json;charset=UTF-8',
																										'Authorization': "Bearer " + tokenValue
																									  },
																									  data: {
																										allcountriesflag: false,
																										 searchlistid : `${country}_${city}_country_city_ageranges_online`,
																										 scoreH:SH,
																										 offset
																									  }
																									};
										
																					let responseX = await callAxios(options);
																					let response = responseX.data;
									
																					
																					   if(response){
																										//resolve(response);
																										const mapedList =convertListToTwoArrays(response.list_of_results);
																																		   
																							   resolve(mapedList);		
																														 
																					   } else {
																						   
																						   resolve({"message": "no response !"})
																					   }
																		
																				} catch(err) {
																					resolve({"message": err.message});
																				}		
										
																  
																				
											  }).catch((err) => {console.log(err)});			
											
										}
home.getAllCountriesSelectedOnline = function (SH,offset) {

	// "allcountriesflag":true,
    // "searchlistid" : "all_countries_selected_online",
    // "country" : "",
    // "city" : "",
    // "agerange" : "",
    // "key":"",
    // "scoreH":"",
    // "offset":""
								
																  return new Promise(  async (resolve, reject) => {				
																						try {
																							
																							const tokenValue = getCookie("access_token",false);
																							const options = {
																											  url: '/availablesearch',
																											  method: 'POST',
																											  headers: {
																												'Accept': 'application/json',
																												'Content-Type': 'application/json;charset=UTF-8',
																												'Authorization': "Bearer " + tokenValue
																											  },
																											  data: {
																												allcountriesflag: true,
																												 searchlistid : `all_countries_selected_online`,
																												 scoreH:SH,
   																												 offset:offset
																											  }
																											};
												
																							let responseX = await callAxios(options);
																							let response = responseX.data;
											
																							
																							if(response){
																							   if (response.code == "JWT_8") {
																								
																									resolve({ error_jwt8: "true" });
																								  } else{

																									  const mapedList =convertListToTwoArrays(response.list_of_results);
																									  
																									  resolve(mapedList);
																								  }

																									 
																							   } else {
																								   
																								   resolve({"message": "no response !"})
																							   }
																							  
																				
																						} catch(err) {
																							resolve({"message": err.message});
																						}		
												
																		  
																						
													  }).catch((err) => {console.log(err)});			
													
												}
home.getAgerangeAllCountriesSelectedOnline = function (ageRange,SH,offset) {

													// "allcountriesflag":true,
													// "searchlistid" : "${ageRange}_agerange_all_countries_selected_online",
													// "country" : "",
													// "city" : "",
													// "agerange" : "",
													// "key":"",
													// "scoreH":"",
													// "offset":""
																				
																												  return new Promise(  async (resolve, reject) => {				
																																		try {
																																			
																																			const tokenValue = getCookie("access_token",false);
																																			const options = {
																																							  url: '/availablesearch',
																																							  method: 'POST',
																																							  headers: {
																																								'Accept': 'application/json',
																																								'Content-Type': 'application/json;charset=UTF-8',
																																								'Authorization': "Bearer " + tokenValue
																																							  },
																																							  data: {
																																								allcountriesflag: true,
																																								 searchlistid : `${ageRange}_agerange_all_countries_selected_online`,
																																								 scoreH:SH,
																																								 offset:offset
																							
																																							  }
																																							};
																								
																																			let responseX = await callAxios(options);
																																			let response = responseX.data;
																							
																																		
																																			if(response){
																																				const mapedList =convertListToTwoArrays(response.list_of_results);
																																				
																																				resolve(mapedList);
																																					 
																																			   } else {
																																				   
																																				   resolve({"message": "no response !"})
																																			   }
																																			  
																																
																																		} catch(err) {
																																			resolve({"message": err.message});
																																		}		
																								
																														  
																																		
																									  }).catch((err) => {console.log(err)});			
																									
}
												
home.getCountrySelectedOnline = function (country,SH,offset) {

													// "allcountriesflag":false,
													// "searchlistid" : "${co}_country_selected_online",
													// "country" : "",
													// "city" : "",
													// "agerange" : "",
													// "key":"",
													// "scoreH":"",
													// "offset":""
																				
																												  return new Promise(  async (resolve, reject) => {				
																																		try {
																																			
																																			const tokenValue = getCookie("access_token",false);
																																			const options = {
																																							  url: '/availablesearch',
																																							  method: 'POST',
																																							  headers: {
																																								'Accept': 'application/json',
																																								'Content-Type': 'application/json;charset=UTF-8',
																																								'Authorization': "Bearer " + tokenValue
																																							  },
																																							  data: {
																																								allcountriesflag: false,
																																								 searchlistid : `${country}_country_selected_online`,
																																								 scoreH:SH,
												         																										offset:offset
																							
																																							  }
																																							};
																								
																																			let responseX = await callAxios(options);
																																			let response = responseX.data;
																							
																																			
																																			if(response){
																																				
																																				const mapedList =convertListToTwoArrays(response.list_of_results);
																																				
																																				resolve(mapedList);
																																					 
																																					 
																																			   } else {
																																				   
																																				   resolve({"message": "no response !"})
																																			   }
																																			  
																																
																																		} catch(err) {
																																			resolve({"message": err.message});
																																		}		
																								
																														  
																																		
																									  }).catch((err) => {console.log(err)});			
																									
}
		
home.getCountryCitySelectedOnline = function (country,city, SH, offset) {

	// "allcountriesflag":false,
	// "searchlistid" : "${co}_${ci}_country_city_selected_online",
	// "country" : "",
	// "city" : "",
	// "agerange" : "",
	// "key":"",
	// "scoreH":"",
	// "offset":""
									
																  return new Promise(  async (resolve, reject) => {				
																						try {
																							
																							const tokenValue = getCookie("access_token",false);
																							const options = {
																											  url: '/availablesearch',
																											  method: 'POST',
																											  headers: {
																												'Accept': 'application/json',
																												'Content-Type': 'application/json;charset=UTF-8',
																												'Authorization': "Bearer " + tokenValue
																											  },
																											  data: {
																												allcountriesflag: false,
																												 searchlistid : `${country}_${city}_country_city_selected_online`,
																												 scoreH:SH,
												         														 offset:offset
											
																											  }
																											};
												
																							let responseX = await callAxios(options);
																							let response = responseX.data;
											
																							
																							if(response){
																								
																								const mapedList =convertListToTwoArrays(response.list_of_results);
																								
																								resolve(mapedList);
																									 
																								
																									 
																							   } else {
																								   
																								   resolve({"message": "no response !"})
																							   }
																							  
																				
																						} catch(err) {
																							resolve({"message": err.message});
																						}		
												
																		  
																						
													  }).catch((err) => {console.log(err)});			
													
}

home.getCountryCitiesAgerangeSelectedOnline = function (country,ageRange, SH, offset) {

	// "allcountriesflag":false,
	// "searchlistid" : "${co}_${agerange}_country_cities_agerange_selected_online",
	// "country" : "",
	// "city" : "",
	// "agerange" : "",
	// "key":"",
	// "scoreH":"",
	// "offset":""
								
																  return new Promise(  async (resolve, reject) => {				
																						try {
																							
																							const tokenValue = getCookie("access_token",false);
																							const options = {
																											  url: '/availablesearch',
																											  method: 'POST',
																											  headers: {
																												'Accept': 'application/json',
																												'Content-Type': 'application/json;charset=UTF-8',
																												'Authorization': "Bearer " + tokenValue
																											  },
																											  data: {
																												allcountriesflag: false,
																												 searchlistid : `${country}_${ageRange}_country_cities_agerange_selected_online`,
																												 scoreH:SH,
																												 offset:offset
																											  }
																											};
												
																							let responseX = await callAxios(options);
																							let response = responseX.data;
											
																							
																							if(response){
																									
																								const mapedList =convertListToTwoArrays(response.list_of_results);
																								
																								resolve(mapedList);
																									 
																								
																									 
																							   } else {
																								   
																								   resolve({"message": "no response !"})
																							   }
																							  
																				
																						} catch(err) {
																							resolve({"message": err.message});
																						}		
												
																		  
																						
													  }).catch((err) => {console.log(err)});			
													
}


home.getCountryCityAgerangeSelectedOnline = function (country,city,ageRange, SH, offset) {

	// "allcountriesflag":false,
	// "searchlistid" : "${co}_${ci}_${ageRange}_country_city_agerange_selected_online",
	// "country" : "",
	// "city" : "",
	// "agerange" : "",
	// "key":"",
	// "scoreH":"",
	// "offset":""
								
																  return new Promise(  async (resolve, reject) => {				
																						try {
																							
																							const tokenValue = getCookie("access_token",false);
																							const options = {
																											  url: '/availablesearch',
																											  method: 'POST',
																											  headers: {
																												'Accept': 'application/json',
																												'Content-Type': 'application/json;charset=UTF-8',
																												'Authorization': "Bearer " + tokenValue
																											  },
																											  data: {
																												allcountriesflag: false,
																												 searchlistid : `${country}_${city}_${ageRange}_country_city_agerange_selected_online`,
																												 scoreH:SH,
																												 offset:offset
																											  }
																											};
												
																							let responseX = await callAxios(options);
																							let response = responseX.data;
											
																							if(response){
																									
																								const mapedList =convertListToTwoArrays(response.list_of_results);
																								
																								resolve(mapedList);
																									 
																									 
																							   } else {
																								   
																								   resolve({"message": "no response !"})
																							   }
																							  
																				
																						} catch(err) {
																							resolve({"message": err.message});
																						}		
												
																		  
																						
													  }).catch((err) => {console.log(err)});			
													
}



home.getselectedsearchprofiles =(searchlistid,SH,offset)=>{
	//console.log("searchlistid  from okta",searchlistid,SH,offset)
	
	// "searchlistid" : "EG_4_1_18-25_on",
    // "onlineflag" : true,
    // "scoreH":"",
    // "scoreL":"",
    // "offset":""

  	  return new Promise(  async (resolve, reject) => {				
																						try {
																							
																							const tokenValue = getCookie("access_token",false);
																							const options = {
																											  url: '/getselectedsearchprofiles',
																											  method: 'POST',
																											  headers: {
																												'Accept': 'application/json',
																												'Content-Type': 'application/json;charset=UTF-8',
																												'Authorization': "Bearer " + tokenValue
																											  },
																											  data: {
																									             searchlistid : searchlistid,
																												 onlineflag : true,
																												 scoreH:SH,
    																											 scoreL:"",
    																											 offset
											
																											  }
																											};
												
																							let responseX = await callAxios(options);
																							let response = responseX.data;
											
																							
																							   if(response){

																								const ReturnUsers=mapUserPhotoPath(response.list_of_results,searchlistid);
																								//console.log("ReturnUsers map Path in okta : ",ReturnUsers);
																								const mapedList =convertListToTwoArrays(ReturnUsers);
														     
																										resolve(mapedList);					 
																							   } else {
																								   
																								   resolve({"message": "no response !"})
																							   }
																				
																						} catch(err) {
																							resolve({"message": err.message});
																						}		
												
																		  
																						
													  }).catch((err) => {console.log(err)});			
													


}	


home.requestPhotoRead=()=>{

//http://128.199.32.156/api/requestphotoread?photo=0
  	  return new Promise(  async (resolve, reject) => {				
																						try {
																							
																							const tokenValue = getCookie("access_token",false);
																							const options = {
																											  url: '/requestphotoread?photo=0',
																											  method: 'POST',
																											  headers: {
																												'Accept': 'application/json',
																												'Content-Type': 'application/json;charset=UTF-8',
																												'Authorization': "Bearer " + tokenValue
																											  },
																											//   data: {
																									        //     
																											//   }
																											};
												
																							let responseX = await callAxios(options);
																							let response = responseX.data;
											
																						
																							
																							   if(response){
																										resolve(response);					 
																							   } else {
																								   
																								   resolve({"message": "no response !"})
																							   }
																				
																						} catch(err) {
																							resolve({"message": err.message});
																						}		
												
																		  
																						
													  }).catch((err) => {console.log(err)});			
													


}


//// OFFLINE

home.getAllCountriesOffline = function (SH, offset) {

	// "allcountriesflag": true,
    // "searchlistid" : "all_countries_offline",
    // "country" : "",
    // "city" : "",
    // "agerange" : "",
    // "key":"",
    // "scoreH":"",
    // "offset":""
					  return new Promise(  async (resolve, reject) => {				
											try {
												
												const tokenValue = getCookie("access_token",false);
												const options = {
																  url: '/availablesearch',
																  method: 'POST',
																  headers: {
																	'Accept': 'application/json',
																	'Content-Type': 'application/json;charset=UTF-8',
																	'Authorization': "Bearer " + tokenValue
																  },
																  data: {
																	allcountriesflag: true,
																     searchlistid : "all_countries_recent",
																	 scoreH:SH,
																	 offset:offset
																  }
																};
	
												let responseX = await callAxios(options);
												let response = responseX.data;

												
												   if(response){
																	//resolve(response);	
												     const mapedList =convertListToTwoArrays(response.list_of_results);
													 											
													resolve(mapedList);				 
												   } else {
													   
													   resolve({"message": "no response !"})
												   }
									
											} catch(err) {
												resolve({"message": err.message});
											}		
	
					  		
											
		  }).catch((err) => {console.log(err)});			
		
}

home.getAllCountriesOfflineUsers = function (country,SL,offset) {
	
						  return new Promise(  async (resolve, reject) => {				
												try {
													let users= await home.getCountryRecentActiveUsers(country,"",SL,offset);
													
													   if(users){
														// const mapedList =convertListToTwoArrays(users);
														// console.log("usersArr, timeScoreArr from okta" ,mapedList);
														// resolve(mapedList)
														resolve(users);
																					 
													   } else {
														   
														   resolve({"message": "no response !"})
													   }
										
												} catch(err) {
													resolve({"message": err.message});
												}		
		
								  
												
			  }).catch((err) => {console.log(err)});			
			
}

home.getCountryCitiesOffline = function (country, SH, offset ) {

		// "allcountriesflag": false,
		// "searchlistid" : "EG_country_cities_offline",
		// "country" : "",
		// "city" : "",
		// "agerange" : "",
		// "key":"",
		// "scoreH":"",
		// "offset":""
							  return new Promise(  async (resolve, reject) => {				
													try {
														
														const tokenValue = getCookie("access_token",false);
														const options = {
																		  url: '/availablesearch',
																		  method: 'POST',
																		  headers: {
																			'Accept': 'application/json',
																			'Content-Type': 'application/json;charset=UTF-8',
																			'Authorization': "Bearer " + tokenValue
																		  },
																		  data: {
																			allcountriesflag: false,
																			 searchlistid : `${country}_country_cities_recent`,
																			 scoreH:SH,
																			 offset:offset
																		  }
																		};
			
														let responseX = await callAxios(options);
														let response = responseX.data;
		
														   if(response){
																		//	resolve(response);
																		const mapedList =convertListToTwoArrays(response.list_of_results);
																								
													resolve(mapedList);						 
														   } else {
															   
															   resolve({"message": "no response !"})
														   }
											
													} catch(err) {
														resolve({"message": err.message});
													}		
			
									  
													
				  }).catch((err) => {console.log(err)});			
				
			}	


home.getCountryRecentActiveUsers = function (country,SL,SH,offset) {

	// "searchlistid" :"EG_country_recent_active_users",
    // "onlineflag" : false,
    // "scoreH":"",
    // "scoreL":"",
    // "offset":""
			
									  return new Promise(  async (resolve, reject) => {				
															try {
																
																const tokenValue = getCookie("access_token",false);
																const options = {
																				  url: '/getselectedsearchprofiles',
																				  method: 'POST',
																				  headers: {
																					'Accept': 'application/json',
																					'Content-Type': 'application/json;charset=UTF-8',
																					'Authorization': "Bearer " + tokenValue
																				  },
																				  data: {
																					 searchlistid : `${country}_country_recent_active_users`,
																					 onlineflag : false,
																					 scoreH:SH,
																					 scoreL:SL,
																					 offset
				
																				  }
																				};
					
																let responseX = await callAxios(options);
																let response = responseX.data;
				
																
																   if(response){
																	
																	const ReturnUsers=mapUserPhotoPath(response.list_of_results,country);
																	
																	const mapedList =convertListToTwoArrays(ReturnUsers);
													            
																								
													                resolve(mapedList);	
																						 
																   } else {
																	   
																	   resolve({"message": "no response !"})
																   }
													
															} catch(err) {
																resolve({"message": err.message});
															}		
					
											  
															
						  }).catch((err) => {console.log(err)});			
						
					}	
					
home.getCountryCityRecentActiveUsers = function (country,city,SH,SL,offset) {

						// "searchlistid" : "${co}_${ci}_country_city_recent_active_users",
						// "onlineflag" : false,
						// "scoreH":"",
						// "scoreL":"",
						// "offset":""
									
														  return new Promise(  async (resolve, reject) => {				
																				try {
																					
																					const tokenValue = getCookie("access_token",false);
																					const options = {
																									  url: '/getselectedsearchprofiles',
																									  method: 'POST',
																									  headers: {
																										'Accept': 'application/json',
																										'Content-Type': 'application/json;charset=UTF-8',
																										'Authorization': "Bearer " + tokenValue
																									  },
																									  data: {
																										 searchlistid : `${country}_${city}_country_city_recent_active_users`,
																										 onlineflag : false,
																										 scoreH:SH,
																										 scoreL:SL,
																										 offset
																									  }
																									};
										
																					let responseX = await callAxios(options);
																					let response = responseX.data;
									
																					   if(response){
																						
																						const ReturnUsers=mapUserPhotoPath(response.list_of_results,country);
																						const mapedList =convertListToTwoArrays(ReturnUsers);
																					    resolve(mapedList);	
																						
																						resolve(ReturnUsers);					 
																					   } else {
																						   
																						   resolve({"message": "no response !"})
																					   }
																		
																				} catch(err) {
																					resolve({"message": err.message});
																				}		
										
																  
																				
											  }).catch((err) => {console.log(err)});			
											
										}				
///////////////////////////////////////////////////////////////////////////////////////////


tokenManagerOperations.clearAllTokens = function (key) {
	
	
					removeCookie(key)
					return;
}

tokenManagerOperations.setTokenAndValidate = function (key,value) {
			      return new Promise(  (resolve, reject) => {				
										
								
										if(!key) {resolve(false);return;};
										
										setCookie(key,value);
										resolve(true);
					
												
									
      }).catch((err) => {console.log(err)});		
}



export {auth,tokenManagerOperations,home}