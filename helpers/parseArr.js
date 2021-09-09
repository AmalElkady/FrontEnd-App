export const parseArr = arr1 => {
  for (let i = 0; i < arr1.length; i++) {
    arr1[i] = JSON.parse(arr1[i]);
  }
  return arr1;
};
