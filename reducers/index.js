import { persist } from "./services/reduxPersist";
//import createFilter from 'redux-persist-transform-filter';
import { combineReducers } from "redux";
import { settingsMigration } from "./migrations/Settings";
import { authMigration } from "./migrations/Auth";
import { createMigrate } from "redux-persist";
import Settings from "./Settings";
import ChatData from "./Chat";
import Contact from "./Contact";
import Mail from "./Mail";
import Auth from "./Auth";

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
    "name",
    "birth",
    "martial",
    "stepFlag",
    "gender",
    "mpUploadFlag"
  ], //
  //transforms: [saveSubsetFilter],
  migrate: createMigrate(authMigration, { debug: MIGRATION_DEBUG })
};

//persistCombineReducers(authPersistConfig, { form: formReducer });

///////////////////////////////////////
/////////////////////////////////////

export default history =>
  combineReducers({
    settings: persist(settingsPersistConfig, Settings),
    chatData: ChatData,
    contacts: Contact,
    mail: Mail,
    auth: persist(authPersistConfig, Auth)
  });
