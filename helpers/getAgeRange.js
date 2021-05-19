export const getAgeRange = age => {
  if (age >= 18 && age <= 25) {
    return "18-25";
  } else if (age >= 26 && age <= 33) {
    return "26-33";
  } else if (age >= 34 && age <= 41) {
    return "34-41";
  } else if (age >= 42 && age <= 49) {
    return "42-49";
  } else if (age >= 50 && age <= 57) {
    return "50-57";
  } else if (age >= 58 && age <= 65) {
    return "58-65";
  } else if (age >= 66 && age <= 73) {
    return "66-73";
  } else if (age >= 74 && age <= 81) {
    return "74-81";
  } else if (age >= 82 && age <= 89) {
    return "82-89";
  }
};
