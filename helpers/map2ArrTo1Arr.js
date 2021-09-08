import { parseArr } from "./parseArr";
export const map2ArrTo1Arr = (arr1, arr2) => {
  parseArr(arr2);

  for (let i = 0; i < arr1.length; i++) {
    const co = arr1[i].substring(0, 2);
    const ci = arr1[i].substring(3, 5).replace(/_/, "");
    let va = 0;
    ci.length == 1
      ? (va = arr1[i].substring(5, 7).replace(/_/, ""))
      : (va = arr1[i].substring(6, 8).replace(/_/, ""));

    let userId = 0;
    va.length == 1
      ? (userId = arr1[i].substring(7, arr1[i].length).replace(/_/, ""))
      : (userId = arr1[i].substring(8, arr1[i].length).replace(/_/, ""));

    ///
    userId = userId.replace(/_/, "");
    let type = null;
    if (
      userId.substring(userId.length - 1, userId.length) === "R" ||
      userId.substring(userId.length - 1, userId.length) === "M" ||
      userId.substring(userId.length - 1, userId.length) === "A"
    ) {
      type = userId.substring(userId.length - 1, userId.length);
      userId = userId.substring(0, userId.length - 1);
    }

    for (let j = 0; j < arr2.length; j++) {
      if (arr2[j] != null) {
        if (arr2[j].i === userId) {
          arr2[j].co = co;
          arr2[j].ci = ci;
          arr2[j].va = va;
          arr2[j].t = type;
        }
      } else {
        console.log(" map2ArrTo1Arr e =null", arr2);
        arr2[j] = {};
        arr2[j].i = userId;
        arr2[j].co = co;
        arr2[j].ci = ci;
        arr2[j].va = va;
        arr2[j].t = type;
      }
    }
  }
  console.log("true map2ArrTo1Arr ", arr2);
  return arr2;
};
