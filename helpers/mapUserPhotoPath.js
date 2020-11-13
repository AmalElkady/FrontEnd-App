export const mapUserPhotoPath = (userArr, co_ci_v) => {
  co_ci_v = co_ci_v.substring(0, 6);
  const newUsersArr = userArr.map((e, i) => {
    if (i % 2 == 0) {
      e = JSON.parse(e);
      e._ = co_ci_v + "/" + e.i + e._;
    }
    return e;
  });
  return newUsersArr;
};
