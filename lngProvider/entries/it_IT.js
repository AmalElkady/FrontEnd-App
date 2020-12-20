import appLocaleData from "react-intl/locale-data/it";
import saMessages from "../locales/it_IT.json";
// import itHMessages from "../locales/dataHome/it_IT.json";
// import itPMessages from "../locales/dataPrivacy/it_IT.json";
// import itProMessages from "../locales/dataProfile/it_IT.json";
// import itSMessages from "../locales/dataSetting/it_IT.json";
// import itSubMessages from "../locales/dataSubscribe/it_IT.json";
const saLang = {
  messages: {
    ...saMessages
    // ...itHMessages,
    // ...itPMessages,
    // ...itProMessages,
    // ...itSMessages,
    // ...itSubMessages
  },
  locale: "it-IT",
  data: appLocaleData
};
export default saLang;
