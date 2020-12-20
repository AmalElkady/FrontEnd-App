import appLocaleData from "react-intl/locale-data/es";
import esMessages from "../locales/es_ES.json";
import esHMessages from "../locales/dataHome/es_ES.json";
import esPMessages from "../locales/dataPrivacy/es_ES.json";
import esProMessages from "../locales/dataProfile/es_ES.json";
import esSMessages from "../locales/dataSetting/es_ES.json";
import esSubMessages from "../locales/dataSubscribe/es_ES.json";
const esLang = {
  messages: {
    ...esMessages,
    ...esHMessages,
    ...esPMessages,
    ...esProMessages,
    ...esSMessages,
    ...esSubMessages
  },
  locale: "es",
  data: appLocaleData
};
export default esLang;
