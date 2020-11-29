export const calcValueOfSlAndOffset = arr => {
  let offset = 0,
    SL = 0;
  if (arr.length !== 0) {
    offset = 1;
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] == arr[i - 1]) {
        offset++;
      } else {
        SL = arr[i];
        break;
      }
    }
  }
  // console.log("from fun calc 3", offset, SL);
  return { offset, SL };
};
