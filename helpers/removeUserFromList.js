export const removeUserFromList = (userId, list1, list2, list3 = null) => {
  if (Array.isArray(list1)) {
    for (let i = 0; i < list1.length; i++) {
      if (list1[i].i == userId) {
        console.log("list1 before", list1, list2, list3);
        list1.splice(i, 1);
        list2.splice(i, 1);
        if (list3 != null) {
          console.log("list3", list3);
          list3.splice(i, 1);
        }
      }
    }
    console.log("list1 updated", list1, list2, list3);
    return { list1, list2, list3 };
  }
};
