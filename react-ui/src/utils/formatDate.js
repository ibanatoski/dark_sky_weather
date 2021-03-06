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

export function formatTime(d) {
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
}

export function formatXAxisHours(d) {
  var date = new Date(d * 1000);
  // If using moment.js
  var hours = date.getHours();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return hours + ampm;
}
