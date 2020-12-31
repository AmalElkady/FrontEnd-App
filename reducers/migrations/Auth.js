export const authMigration = {
  1: previousVersionState => ({
	tokenSent: previousVersionState.tokenSent,
	passwordChanged: previousVersionState.passwordChanged,
	initURL: previousVersionState.initURL,
	authUser: previousVersionState.authUser,
	stepFlag: previousVersionState.stepFlag,
	phone: previousVersionState.phone,
	country: previousVersionState.country,
	city:previousVersionState.city,
  countryiso2:previousVersionState.countryiso2,
	name: previousVersionState.name,
	birth: previousVersionState.birth,
	martial: previousVersionState.martial,
	gender: previousVersionState.gender,
	mpUploadFlag: previousVersionState.mpUploadFlag
  })
};