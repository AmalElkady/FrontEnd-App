export const calcSlShFromAgerange = ageRange => {
  ageRange = ageRange.replace(/\s/g, "");
  let low = Number(ageRange.substring(0, 2));
  let high = Number(ageRange.substring(3, 5)) + 1;
  let d = new Date();
  let yearNow = d.getFullYear();
  let dayNow = d.getDate();
  let monthNow = d.getMonth() + 1;
  low = yearNow - low + `${monthNow}${dayNow}`;
  low = low + `${Math.floor(Date.now() / 1000 / 60 / 1000000) * 1000000}`;
  d.setDate(dayNow - 1);
  dayNow = d.getDate();
  monthNow = d.getMonth() + 1;
  high = yearNow - high + `${monthNow}${dayNow}`;
  high = high + `${Math.floor(Date.now() / 1000 / 60)}`;

  return { scoreL: low, scoreH: high };
};
