export const convertListToTwoArrays = list => {
  if (list != []) {
    let usersArr = [],
      timeScoreArr = [];
    list.forEach((el, i) => {
      if (i % 2 == 0) {
        usersArr.push(el);
      } else {
        timeScoreArr.push(el);
      }
    });
    return { usersArr, timeScoreArr };
  }
};
