export const calcSlShFromAgerange = ageRange => {
  ageRange = ageRange.replace(/\s/g, "");
  let high = Number(ageRange.substring(0, 2));
  let low = Number(ageRange.substring(3, 5)) + 1;
  let d = new Date();
  let yearNow = d.getFullYear();
  let dayNow = d.getDate();
  if (dayNow < 10) {
    dayNow = `0${dayNow}`;
  }
  let monthNow = d.getMonth() + 1;
  if (monthNow < 10) {
    monthNow = `0${monthNow}`;
  }
  high = yearNow - high + `${monthNow}${dayNow}`;
  high = high + `${Math.floor(Date.now() / 1000 / 60)}`;
  d.setDate(dayNow - 1);
  dayNow = d.getDate();
  if (dayNow < 10) {
    dayNow = `0${dayNow}`;
  }
  monthNow = d.getMonth() + 1;
  if (monthNow < 10) {
    monthNow = `0${monthNow}`;
  }
  low = yearNow - low + `${monthNow}${dayNow}`;
  low = low + `${Math.floor(Date.now() / 1000 / 60 / 1000000) * 1000000}`;

  return { scoreL: low, scoreH: high };
};
