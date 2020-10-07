export const authMigration = {
  1: previousVersionState => ({
	tokenSent: previousVersionState.tokenSent,
	passwordChanged: previousVersionState.passwordChanged,
	initURL: previousVersionState.initURL,
	authUser: previousVersionState.authUser,
	stepFlag: previousVersionState.stepFlag,
	phone: previousVersionState.phone,
	country: previousVersionState.country,
	name: previousVersionState.name,
	birth: previousVersionState.birth,
	martial: previousVersionState.martial,
	gender: previousVersionState.gender,
	mpUploadFlag: previousVersionState.mpUploadFlag
  })
};