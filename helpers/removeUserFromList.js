export const removeUserFromList = (userId, list1, list2, list3 = null) => {
  if (Array.isArray(list1)) {
    for (let i = 0; i < list1.length; i++) {
      if (list1[i].i == userId) {
        list1.splice(i, 1);
        list2.splice(i, 1);
        if (list3 != null) {
          list3.splice(i, 1);
        }
      }
    }
    return { list1, list2, list3 };
  }
};
