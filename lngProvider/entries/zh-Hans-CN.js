import appLocaleData from "react-intl/locale-data/zh";
import zhMessages from "../locales/zh-Hans.json";
// import zhHMessages from "../locales/dataHome/zh-Hans.json";
// import zhPMessages from "../locales/dataPrivacy/zh-Hans.json";
// import zhProMessages from "../locales/dataProfile/zh-Hans.json";
// import zhSMessages from "../locales/dataSetting/zh-Hans.json";
// import zhSubMessages from "../locales/dataSubscribe/zh-Hans.json";
const ZhLan = {
  messages: {
    ...zhMessages
    // ...zhHMessages,
    // ...zhPMessages,
    // ...zhProMessages,
    // ...zhSMessages,
    // ...zhSubMessages
  },
  locale: "zh-Hans-CN",
  data: appLocaleData
};
export default ZhLan;
