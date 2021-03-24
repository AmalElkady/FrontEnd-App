import moment from "moment";
export const OfflineTimeInArabic = finalAgo => {
  if (finalAgo.includes("seconde") && !finalAgo.includes("secondes")) {
    return "نشط منذ ثانية واحده";
  } else if (finalAgo.includes("seconds")) {
    return ` نشط منذ ${finalAgo.substring(0, 2)} ثانية  `;
  } else if (finalAgo.includes("minute") && !finalAgo.includes("minutes")) {
    return "نشط منذ دقيقه واحده";
  } else if (finalAgo.includes("minutes")) {
    return ` نشط منذ ${finalAgo.substring(0, 2)} دقيقة  `;
  } else if (finalAgo.includes("hour") && !finalAgo.includes("hours")) {
    return "نشط منذ ساعة واحده";
  } else if (finalAgo.includes("hours")) {
    return ` نشط منذ ${finalAgo.substring(0, 2)} ساعة  `;
  } else if (finalAgo.includes("day") && !finalAgo.includes("days")) {
    return "نشط منذ يوم واحده";
  } else if (finalAgo.includes("days")) {
    return ` نشط منذ ${finalAgo.substring(0, 2)} ايام  `;
  } else if (finalAgo == "offline") {
    return "غير نشط";
  }
};
