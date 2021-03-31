export const addSeenToMgs = (mgsList, seen) => {
  let indexOfMsg = null;

  if (seen == 1 || (seen == 0 && mgsList[0].o == 0)) {
    for (let i = 0; i < mgsList.length; i++) {
      mgsList[i].seen = true;
      if (mgsList[i].o == 1) {
        indexOfMsg = i;
        break;
      }
    }
  } else if (seen == 0 && mgsList[0].o == 1) {
    for (let i = 0; i < mgsList.length; i++) {
      if (mgsList[i].o == 1) {
        mgsList[i].seen = false;
      } else return { mgsList, indexOfMsg };
    }
  }

  return { mgsList, indexOfMsg };
};
