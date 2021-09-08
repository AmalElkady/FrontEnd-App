export const authMigration = {
  1: previousVersionState => ({
    tokenSent: previousVersionState.tokenSent,
    passwordChanged: previousVersionState.passwordChanged,
    initURL: previousVersionState.initURL,
    authUser: previousVersionState.authUser,
    jnt: previousVersionState.jnt,
    sub: previousVersionState.sub,
    stepFlag: previousVersionState.stepFlag,
    phone: previousVersionState.phone,
    country: previousVersionState.country,
    city: previousVersionState.city,
    countryiso2: previousVersionState.countryiso2,
    name: previousVersionState.name,
    birth: previousVersionState.birth,
    martial: previousVersionState.martial,
    gender: previousVersionState.gender,
    mpUploadFlag: previousVersionState.mpUploadFlag,
    noteFlag: previousVersionState.noteFlag,
    //  haveConnection: previousVersionState.haveConnection
    //haveConnectionPusher: previousVersionState.haveConnectionPusher,
    haveConnectionChannel: previousVersionState.haveConnectionChannel
  })
};
