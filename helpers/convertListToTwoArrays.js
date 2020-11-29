export const convertListToTwoArrays = list => {
  if (list != []) {
    let usersArr = [],
      scoreArr = [];
    list.forEach((el, i) => {
      if (i % 2 == 0) {
        usersArr.push(el);
      } else {
        scoreArr.push(el);
      }
    });
    return { usersArr, scoreArr };
  }
};
