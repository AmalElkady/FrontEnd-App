import axios from "axios";
import {setCookie,removeCookie,getCookie} from '../util/session';
import base64url from 'base64url';
import imageCompression from 'browser-image-compression';

const auth = {};
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
				console.log("**********data*********");
				console.log(response);
				console.log("**********data*********");
				
				if(!response.data){
				resolve({"data" : {"message":"error"}});
				} else {
					
						if(response.data.token && response.data.status != "ACTIVE") {
								setCookie("access_token",response.data.token);
															
								if(response.data.verify) {
									resolve({"data" : {"response":"ok"}})
								} else if(response.data.signedRequest){
									 resolve({"data" : {"signedRequest":response.data.signedRequest}});
								}else {
									options.headers.Authorization = "Bearer " + response.data.token;
									response = await axiosRequest(options);
									resolve(response);								
								}
								
							} else if(response.data.message) {
								
								if(response.data.message == "unauthorized") {
									console.log("**********Authorization*********");
									removeCookie("access_token");
									resolve({"data" : {"code":"unauthorized","message":"unauthorized"}})
								} else {
									resolve(response);
								}
								
								
							} else {
								resolve(response);
							}	
						
					}
				
				} catch (error) {
					console.log(error);
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

auth.signInWithPhoneAndPassword = function (username,password,country) {
	
		      return new Promise(  async (resolve, reject) => {				

					if(username && password && country) {
						try {
							
							
							let options = {
										  url: '/loginaccess',
										  method: 'POST',
										  headers: {
											'Accept': 'application/json',
											'Content-Type': 'application/json;charset=UTF-8',
											
										  },
										  data: {
										     "phonecountrycode": country,
											"phone" : username,
											"password" : password
										  }
										};

							
										
													let resX = await callAxios(options);	
													
													let res = resX.data;
													
													console.log(res);
											
													if(res.response && res.status == "ACTIVE" && res.token){
													
															 console.log(res.token);	
															 let tokenUserData = JSON.parse(base64url.decode(`${res.token}`.split(".")[1]));															 
						
															 
															tokenManagerOperations.setTokenAndValidate("access_token",res.token);
															

															if(res.L1)
															resolve({"accessToken": "access_token", "n": res.L1.n, "m": res.L1.m, "b": res.L1.b, "gender":tokenUserData.gd});
															else
															resolve({"message": "profile not available"});	
															
													
													} else {
														resolve({"message": res.code});
													}
													
								
								
										
			  } catch (err) {
				  resolve({"message": err.message});
			  }
										  
			  }	else {
				  resolve({"message": "EMPTY"});
			  }															
									
      }).catch((err) => {console.log(err)});	
}


auth.createUserWithPhoneAndPassword = function (username,password,firstName,lastName,country,countryiso2, gender, year, month, day, city, martial) {

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
								 martial
							}



			      return new Promise(  async (resolve, reject) => {				
						
						
						console.log("newUser", newUser);
						
						if( (`${username}`.trim() !== '') && (`${password}`.trim() !== '') && (`${firstName}`.trim() !== '') && (`${lastName}`.trim() !== '') && (parseInt(gender) == 0 || parseInt(gender) == 1) ) {

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
												
												
													await tokenManagerOperations.setTokenAndValidate("access_token",response.token);
													resolve({"accessToken": "access_token","phone": newUser.phone, "country": newUser.country, "n": newUser.name, "m": newUser.martial, "b": `${newUser.year}${newUser.month}${newUser.day}`,"gender" : newUser.gender});
											
											
											} else {
												resolve({"message": response.code});
											}
												
										


							}catch(err) {
								console.log(err);
								resolve({"message": err});
							}									
				  } else {
					  
					  resolve({"message": "empty values not allowed !"});
					  
				  }
										
      }).catch((err) => {console.log(err)});			
	
}

