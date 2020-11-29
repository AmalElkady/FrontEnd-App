export const convertArrayToArrayOfObjects = arr => {
  const newArr = arr.map((e, i) => {
    if (i % 2 == 0) {
      return { [[`${e}`]]: arr[i + 1] };
    } else return arr.splice(i + 1, 1);
  });
  return newArr;
};
