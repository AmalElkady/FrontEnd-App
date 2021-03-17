import appLocaleData from "react-intl/locale-data/en";
import enMessages from "../locales/en_US.json";
import enHMessages from "../locales/dataHome/en_US.json";
import enPMessages from "../locales/dataPrivacy/en_US.json";
import enProMessages from "../locales/dataProfile/en_US.json";
import enSMessages from "../locales/dataSetting/en_US.json";
import enSubMessages from "../locales/dataSubscribe/en_US.json";
import enMMessages from "../locales/dataMessages/en_US.json";
const EnLang = {
  messages: {
    ...enMessages,
    ...enHMessages,
    ...enPMessages,
    ...enProMessages,
    ...enSMessages,
    ...enSubMessages,
    ...enMMessages
  },
  locale: "en-US",
  data: appLocaleData
};
export default EnLang;
