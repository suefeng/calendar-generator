const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const weekdayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const generateHolidays = (year) => [
  {
    "month": 1,
    "day": 1,
    "name": "New Year's Day",
  },
  {
    "month": 1,
    "day": getNthDayOfWeek(year, 'January', 'Monday', 3),
    "name": "Martin Luther King's Birthday",
  },
  {
    "month": 2,
    "day": getNthDayOfWeek(year, 'February', 'Monday', 3),
    "name": "President's Day or George Washington's Birthday",
  },
  {
    "month": 5,
    "day": getNthDayOfWeek(year, 'May', 'Monday', 'last'),
    "name": "Memorial Day",
  },
  {
    "month": 6,
    "day": 19,
    "name": "Juneteenth National Independence Day",
  },
  {
    "month": 7,
    "day": 4,
    "name": "Independence Day",
  },
  {
    "month": 9,
    "day": getNthDayOfWeek(year, 'September', 'Monday', 1),
    "name": "Labor Day",
  },
  {
    "month": 10,
    "day": getNthDayOfWeek(year, 'October', 'Monday', 2),
    "name": "Columbus Day / Indigenous People's Day",
  },
  {
    "month": 11,
    "day": 11,
    "name": "Veterans' Day",
  },
  {
    "month": 11,
    "day": getNthDayOfWeek(year, 'November', 'Thursday', 4),
    "name": "Thanksgiving Day",
  },
  {
    "month": 12,
    "day": 25,
    "name": "Christmas Day",
  },
];

const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

const generateDaysOfMonth = (year) => [
  31,
  getFebDays(year),
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];

function getNthDayOfWeek(year, humanMonth, humanDay, nthDay) {
  const month = monthNames.indexOf(humanMonth);
  const date = new Date(year, month, 1);
  const startDay = date.getDay();
  const weekday = weekdayNames.indexOf(humanDay);

  let moveDays = (weekday - startDay + 7) % 7;
  moveDays += (7 * (nthDay - 1)) + 1;

  if (nthDay === 'last') {
    var d = new Date(year, month, 0); //last day of desired month
    return d.getDate() - (d.getDay() - weekday);
  }
  return new Date(year, month, moveDays).getDate();
}

const weekDaysTemplate = () => {
  if (calendarType === 'year') {
    return weekdayNames.map(day => `<div>${day.charAt(0)}</div>`).join('');
  } else {
    return weekdayNames.map(day => `<div>${day}</div>`).join('');
  }
}

const calendarTemplate = (month_name, month) => `
<div class="calendar">
  <div class="calendar-header">
    <span class="month">${month_name}</span>
  </div>
  <div class="calendar-body">
    <div class="calendar-week-days">
      ${weekDaysTemplate()}
    </div>
    <div class="calendar-days" id="calendar-days-${month}">
    </div>
  </div>
  <div class="notes"></div>
</div>
`;
