export const mapObjectToArray = objectItem => {
  let newArr = [];
  Object.keys(objectItem).map(function(key, index) {
    newArr[index] = { id: index, p: objectItem[key] };
  });
  for (let i = Object.keys(objectItem).length; i < 5; i++) {
    newArr[i] = { id: i, p: null };
  }
  return newArr;
};
