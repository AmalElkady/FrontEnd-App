export const mapArrayToObjectArr = list => {
  let usersArr = [],
    scoreArr = [];
  if (list != []) {
    list.forEach((el, i) => {
      if (i % 2 == 0) {
        usersArr.push(JSON.parse(el));
      } else {
        scoreArr.push(el);
      }
    });
  }
  return { usersArr, scoreArr };
};
