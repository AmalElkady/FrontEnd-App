import appLocaleData from "react-intl/locale-data/ar";
import saMessages from "../locales/ar_SA.json";
import saHMessages from "../locales/dataHome/ar_SA.json";
import saPMessages from "../locales/dataPrivacy/ar_SA.json";
import saProMessages from "../locales/dataProfile/ar_SA.json";
import saSMessages from "../locales/dataSetting/ar_SA.json";
import saSubMessages from "../locales/dataSubscribe/ar_SA.json";
const saLang = {
  messages: {
    ...saMessages,
    ...saHMessages,
    ...saPMessages,
    ...saProMessages,
    ...saSMessages,
    ...saSubMessages
  },
  locale: "ar-SA",
  data: appLocaleData
};
export default saLang;
