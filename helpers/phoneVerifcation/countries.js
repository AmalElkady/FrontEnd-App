//https://benchmarkjs.com/
let countries = {
  AF: {
    name: "Afghanistan",
    iso2: "AF",
    code: "93",
    phoneRegex: /^(([7]{1}[0|1|2|3|4|5|7|8|9]{1})|(24))[0-9]{7}$/
  },
  AL: {
    name: "Albania",
    iso2: "AL",
    code: "355",
    phoneRegex: /^[6]{1}[2|5|6|7|8|9]{1}[0-9]{7}$/
  },
  DZ: {
    name: "Algeria",
    iso2: "DZ",
    code: "213",
    phoneRegex: /^[5|6|7]{1}[0-9]{8}$/
  },
  AS: {
    name: "American Samoa",
    iso2: "AS",
    code: "1684",
    phoneRegex: /^(684)[0-9]{7}$/
  },
  AD: {
    name: "Andorra",
    iso2: "AD",
    code: "376"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  AO: {
    name: "Angola",
    iso2: "AO",
    code: "244"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  AI: {
    name: "Anguilla",
    iso2: "AI",
    code: "1264"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  AQ: {
    name: "Antarctica",
    iso2: "AQ",
    code: "672"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  AG: {
    name: "Antigua And Barbuda",
    iso2: "AG",
    code: "1268"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  AR: {
    name: "Argentina",
    iso2: "AR",
    code: "54"
    //   phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  AM: {
    name: "Armenia",
    iso2: "AM",
    code: "374"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  AW: {
    name: "Aruba",
    iso2: "AW",
    code: "297"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  AC: {
    name: "Ascension Island",
    iso2: "AC",
    code: "247"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  AU: {
    name: "Australia",
    iso2: "AU",
    code: "61"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  AT: {
    name: "Austria",
    iso2: "AT",
    code: "43"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  AZ: {
    name: "Azerbaijan",
    iso2: "AZ",
    code: "994",
    phoneRegex: /^[41|50|51|55|70|77|99]{2}[0-9]{7}?$/
  },
  BS: {
    name: "Bahamas",
    iso2: "BS",
    code: "1242"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  BH: {
    name: "Bahrain",
    iso2: "BH",
    code: "973",
    phoneRegex: /^([3]{1}([1|3|6|9]{1}[0-9]{6}|[34]{2}[0|1|3|4|5]{1}[0-9]{5}|[35]{2}[3|5]{1}[0-9]{5}|[38]{2}[3|4|8]{1}[0-9]{5}|[377]{3}[0-9]{5}))|([66]{2}[3|6|9]{1}[0-9]{5})$/
  },
  BD: {
    name: "Bangladesh",
    iso2: "BD",
    code: "880",
    phoneRegex: /^[1]{1}[3|4|5|6|7|8|9]{1}[0-9]{8}$/
  },
  BB: {
    name: "Barbados",
    iso2: "BB",
    code: "1246"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  BY: {
    name: "Belarus",
    iso2: "BY",
    code: "375"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  BE: {
    name: "Belgium",
    iso2: "BE",
    code: "32"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  BZ: {
    name: "Belize",
    iso2: "BZ",
    code: "501"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  BJ: {
    name: "Benin",
    iso2: "BJ",
    code: "229",
    phoneRegex: /^[9]{1}[0-9]{1}[0-9]{6,9}?$/
  },
  BM: {
    name: "Bermuda",
    iso2: "BM",
    code: "1441"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  BT: {
    name: "Bhutan",
    iso2: "BT",
    code: "975"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  BO: {
    name: "Bolivia, Plurinational State Of",
    iso2: "BO",
    code: "591"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  BQ: {
    name: "Bonaire, Saint Eustatius And Saba",
    iso2: "BQ",
    code: "599"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  BA: {
    name: "Bosnia & Herzegovina",
    iso2: "BA",
    code: "387",
    phoneRegex: /^[6]{1}[0|2|3|4|5|6|9]{1}[0-9]{6}$/
  },
  BW: {
    name: "Botswana",
    iso2: "BW",
    code: "267"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  BR: {
    name: "Brazil",
    iso2: "BR",
    code: "55"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  IO: {
    name: "British Indian Ocean Territory",
    iso2: "IO",
    code: "246"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  BN: {
    name: "Brunei Darussalam",
    iso2: "BN",
    code: "673"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  BG: {
    name: "Bulgaria",
    iso2: "BG",
    code: "359",
    phoneRegex: /^([8]{1}[7|8|9]{1}[0-9]{6})([988]{3}[0-9]{5})$/
  },
  BF: {
    name: "Burkina Faso",
    iso2: "BF",
    code: "226",
    phoneRegex: /^[7]{1}[0|1|2|4|5|7|8|9]{1}[0-9]{6}$/
  },
  BI: {
    name: "Burundi",
    iso2: "BI",
    code: "257"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  KH: {
    name: "Cambodia",
    iso2: "KH",
    code: "855"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  CM: {
    name: "Cameroon",
    iso2: "CM",
    code: "237",
    phoneRegex: /^[7|9]{1}[0-9]{8}$/
  },
  CA: {
    name: "Canada",
    iso2: "CA",
    code: "1",
    phoneRegex: /^[2-9]{1}((0[1-9])|(1[2-9])|(2[03-68-9])|(3[1469])|(4[089])|(5[0-46])|(6[0279])|(7[0269])|(8[19]))[0-9]{7}$/
  },
  CV: {
    name: "Cape Verde",
    iso2: "CV",
    code: "238"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  KY: {
    name: "Cayman Islands",
    iso2: "KY",
    code: "1345"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  CF: {
    name: "Central African Republic",
    iso2: "CF",
    code: "236"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  TD: {
    name: "Chad",
    iso2: "TD",
    code: "235",
    phoneRegex: /^(([6]{1}[3|5|6]{1})|([9]{1}[0|3|5|9]{1})|([77]{2}))[0-9]{6}$/
  },
  CL: {
    name: "Chile",
    iso2: "CL",
    code: "56"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  CN: {
    name: "China",
    iso2: "CN",
    code: "86",
    phoneRegex: /^(([13,15,18,19]{2}[0-9]{1}[0-9]{8})|([14]{2}[0,1,2,3,4,5,6,8]{1}[0-9]{10})|([14]{2}[5,7,9]{1}[0-9]{8})|([17]{2}[0-8]{1}[0-9]{8})|([16]{2}[1,2,4,5,6,7]{1}[0-9]{8}))$/
  },
  CX: {
    name: "Christmas Island",
    iso2: "CX",
    code: "61"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  CC: {
    name: "Cocos (Keeling) Islands",
    iso2: "CC",
    code: "61"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  CO: {
    name: "Colombia",
    iso2: "CO",
    code: "57"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  KM: {
    name: "Comoros",
    iso2: "KM",
    code: "269",
    phoneRegex: /^[3]{1}[0-9]$/
  },
  CK: {
    name: "Cook Islands",
    iso2: "CK",
    code: "682"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  CR: {
    name: "Costa Rica",
    iso2: "CR",
    code: "506"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  CI: {
    name: "Cote d'Ivoire",
    iso2: "CI",
    code: "225",
    phoneRegex: /^[0|6]{1}[0-9]{1}[0-9]?/
  },
  HR: {
    name: "Croatia",
    iso2: "HR",
    code: "385"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  CU: {
    name: "Cuba",
    iso2: "CU",
    code: "53"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  CW: {
    name: "Curacao",
    iso2: "CW",
    code: "599"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  CY: {
    name: "Cyprus",
    iso2: "CY",
    code: "357"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  CZ: {
    name: "Czech Republic",
    iso2: "CZ",
    code: "420"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  CD: {
    name: "Democratic Republic Of Congo",
    iso2: "CD",
    code: "243"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  DK: {
    name: "Denmark",
    iso2: "DK",
    code: "45"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  DJ: {
    name: "Djibouti",
    iso2: "DJ",
    code: "253",
    phoneRegex: /^[8]{1}[0-9]{7}$/
  },
  DM: {
    name: "Dominica",
    iso2: "DM",
    code: "1767"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  DO: {
    name: "Dominican Republic",
    iso2: "DO",
    code: "1809"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  TL: {
    name: "East Timor",
    iso2: "TL",
    code: "670"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  EC: {
    name: "Ecuador",
    iso2: "EC",
    code: "593"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  EG: {
    name: "Egypt",
    iso2: "EG",
    code: "20",
    phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  SV: {
    name: "El Salvador",
    iso2: "SV",
    code: "503"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  GQ: {
    name: "Equatorial Guinea",
    iso2: "GQ",
    code: "240"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  ER: {
    name: "Eritrea",
    iso2: "ER",
    code: "291"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  EE: {
    name: "Estonia",
    iso2: "EE",
    code: "372"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  ET: {
    name: "Ethiopia",
    iso2: "ET",
    code: "251"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  EU: {
    name: "European Union",
    iso2: "EU",
    code: "388"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  FK: {
    name: "Falkland Islands",
    iso2: "FK",
    code: "500"
    //   phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  FO: {
    name: "Faroe Islands",
    iso2: "FO",
    code: "298"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  FJ: {
    name: "Fiji",
    iso2: "FJ",
    code: "679"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  FI: {
    name: "Finland",
    iso2: "FI",
    code: "358"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  FR: {
    name: "France",
    iso2: "FR",
    code: "33",
    phoneRegex: /^(([6]{1}[0-9]{8})|([700]{3}[0-9]{6})|([7]{1}[3|4|5|6|7|8]{1}[0-9]{7}))$/
  },
  FX: {
    name: "France, Metropolitan",
    iso2: "FX",
    code: "241"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  GF: {
    name: "French Guiana",
    iso2: "GF",
    code: "594"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  PF: {
    name: "French Polynesia",
    iso2: "PF",
    code: "689"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  GA: {
    name: "Gabon",
    iso2: "GA",
    code: "241"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  GM: {
    name: "Gambia",
    iso2: "GM",
    code: "220",
    phoneRegex: /^[7,9]{1}[0-9]{1}[0-9]{4,5}$/
  },
  GE: {
    name: "Georgia",
    iso2: "GE",
    code: "594"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  DE: {
    name: "Germany",
    iso2: "DE",
    code: "49",
    phoneRegex: /^(([15]{2}[1|2|5|7|9]{1}[0-9]{1}[0-9]{8})|([160]{3}[0-9]{7,8})|([16]{2}[2|3]{1}[0-9]{7})|([17]{2}[0|1|2|3|4|5|7|8|9]{1}[0-9]{7})|([17]{2}[6]{1}[0-9]{8}))$/
  },
  GH: {
    name: "Ghana",
    iso2: "GH",
    code: "233",
    phoneRegex: /^(([2]{1}[0|3|4|6|7|8]{1}[0-9]{7})|([5]{1}[0|4|5|6|7|9]{1}[0-9]{7}))$/
  },
  GI: {
    name: "Gibraltar",
    iso2: "GI",
    code: "350"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  GR: {
    name: "Greece",
    iso2: "GR",
    code: "30"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  GL: {
    name: "Greenland",
    iso2: "GL",
    code: "299"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  GD: {
    name: "Grenada",
    iso2: "GD",
    code: "995"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  GP: {
    name: "Guadeloupe",
    iso2: "GP",
    code: "590"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  GU: {
    name: "Guam",
    iso2: "GU",
    code: "1671"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  GT: {
    name: "Guatemala",
    iso2: "GT",
    code: "502"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  GN: {
    name: "Guinea",
    iso2: "GN",
    code: "224",
    phoneRegex: /^[6]{1}[0-9]{8}$/
  },
  GW: {
    name: "Guinea-bissau",
    iso2: "GW",
    code: "245",
    phoneRegex: /^[6,7]{1}[0-9]?/
  },
  GY: {
    name: "Guyana",
    iso2: "GY",
    code: "592"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  HT: {
    name: "Haiti",
    iso2: "HT",
    code: "509"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  HN: {
    name: "Honduras",
    iso2: "HN",
    code: "504"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  HK: {
    name: "Hong Kong",
    iso2: "HK",
    code: "852"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  HU: {
    name: "Hungary",
    iso2: "HU",
    code: "36"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  IS: {
    name: "Iceland",
    iso2: "IS",
    code: "354"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  IN: {
    name: "India",
    iso2: "IN",
    code: "91",
    phoneRegex: /^(([5,7,8]{1}[0-9]{2}[0-9]{7})|([9]{1}[0|1|2|3|4|5|6|7|8]{1}[0-9]{7}))$/
  },
  ID: {
    name: "Indonesia",
    iso2: "ID",
    code: "62",
    phoneRegex: /^(([81]{2}[1|8|6|7]{1}[0-9]{6})|([81]{2}[2|5|6|7|9]{1}[0-9]{7})|([81]{2}[2|3|4]{1}[0-9]{8})|([838]{3}[0-9]{7})|([85]{2}[2|3|6|8|9]{1}[0-9]{8})|([85]{2}[5|6]{1}[0-9]{7})|([878]{3}[0-9]{8})|([89]{2}[6|7|8|9]{1}[0-9]{7}))$/
  },
  IR: {
    name: "Iran, Islamic Republic Of",
    iso2: "IR",
    code: "98",
    phoneRegex: /^(([92]{2}[0|1|2]{1})|([99]{2}[0]{1})|([93]{2}[1-9]{1}))[0-9]{7}$/
  },
  IQ: {
    name: "Iraq",
    iso2: "IQ",
    code: "964",
    phoneRegex: /^[7]{1}[3|4|5|6|7|8]{1}[0-9]{1}[0-9]{7}$/
  },
  IE: {
    name: "Ireland",
    iso2: "IE",
    code: "353"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  IM: {
    name: "Isle Of Man",
    iso2: "IM",
    code: "44"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  IL: {
    name: "Israel",
    iso2: "IL",
    code: "972"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  IT: {
    name: "Italy",
    iso2: "IT",
    code: "39",
    phoneRegex: /^(([31]{2}[0|3|9]{1}[0-9]{7})|([31]{2}[100|101|105]{3}[0-9]{5})|([32]{2}(([0|4|5|6|7|8|9]{1}[0-9]{7})|([2]{1}[0-9]{11})|([3]{1}[0-9]{10})))|([33]{2}(([1|3|4|8|9]{1}[0-9]{7})|([0|5|6|7]{1}[0-9]{7,8})))|([34]{2}(([0|2|4|5|6|7|8|9]{1}[0-9]{7})|([1]{1}[0-9]{11})|([3]{1}[0-9]{10})))|([35]{2}[05|10|12]{2}[0-9]{5})|([36]{2}(([0|8]{1}[0-9]{7,8})|([1|2]{1}[0-9]{11})|([6]{1}[0-9]{7})|([3]{1}[0-9]{10})))|([37]{2}(([0|3|7]{1}[0-9]{7})|([1]{1}[0|1]{1}[0-9]{6})))|([38]{2}(([0|5|8|9]{1}[0-9]{7})|([1|2]{1}[0-9]{11})|([3]{1}[0-9]{10})))|([39]{2}(([0|7]{1}[0-9]{11})|([1|2|3]{1}[0-9]{7}))))$/
  },
  JM: {
    name: "Jamaica",
    iso2: "JM",
    code: "1876"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  JP: {
    name: "Japan",
    iso2: "JP",
    code: "81"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  JE: {
    name: "Jersey",
    iso2: "JE",
    code: "44"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  JO: {
    name: "Jordan",
    iso2: "JO",
    code: "962",
    phoneRegex: /^[7]{1}[7|8|9]{1}([0-9]?)/
  },
  KZ: {
    name: "Kazakhstan",
    iso2: "KZ",
    code: "7"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  KE: {
    name: "Kenya",
    iso2: "KE",
    code: "254",
    phoneRegex: /^(([7]{1}[0-8]{1}[0-9]{1}[0-9]{7})|([1]{1}[0|1]{1}[0-9]{1}[0-9]{7}))$/
  },
  KI: {
    name: "Kiribati",
    iso2: "KI",
    code: "686"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  KP: {
    name: "Korea, Democratic People's Republic Of",
    iso2: "KP",
    code: "850"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  KR: {
    name: "Korea, Republic Of",
    iso2: "KR",
    code: "82"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  KW: {
    name: "Kuwait",
    iso2: "KW",
    code: "965",
    phoneRegex: /^[5|6|9]{1}[0-9]{7}?$/
  },
  KG: {
    name: "Kyrgyzstan",
    iso2: "KG",
    code: "996",
    phoneRegex: /^[5]{1}[0-9]{2}[0-9]?/
  },
  LA: {
    name: "Lao People's Democratic Republic",
    iso2: "LA",
    code: "856"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  LV: {
    name: "Latvia",
    iso2: "LV",
    code: "371"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  LB: {
    name: "Lebanon",
    iso2: "LB",
    code: "961",
    phoneRegex: /^(([3]{1})|([7]{1}[0|1|6]{1}))[0-9]{6}$/
  },
  LS: {
    name: "Lesotho",
    iso2: "LS",
    code: "266"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  LR: {
    name: "Liberia",
    iso2: "LR",
    code: "231",
    phoneRegex: /^(((([6]{1}[4|5]{1})|([4]{1}[6|7]{1}))[0-9]{5})|([7]{1}[0-9]{7})|([5]{1}[0-9]{6}))$/
  },
  LY: {
    name: "Libya",
    iso2: "LY",
    code: "218",
    phoneRegex: /^[9]{1}[1|2|4]{1}[0-9]{8}$/
  },
  LI: {
    name: "Liechtenstein",
    iso2: "LI",
    code: "423"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  LT: {
    name: "Lithuania",
    iso2: "LT",
    code: "370"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  LU: {
    name: "Luxembourg",
    iso2: "LU",
    code: "352"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  MO: {
    name: "Macao",
    iso2: "MO",
    code: "853"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  MK: {
    name: "Macedonia, The Former Yugoslav Republic Of",
    iso2: "MK",
    code: "389",
    phoneRegex: /^[7]{1}[0-9]{1}[0-9]{6}$/
  },
  MG: {
    name: "Madagascar",
    iso2: "MG",
    code: "261",
    phoneRegex: /^[3]{1}[0-9]{1}[0-9]?/
  },
  MW: {
    name: "Malawi",
    iso2: "MW",
    code: "265",
    phoneRegex: /^[8|9]{1}[0-9]{8}$/
  },
  MY: {
    name: "Malaysia",
    iso2: "MY",
    code: "60",
    phoneRegex: /^[1]{1}(([0|2|3|4|5|6|7|8|9]{1}[0-9]{6})|([1]{1}[0-9]{7}))$/
  },
  MV: {
    name: "Maldives",
    iso2: "MV",
    code: "960",
    phoneRegex: /^[7|9]{1}[0-9]{6}$/
  },
  ML: {
    name: "Mali",
    iso2: "ML",
    code: "223",
    phoneRegex: /^(([6|7]{1}[0-9]{7}$)|([3|4|5]{1}[0-9]?))/
  },
  MT: {
    name: "Malta",
    iso2: "MT",
    code: "356"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  MH: {
    name: "Marshall Islands",
    iso2: "MH",
    code: "692"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  MQ: {
    name: "Martinique",
    iso2: "MQ",
    code: "596"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  MR: {
    name: "Mauritania",
    iso2: "MR",
    code: "222",
    phoneRegex: /^[6]{1}[0-9]?/
  },
  MU: {
    name: "Mauritius",
    iso2: "MU",
    code: "230"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  YT: {
    name: "Mayotte",
    iso2: "YT",
    code: "262"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  MX: {
    name: "Mexico",
    iso2: "MX",
    code: "52"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  FM: {
    name: "Micronesia, Federated States Of",
    iso2: "FM",
    code: "691"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  MD: {
    name: "Moldova",
    iso2: "MD",
    code: "373"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  MC: {
    name: "Monaco",
    iso2: "MC",
    code: "377"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  MN: {
    name: "Mongolia",
    iso2: "MN",
    code: "976"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  MN: {
    name: "Montenegro",
    iso2: "ME",
    code: "382"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  MS: {
    name: "Montserrat",
    iso2: "MS",
    code: "1664"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  MA: {
    name: "Morocco",
    iso2: "MA",
    code: "212",
    phoneRegex: /^[6|7]{1}[0-9]{8}?$/
  },
  MZ: {
    name: "Mozambique",
    iso2: "MZ",
    code: "258"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  MM: {
    name: "Myanmar",
    iso2: "MM",
    code: "95",
    phoneRegex: /^(([92]{2}[0-9]{6})|([92]{2}[5|6]{1}[0-9]{7})|([94]{2}[0-9]{7})|([94]{2}[3|4]{1}[0-9]{6})|([95|96]{2}[0-9]{6})|([973|991]{3}[0-9]{6})|([93]{2}[0-9]{7})|([99]{2}[6|7]{1}[0-9]{7})|([97]{2}[7|8|9]{1}[0-9]{7}))$/
  },
  NA: {
    name: "Namibia",
    iso2: "NA",
    code: "264"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  NR: {
    name: "Nauru",
    iso2: "NR",
    code: "674"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  NP: {
    name: "Nepal",
    iso2: "NP",
    code: "977"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  NL: {
    name: "Netherlands",
    iso2: "NL",
    code: "31"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  NC: {
    name: "New Caledonia",
    iso2: "NC",
    code: "687"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  NZ: {
    name: "New Zealand",
    iso2: "NZ",
    code: "64"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  NI: {
    name: "Nicaragua",
    iso2: "NI",
    code: "505"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  NE: {
    name: "Niger",
    iso2: "NE",
    code: "227",
    phoneRegex: /^[9]{1}[0-9]{7}$/
  },
  NG: {
    name: "Nigeria",
    iso2: "NG",
    code: "234",
    phoneRegex: /^[80]{1}[2|3|4|5|9]{1}[0-9]{5}$/
  },
  NU: {
    name: "Niue",
    iso2: "NU",
    code: "683"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  NF: {
    name: "Norfolk Island",
    iso2: "NF",
    code: "672"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  MP: {
    name: "Northern Mariana Islands",
    iso2: "MP",
    code: "1670"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  NO: {
    name: "Norway",
    iso2: "NO",
    code: "47"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  OM: {
    name: "Oman",
    iso2: "OM",
    code: "968",
    phoneRegex: /^[9]{1}[1-9]{1}[0-9]{6}$/
  },
  PK: {
    name: "Pakistan",
    iso2: "PK",
    code: "92",
    phoneRegex: /^[3]{1}[0-9]{1}[0-9]{1}[0-9]{7}$/
  },
  PW: {
    name: "Palau",
    iso2: "PW",
    code: "680"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  PS: {
    name: "Palestinian Territory, Occupied",
    iso2: "PS",
    code: "970",
    phoneRegex: /^[5]{1}[6|9]{1}[0-9]{7}$/
  },
  PA: {
    name: "Panama",
    iso2: "PA",
    code: "507"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  PG: {
    name: "Papua New Guinea",
    iso2: "PG",
    code: "675"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  PY: {
    name: "Paraguay",
    iso2: "PY",
    code: "595"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  PE: {
    name: "Peru",
    iso2: "PE",
    code: "51"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  PH: {
    name: "Philippines",
    iso2: "PH",
    code: "63",
    phoneRegex: /^(([97]{2}[3|4|7|9]{1})|([92]{2}[0|1|2|3|6|7|8|9]{1})|([93]{2}[0|2|3|5|6|7|8|9]{1})|([94]{2}[2|3|7|8|9]{1})|([91]{2}[0|2|5|6|7|8|9]{1})|([90]{2}[5|6|7|8|9]{1})|([989]{3})|([99]{2}[6|7|9]{1}))[0-9]{7}$/
  },
  PL: {
    name: "Poland",
    iso2: "PL",
    code: "48"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  PT: {
    name: "Portugal",
    iso2: "PT",
    code: "351",
    phoneRegex: /^(([9]{1}(([1|3|6]{1})|([2]{1}[1|2|4|5|6|7]{1}))[0-9]{7})|([929]{3}[0-4]{1}[0-9]{5}))$/
  },
  PR: {
    name: "Puerto Rico",
    iso2: "PR",
    code: "1787"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  QA: {
    name: "Qatar",
    iso2: "QA",
    code: "974",
    phoneRegex: /^[33|55|66|77]{2}[0-9]{6}$/
  },
  CG: {
    name: "Republic Of Congo",
    iso2: "CG",
    code: "242"
    //phoneRegex: /^(([92]{2}[0|1|2]{1}[0-9]?)|([99]{2}[0]{1}[0-9]{7})|([93]{2}[1-9]{1}[0-9]?))$/
  },
  RE: {
    name: "Reunion",
    iso2: "RE",
    code: "262",
    phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  RO: {
    name: "Romania",
    iso2: "RO",
    code: "40",
    phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  RU: {
    name: "Russian Federation",
    iso2: "RU",
    code: "7",
    phoneRegex: /^[9]{1}(([0]{1}[1-9]{1})|([1|2|3|6]{1}[0-9]{1})|([5]{1}[0-3]{1})|([8]{1}[0|3|6]{1}))[0-9]{7}$/
  },
  RW: {
    name: "Rwanda",
    iso2: "RW",
    code: "250"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  BL: {
    name: "Saint Barthélemy",
    iso2: "BL",
    code: "590"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  SH: {
    name: "Saint Helena, Ascension And Tristan Da Cunha",
    iso2: "SH",
    code: "290"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  KN: {
    name: "Saint Kitts And Nevis",
    iso2: "KN",
    code: "1869"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  LC: {
    name: "Saint Lucia",
    iso2: "LC",
    code: "1758"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  MF: {
    name: "Saint Martin",
    iso2: "MF",
    code: "590"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  PM: {
    name: "Saint Pierre And Miquelon",
    iso2: "PM",
    code: "508"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  VC: {
    name: "Saint Vincent And The Grenadines",
    iso2: "VC",
    code: "1784"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  WS: {
    name: "Samoa",
    iso2: "WS",
    code: "685"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  SM: {
    name: "San Marino",
    iso2: "SM",
    code: "378"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  ST: {
    name: "Sao Tome And Principe",
    iso2: "ST",
    code: "239"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  SA: {
    name: "Saudi Arabia",
    iso2: "SA",
    code: "966"
    // phoneRegex: /^[5]{1}[0|1|3|4|5|6|7|8|9]{1}[0-9]{7}?$/
  },
  SN: {
    name: "Senegal",
    iso2: "SN",
    code: "221",
    phoneRegex: /^[7]{1}[6|7]{1}[0-9]{7,8}$/
  },
  RS: {
    name: "Serbia",
    iso2: "RS",
    code: "381"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  SC: {
    name: "Seychelles",
    iso2: "SC",
    code: "248"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  SL: {
    name: "Sierra Leone",
    iso2: "SL",
    code: "232",
    phoneRegex: /^(([23]{2})|([3]{1}[0|3]{1})|([7]{1}[0-9]{1}))[0-9]{6}$/
  },
  SG: {
    name: "Singapore",
    iso2: "SG",
    code: "65",
    phoneRegex: /^[8|9]{1}[0-9]{7}$/
  },
  SX: {
    name: "Sint Maarten",
    iso2: "SX",
    code: "1721"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  SK: {
    name: "Slovakia",
    iso2: "SK",
    code: "421"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  SI: {
    name: "Slovenia",
    iso2: "SI",
    code: "386"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  SB: {
    name: "Solomon Islands",
    iso2: "SB",
    code: "677"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  SO: {
    name: "Somalia",
    iso2: "SO",
    code: "252"
    // phoneRegex: /^[0-9]{1}[0-9]{1}[0-9]{7,8}?/
  },
  ZA: {
    name: "South Africa",
    iso2: "ZA",
    code: "27"
    // phoneRegex: /^[0-9]{1}[0-9]{1}[0-9]{7,8}?$/
  },
  ES: {
    name: "Spain",
    iso2: "ES",
    code: "34",
    phoneRegex: /^[6|7]{1}[0-9]{8}$/
  },
  LK: {
    name: "Sri Lanka",
    iso2: "LK",
    code: "94"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  SD: {
    name: "Sudan",
    iso2: "SD",
    code: "249",
    phoneRegex: /^[9]{1}[0-9]{7,8}$/
  },
  SR: {
    name: "Suriname",
    iso2: "SR",
    code: "597"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  SJ: {
    name: "Svalbard And Jan Mayen",
    iso2: "SJ",
    code: "47"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  SZ: {
    name: "Swaziland",
    iso2: "SZ",
    code: "268"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  SE: {
    name: "Sweden",
    iso2: "SE",
    code: "46"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  CH: {
    name: "Switzerland",
    iso2: "CH",
    code: "41"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  SY: {
    name: "Syrian Arab Republic",
    iso2: "SY",
    code: "963",
    phoneRegex: /^[9]{1}[3|4|5|6|8|9]{1}[0-9]{6}$/
  },
  TW: {
    name: "Taiwan, Province Of China",
    iso2: "TW",
    code: "886"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  TJ: {
    name: "Tajikistan",
    iso2: "TJ",
    code: "992",
    phoneRegex: /^[9]{1}(([0|2|3|5|6|7|8|9]{1}[0-9]{2,7})|([1]{1}[0-9]{1}[0-9]{1,6}))?/
  },
  TZ: {
    name: "Tanzania, United Republic Of",
    iso2: "TZ",
    code: "255",
    phoneRegex: /^[74]{2}[0-9]{1}[0-9]?$/
  },
  TH: {
    name: "Thailand",
    iso2: "TH",
    code: "66",
    phoneRegex: /^[6|8|9]{1}[0-9]{8}$/
  },
  TG: {
    name: "Togo",
    iso2: "TG",
    code: "228",
    phoneRegex: /^[9]{1}[0|1|2|7|8|9]{1}[0-9]{6}$/
  },
  TK: {
    name: "Tokelau",
    iso2: "TK",
    code: "690"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  TO: {
    name: "Tonga",
    iso2: "TO",
    code: "676"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  TT: {
    name: "Trinidad And Tobago",
    iso2: "TT",
    code: "1868"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  TA: {
    name: "Tristan de Cunha",
    iso2: "TA",
    code: "290"
    //phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  TN: {
    name: "Tunisia",
    iso2: "TN",
    code: "216",
    phoneRegex: /^[2|3|4|5|9]{1}[0-9]{7}$/
  },
  TR: {
    name: "Turkey",
    iso2: "TR",
    code: "90",
    phoneRegex: /^[5]{1}[0|3|4|5]{1}[0-9]{9}$/
  },
  TM: {
    name: "Turkmenistan",
    iso2: "TM",
    code: "993",
    phoneRegex: /^[6]{1}[5|6|7]{1}[0-9]{6}$/
  },
  TC: {
    name: "Turks And Caicos Islands",
    iso2: "TC",
    code: "1649"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  TV: {
    name: "Tuvalu",
    iso2: "TV",
    code: "688"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  UG: {
    name: "Uganda",
    iso2: "UG",
    code: "256",
    phoneRegex: /^[4]{1}(([14]{2}[0-9]{7})|([5]{1}[6|4]{1}[0-9]{6})|([34]{2}[0-9]{6})|([6]{1}([4]{1}[0-9]{6})|([44|54]{2}[0-9]{5}))|([7]{1}[14|34|64]{2}[0-9]{5})|([8]{1}[14|34|54|64|95]{2}[0-9]{5}))$/
  },
  UA: {
    name: "Ukraine",
    iso2: "UA",
    code: "380",
    phoneRegex: /^(([9]{1}[1-9]{1})|([6]{1}[3|6|7|8]{1})|([39|50]{2}))[0-9]{7}?$/
  },
  AE: {
    name: "United Arab Emirates",
    iso2: "AE",
    code: "971"
    //phoneRegex: /^[5]{1}[0|2|4|5|6|8]{1}[0-9]{7}?$/
  },
  GRN: {
    name: "Grenada",
    iso2: "GRN",
    code: "1473"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  UK: {
    name: "United Kingdom",
    iso2: "UK",
    code: "44"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  US: {
    name: "United States",
    iso2: "US",
    code: "1",
    phoneRegex: /^[2-9]{1}((0[1-9])|(1[2-9])|(2[03-68-9])|(3[1469])|(4[089])|(5[0-46])|(6[0279])|(7[0269])|(8[19]))[0-9]{7}$/
  },
  UY: {
    name: "Uruguay",
    iso2: "UY",
    code: "598"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  UZ: {
    name: "Uzbekistan",
    iso2: "UZ",
    code: "998",
    phoneRegex: /^(([9]{1}[0|1|3|4|7]{1})|([33]{2}))[0-9]{7}$/
  },
  VU: {
    name: "Vanuatu",
    iso2: "VU",
    code: "678"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  VA: {
    name: "Vatican City State",
    iso2: "VA",
    code: "379"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  VE: {
    name: "Venezuela, Bolivarian Republic Of",
    iso2: "VE",
    code: "58"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  VN: {
    name: "Viet Nam",
    iso2: "VN",
    code: "84"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  VG: {
    name: "Virgin Islands (British)",
    iso2: "VG",
    code: "1284"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  VI: {
    name: "Virgin Islands (US)",
    iso2: "VI",
    code: "1340"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  WF: {
    name: "Wallis And Futuna",
    iso2: "WF",
    code: "681"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  EH: {
    name: "Western Sahara",
    iso2: "EH",
    code: "212"
    //  phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  YE: {
    name: "Yemen",
    iso2: "YE",
    code: "967",
    phoneRegex: /^[7]{1}(([0|1|3|7]{1})|([0-9]{1}))[0-9]{7}$/
  },
  ZM: {
    name: "Zambia",
    iso2: "ZM",
    code: "260"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  },
  ZW: {
    name: "Zimbabwe",
    iso2: "ZW",
    code: "263"
    // phoneRegex: /^[1]{1}[0|1|2|5]{1}[0-9]{8}?$/
  }
};

export { countries };
