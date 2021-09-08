import { countries } from "./countries";
export const verifyPhone = newUser => {
  let country = Object.entries(countries).find(
    obj =>
      obj[1].code == newUser.phonecountrycode &&
      obj[1].iso2 == newUser.countryiso2
  );
  if (!country) return false;
  if (!`${newUser.phone}`.match(country[1].phoneRegex)) return true;
};
