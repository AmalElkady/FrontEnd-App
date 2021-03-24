import moment from "moment";
export const calcOfflineTime = timeScore => {
  let ago = moment().diff(
    timeScore.substring(8, timeScore.length) * 1000 * 60,
    "days"
  );
  if (ago > 3) {
    return "offline";
  } else {
    return moment(
      timeScore.substring(8, timeScore.length) * 1000 * 60
    ).fromNow();
  }
};
