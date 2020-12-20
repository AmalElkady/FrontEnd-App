import IntlMessages from "../util/IntlMessages";

export const ARRAYS_OF_MARTIAL_STATUS_VALUES = [
  [0, 1, 2],
  [0, 1, 2, 3]
];

export const ARRAYS_OF_MARTIAL_STATUS = [
  [
    <IntlMessages id="martialF.1" />,
    <IntlMessages id="martialF.2" />,
    <IntlMessages id="martialF.3" />
  ],
  [
    <IntlMessages id="martialM.1" />,
    <IntlMessages id="martialM.2" />,
    <IntlMessages id="martialM.3" />,
    <IntlMessages id="martialM.4" />
  ]
];

export const ARRAYS_OF_TPERCENT_VALUES = [0, 1, 2, 3];
export const ARRAYS_OF_TPERCENT = [
  <IntlMessages id="tprecent.1" />,
  <IntlMessages id="tprecent.2" />,
  <IntlMessages id="tprecent.3" />,
  <IntlMessages id="tprecent.4" />
];

export const ARRAY_OF_DAYS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31"
];

export const ARRAY_OF_MONTHS = [
  <IntlMessages id="month.january" />,
  <IntlMessages id="month.february" />,
  <IntlMessages id="month.march" />,
  <IntlMessages id="month.april" />,
  <IntlMessages id="month.may" />,
  <IntlMessages id="month.june" />,
  <IntlMessages id="month.july" />,
  <IntlMessages id="month.august" />,
  <IntlMessages id="month.september" />,
  <IntlMessages id="month.october" />,
  <IntlMessages id="month.november" />,
  <IntlMessages id="month.december" />
];

export const ARRAY_OF_WORKD = [
  <IntlMessages id="workd.0" />,
  <IntlMessages id="workd.1" />,
  <IntlMessages id="workd.2" />,
  <IntlMessages id="workd.3" />,
  <IntlMessages id="workd.4" />,
  <IntlMessages id="workd.5" />,
  <IntlMessages id="workd.6" />,
  <IntlMessages id="workd.7" />,
  <IntlMessages id="workd.8" />,
  <IntlMessages id="workd.9" />,
  <IntlMessages id="workd.10" />,
  <IntlMessages id="workd.100" />
];
export const ARRAY_OF_AGE_RANGE = [
  "18 - 25",
  "26 - 33",
  "34 - 41",
  "42 - 49",
  "50 - 57",
  "58 - 65",
  "66 - 73",
  "74 - 81",
  "82 - 89"
];

export const ARRAY_OF_YEARS = [
  2015,
  2014,
  2013,
  2012,
  2011,
  2010,
  2009,
  2008,
  2007,
  2006,
  2005,
  2004,
  2003,
  2002,
  2001,
  2000,
  1999,
  1998,
  1997,
  1996,
  1995,
  1994,
  1993,
  1992,
  1991,
  1990,
  1989,
  1988,
  1987,
  1986,
  1985,
  1984,
  1983,
  1982,
  1981,
  1980,
  1979,
  1978,
  1977,
  1976,
  1975,
  1974,
  1973,
  1972,
  1971,
  1970,
  1969,
  1968,
  1967,
  1966,
  1965,
  1964,
  1963,
  1962,
  1961,
  1960,
  1959,
  1958,
  1957,
  1956,
  1955,
  1954,
  1953,
  1952,
  1951,
  1950,
  1949,
  1948,
  1947,
  1946,
  1945,
  1944,
  1943,
  1942,
  1941,
  1940,
  1939,
  1938,
  1937,
  1936,
  1935
];

//COUNTRY_CITY_MAP = new Map();
//COUNTRY_CITY_MAP['EG'] = [<IntlMessages id="eg.1" />,<IntlMessages id="eg.2" />];

export const COUNTRY_MAP = new Map();
COUNTRY_MAP["EG"] = <IntlMessages id="co.1" />;

export const COUNTRY_CITY_MAP = new Map();
COUNTRY_CITY_MAP["eg"] = [
  <IntlMessages id="eg.1" />,
  <IntlMessages id="eg.2" />,
  <IntlMessages id="eg.3" />,
  <IntlMessages id="eg.4" />,
  <IntlMessages id="eg.5" />,
  <IntlMessages id="eg.6" />,
  <IntlMessages id="eg.7" />,
  <IntlMessages id="eg.8" />,
  <IntlMessages id="eg.9" />,
  <IntlMessages id="eg.10" />,
  <IntlMessages id="eg.11" />,
  <IntlMessages id="eg.12" />,
  <IntlMessages id="eg.13" />,
  <IntlMessages id="eg.14" />,
  <IntlMessages id="eg.15" />,
  <IntlMessages id="eg.16" />,
  <IntlMessages id="eg.17" />,
  <IntlMessages id="eg.18" />,
  <IntlMessages id="eg.19" />,
  <IntlMessages id="eg.20" />,
  <IntlMessages id="eg.21" />,
  <IntlMessages id="eg.22" />,
  <IntlMessages id="eg.23" />,
  <IntlMessages id="eg.24" />,
  <IntlMessages id="eg.25" />,
  <IntlMessages id="eg.26" />,
  <IntlMessages id="eg.27" />
];

COUNTRY_CITY_MAP["gb"] = [
  <IntlMessages id="gb.1" />,
  <IntlMessages id="gb.2" />
];

export const COUNTRY_CITY_MAP_VALUE = new Map();
COUNTRY_CITY_MAP_VALUE["eg"] = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27
];
COUNTRY_CITY_MAP_VALUE["gb"] = [1, 2];

export const COUNTRY_CODE_TO_NAME_MAP = new Map();
COUNTRY_CODE_TO_NAME_MAP["+20"] = "eg";
COUNTRY_CODE_TO_NAME_MAP["+44"] = "gb";

//Iran
//Pakistan
//Saudi Arabia
//Afghanistan
//Mauritania
//Yemen
//Egypt
//Jordan
//Iraq
//Kuwait
//Algeria
//Malaysia
//Maldives
//Morocco
//Libya
//Tunisia
//United Arab Emirates
//Somalia
//Brunei
//
//Albania
//Azerbaijan
//Bangladesh
//Burkina Faso
//Chad
//Gambia
//Guinea
//Kazakhstan
//Kosovo
//Kyrgyzstan
//Mali
//Northern Cyprus
//Nigeria
//Senegal
//Syria
//Lebanon
//Tajikistan
//Turkmenistan
//Turkey
//Uzbekistan

//Iraq, Malawi, Libya, Namibia, and Uganda

//Algeria
//Cameroon
//Chad Chad
//Central African Republic Central African Republic
//Republic of the Congo Republic of the Congo
//Djibouti Djibouti
//Egypt
//Gabon
//The Gambia
//Guinea
//Libya
//Kenya
//Mali
//Mauritania
//Morocco
//Nigeria
//São Tomé and Príncipe São Tomé and Príncipe
//Senegal
//Somalia
//South Sudan
//Sudan
//Eswatini
//Togo
//Tanzania
//Uganda
//Zambia
//
//
//Afghanistan
//Bahrain
//Bangladesh
//
//Brunei
//Indonesia
//Iran
//Iraq
//Jordan
//Kuwait
//Lebanon
//Maldives
//Oman
//Qatar
//Pakistan
//Saudi Arabia
//Sri Lanka
//Syria
//United Arab Emirates
//Yemen
//
//Solomon Islands[53]
//India
//Malaysia
//Philippines
//Singapore
