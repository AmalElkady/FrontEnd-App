export const mapUserPhotoPath = (userArr, co_ci_v) => {
  //most recent state
  let newUsersArr = [];
  if (co_ci_v.length == 2) {
    newUsersArr = userArr.map((e, i) => {
      if (i % 2 == 0) {
        e = JSON.parse(e);
        e._ = co_ci_v + "_" + e.ci + "_" + e.va + "/" + e.i + e._;
        e.co = co_ci_v;
      }
      return e;
    });
  }
  // active state
  else {
    co_ci_v = co_ci_v.substring(0, 6);
    newUsersArr = userArr.map((e, i) => {
      if (i % 2 == 0) {
        e = JSON.parse(e);
        e._ = co_ci_v + "/" + e.i + e._;
      }
      return e;
    });
  }

  return newUsersArr;
};