auth.uploadMainProfilePhoto = function (file) {

		
			      return new Promise(  async (resolve, reject) => {				
						
						
						console.log(file);
						
						
						if(file) {

						console.log(file.size);
							try {
								
								//http:// /api/checkmpupload
								//http:// /api/requestphotoupload?photo=0
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
								
								console.log("DATA TO CHECK",checkMPUploadResponse.data);//IF APPROVED RETURN WITH SUCCESS 
								//IF MESSAGE RETURN ERORR
								//ELSE CONTINUE AND REQUEST PHOTO UPLOAD then USE RETURNED S3 SIGNED REQUEST TO UPLOAD PHOTO
									//IF UPLOADED --- > CALL (CHECK MP UPLOAD) RETURN SUCCESS
									//ELSE ------> RETURN ERROR
								
								if(checkMPUploadResponse.data.code == "CHECKMPUPLOAD_4" || checkMPUploadResponse.data.code == "CHECKMPUPLOAD_9") {
									
									
									optionsCheck.url = "/requestphotoupload?photo=0";
									optionsCheck.data = {'filetype':`${file.type}`.slice(5), 'filesize': file.size/*file.size*/}
									
								    let checkUploadRequestResponse = await callAxios(optionsCheck);
								    
									console.log(checkUploadRequestResponse.data);
									
								    		if(checkUploadRequestResponse.data.code) {
								    			resolve({"message": checkUploadRequestResponse.data.code});
								    		} else if(checkUploadRequestResponse.data.signedRequest) {
												
												console.log(checkUploadRequestResponse.data.signedRequest);
												//upload file axios
												//file
												let regx = /(?<=\/)(.*)(?=\?Content-Type=)/g
												let newName = `${checkUploadRequestResponse.data.signedRequest}`.match(regx)[0].split("/")[5]
												
											    //let newName = `${checkUploadRequestResponse.data.signedRequest}`.match(regx)[0].split("/s3-profile-photos.s3.me-south-1.amazonaws.com/")[1]
												const myNewFile = new File([file], newName, {type: file.type});
												
												console.log(newName);
												console.log("new file ", myNewFile);
												
												//let textData = await myNewFile.__proto__.__proto__.text();
												//console.log("new file ", textData);
												
												 		let bodyFormData = new FormData();
												 		bodyFormData.set('image', myNewFile, newName);
												 		//bodyFormData.append('name', fileName)

													
												 	//console.log("bodyFormData \n", bodyFormData);
												 	const uploadImageRequest = {
												 			method: 'PUT',
												 			url: checkUploadRequestResponse.data.signedRequest,
												 			content: bodyFormData,
												 		 	headers: {
												 		 		'content-type': 'multipart/form-data'//file.type
												 		 	}
												 		}
												 	
												 	console.log(uploadImageRequest);													
												 	//let imageUploadResult = await callAxios(uploadImageRequest);
													
													//    const UploadOptions = {
													//			  headers: {
													//				"Content-Type": myNewFile.type
													//			  }
													//			};
													let imageUploadResult = await axios.put(checkUploadRequestResponse.data.signedRequest, myNewFile, uploadImageRequest);
													
													console.log(imageUploadResult);
													
													if(imageUploadResult.data.message){
												    resolve({"message": imageUploadResult.data.message});
												    }else{
														await callAxios(optionsCheck);
														resolve(true);
													}
													//when resolve true refresh page (MPUpload)
													//when resolve true in create user refresh page (SignUp)
													
												
								    		} else {
												resolve({"message": "Error"});
											}
											
											
								} else {
									
									resolve({"message": checkMPUploadResponse.data.code});

								}
								
				
							}catch(err) {
								console.log(err);
								resolve({"message": err});
							}									
				  } else {
					  
					  resolve({"message": "empty values not allowed !"});
					  
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
					
						console.log(profileL2);
						
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
								console.log(err);
								resolve({"message": err});
							}									
				  } else {
					  
					  resolve({"message": "empty values not allowed !"});
					  
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
										 
											       console.log(response);
												   if(response){
														
														 if(response.response == "ok"){
															resolve({...response});
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
										 
											       console.log(response);
												   if(response){
														
														 if(response.response == "ok"){
															resolve({...response});
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
																countryiso2,
																phone : username,
															  }
															};

													let responseX = await callAxios(options);
													let response = responseX.data;
													//{"response" : "ok", "uid" : hw}
											       console.log(response);
												   if(response){
														
														 if(response.response == "ok"){
															resolve({"tokenReturned": "ok","hw": response.uid});
														 } else {
															resolve({"message": response.code});
														 }

														
												   } else {
													   resolve({"message": "Something Went Wrong !"});
												   }
										
											
								} catch(err) {
									//console.log(err.statusCode + ' error', err)
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
								console.log("token ==== " + tokenValue);		
								tokenManagerOperations.clearAllTokens("access_token");
								resolve(undefined);
								
												
									
      }).catch((err) => {console.log(err)});		
}


///////////////////////////////////////////////////////////////////////////////////////////


tokenManagerOperations.clearAllTokens = function (key) {
	
	
					removeCookie(key)
					return;
}

tokenManagerOperations.setTokenAndValidate = function (key,value) {
			      return new Promise(  (resolve, reject) => {				
										
										console.log(key);
										
										if(!key) {resolve(false);return;};
										
										setCookie(key,value);
										resolve(true);
					
												
									
      }).catch((err) => {console.log(err)});		
}



export {auth,tokenManagerOperations}