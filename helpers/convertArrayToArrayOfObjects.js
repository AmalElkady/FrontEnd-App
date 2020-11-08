export const convertArrayToArrayOfObjects = arr => {
  console.log("oldArr ", arr);
  const newArr = arr.map((e, i) => {
    if (i % 2 == 0) {
      return { [[`${e}`]]: arr[i + 1] };
    } else return arr.splice(i + 1, 1);
  });
  console.log("newArr ", newArr);
  return newArr;
};
