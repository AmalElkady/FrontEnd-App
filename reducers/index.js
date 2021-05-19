import { persist } from "./services/reduxPersist";
import { createTransform } from "redux-persist";
//import createFilter from 'redux-persist-transform-filter';
import { combineReducers } from "redux";
import { settingsMigration } from "./migrations/Settings";
import { authMigration } from "./migrations/Auth";
import { homeMigration } from "./migrations/Home";
import { messagesMigration } from "./migrations/Messages";
import { createMigrate } from "redux-persist";
import Settings from "./Settings";
import ChatData from "./Chat";
import Contact from "./Contact";
import Mail from "./Mail";
import Auth from "./Auth";
import Home from "./Home";
import Profile from "./Profile";
import Interaction from "./Interaction";
import Messages from "./Messages";

const MIGRATION_DEBUG = false;

const settingsPersistConfig = {
  key: "settings",
  version: 1,
  whitelist: [
    "locale",
    "navigationStyle",
    "horizontalNavPosition",
    "isDirectionRTL",
    "darkTheme",
    "themeColor",
    "drawerType"
  ],
  migrate: createMigrate(settingsMigration, { debug: MIGRATION_DEBUG })
};

//const saveSubsetFilter = createFilter('auth', ['Foo.bar']); // nesting filter

const authPersistConfig = {
  key: "auth",
  version: 1,
  whitelist: [
    "tokenSent",
    "passwordChanged",
    "initURL",
    "authUser",
    "phone",
    "country",
    "city",
    "countryiso2",
    "name",
    "birth",
    "martial",
    "stepFlag",
    "gender",
    "mpUploadFlag",
    "haveConnectionChannel"
    //"haveConnectionPusher"
  ], //
  //transforms: [saveSubsetFilter],
  migrate: createMigrate(authMigration, { debug: MIGRATION_DEBUG })
};

// const transformTimestampMap = createTransform(
//   state => Array.from(state),
//   state => new Map(state)
// );

const transformTimestampMap = config =>
  createTransform(
    timestampMap => JSON.stringify(Array.from(timestampMap)),
    timestampMap => new Map(JSON.parse(timestampMap)),
    config
  );

const messagesPersistConfig = {
  key: "messages",
  version: 1,
  whitelist: [
    "timestampMap",
    "returnedProfilesOnlineStatus"
    // "clickedUserChat"
  ], //
  transforms: [transformTimestampMap({ whitelist: "timestampMap" })],
  migrate: createMigrate(messagesMigration, { debug: MIGRATION_DEBUG })
};

//persistCombineReducers(authPersistConfig, { form: formReducer });

const homePersistConfig = {
  key: "home",
  version: 1,
  whitelist: [
    //"allCountriesOffline",
    //"allCountriesOfflineUsers",
    //"countryCitiesOffline"
    // "countryRecentActiveUsers",
    //"countryCityRecentActiveUsers",
    // "searchState"
  ], //
  //transforms: [saveSubsetFilter],
  migrate: createMigrate(homeMigration, { debug: MIGRATION_DEBUG })
};

///////////////////////////////////////
/////////////////////////////////////
export default history =>
  combineReducers({
    settings: persist(settingsPersistConfig, Settings),
    chatData: ChatData,
    contacts: Contact,
    mail: Mail,
    home: Home,
    // home: persist(homePersistConfig, Home),
    profile: Profile,
    interaction: Interaction,
    auth: persist(authPersistConfig, Auth),
    messages: persist(messagesPersistConfig, Messages)
  });
