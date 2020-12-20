import appLocaleData from "react-intl/locale-data/fr";
import frMessages from "../locales/fr_FR.json";
import frHMessages from "../locales/dataHome/fr_FR.json";
import frPMessages from "../locales/dataPrivacy/fr_FR.json";
import frProMessages from "../locales/dataProfile/fr_FR.json";
import frSMessages from "../locales/dataSetting/fr_FR.json";
import frSubMessages from "../locales/dataSubscribe/fr_FR.json";
const frLang = {
  messages: {
    ...frMessages,
    ...frHMessages,
    ...frPMessages,
    ...frProMessages,
    ...frSMessages,
    ...frSubMessages
  },
  locale: "fr-FR",
  data: appLocaleData
};
export default frLang;
