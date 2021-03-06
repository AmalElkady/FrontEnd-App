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
    const co = co_ci_v.substring(0, 2);
    const ci = co_ci_v.substring(3, 5).replace(/_/, "");
    let va = 0;
    ci.length == 1
      ? (va = co_ci_v.substring(5, 7).replace(/_/, ""))
      : (va = co_ci_v.substring(6, 8).replace(/_/, ""));

    co_ci_v = co + "_" + ci + "_" + va;
    newUsersArr = userArr.map((e, i) => {
      if (i % 2 == 0) {
        e = JSON.parse(e);
        e._ = co_ci_v + "/" + e.i + e._;
        e.co = co;
        e.ci = ci;
        e.va = va;
      }
      return e;
    });
  }

  return newUsersArr;
};
