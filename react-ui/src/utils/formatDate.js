const numToWeekDay = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};

const numToAbbrevWeekDay = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat"
};

const numToMonth = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
};

export function formatDate(d) {
  var day = numToWeekDay[d.getDay()];
  var date = d.getDate() + 1;
  var month = numToMonth[d.getMonth()];

  return day + " " + month + " " + date;
}

export function getAbbrevDay(d) {
  return numToAbbrevWeekDay[d.getDay()];
}
