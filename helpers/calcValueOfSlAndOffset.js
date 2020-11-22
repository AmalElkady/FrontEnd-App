export const calcValueOfSlAndOffset = arr => {
  let offset = 0,
    SL = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == arr[i - 1]) {
      offset++;
    } else {
      offset = 1;
      SL = arr[i];
      break;
    }
  }
  return { offset, SL };
};
