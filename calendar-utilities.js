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
    "category": "federal",
  },
  {
    "month": 1,
    "day": getNthDayOfWeek(year, 'January', 'Monday', 3),
    "name": "Martin Luther King's Day",
    "category": "federal",
  },
  {
    "month": 2,
    "day": 1,
    "name": "First Day of Black History Month",
    "category": "other",
  },
  {
    "month": 2,
    "day": 14,
    "name": "Valentine's Day",
    "category": "other",
  },
  {
    "month": 2,
    "day": getNthDayOfWeek(year, 'February', 'Monday', 3),
    "name": "President's Day",
    "category": "federal",
  },
  {
    "month": 3,
    "day": 1,
    "name": "First Day of Women's History Month",
    "category": "other",
  },
  {
    "month": 3,
    "day": getNthDayOfWeek(year, 'March', 'Sunday', 2),
    "name": "Daylight Savings Time starts",
    "category": "other",
  },
  {
    "month": 3,
    "day": 17,
    "name": "St. Patrick's Day",
    "category": "other",
  },
  {
    "month": 4,
    "day": 1,
    "name": "April Fool's Day",
    "category": "other",
  },
  {
    "month": 4,
    "day": 15,
    "name": "Tax Day",
    "category": "other",
  },
  {
    "month": 5,
    "day": 1,
    "name": "First Day of Asian Pacific American Heritage Month",
    "category": "other",
  },
  {
    "month": 5,
    "day": 5,
    "name": "Cinco de Mayo",
    "category": "other",
  },
  {
    "month": 5,
    "day": getNthDayOfWeek(year, 'May', 'Sunday', 2),
    "name": "Mother's Day",
    "category": "other",
  },
  {
    "month": 5,
    "day": getNthDayOfWeek(year, 'May', 'Monday', 'last'),
    "name": "Memorial Day",
    "category": "federal",
  },
  {
    "month": 6,
    "day": 1,
    "name": "First Day of LGBTQ+ Pride Month",
    "category": "other",
  },
  {
    "month": 6,
    "day": 19,
    "name": "Juneteenth National Independence Day",
    "category": "federal",
  },
  {
    "month": 7,
    "day": 4,
    "name": "Independence Day",
    "category": "federal",
  },
  {
    "month": 9,
    "day": getNthDayOfWeek(year, 'September', 'Monday', 1),
    "name": "Labor Day",
    "category": "federal",
  },
  {
    "month": 9,
    "day": 15,
    "name": "First Day of Hispanic Heritage Month",
    "category": "other",
  },
  {
    "month": 10,
    "day": getNthDayOfWeek(year, 'October', 'Monday', 2),
    "name": "Indigenous People's Day",
    "category": "federal",
  },
  {
    "month": 10,
    "day": 31,
    "name": "Halloween",
    "category": "other",
  },
  {
    "month": 11,
    "day": 1,
    "name": "First Day of American Indian Heritage Month",
    "category": "other",
  },
  {
    "month": 11,
    "day": getNthDayOfWeek(year, 'November', 'Sunday', 1),
    "name": "Daylight Savings Ends",
    "category": "other",
  },
  {
    "month": 11,
    "day": getNthDayOfWeek(year, 'November', 'Tuesday', 1),
    "name": "Election Day",
    "category": "other",
  },
  {
    "month": 11,
    "day": 11,
    "name": "Veterans' Day",
    "category": "federal",
  },
  {
    "month": 11,
    "day": getNthDayOfWeek(year, 'November', 'Thursday', 4),
    "name": "Thanksgiving Day",
    "category": "federal",
  },
  {
    "month": 11,
    "day": getNthDayOfWeek(year, 'November', 'Thursday', 4) + 1,
    "name": "Native American Heritage Day",
    "category": "other",
  },
  {
    "month": 12,
    "day": 24,
    "name": "Christmas Eve",
    "category": "other",
  },
  {
    "month": 12,
    "day": 25,
    "name": "Christmas Day",
    "category": "federal",
  },
  {
    "month": 12,
    "day": 31,
    "name": "New Year's Eve",
    "category": "other",
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

function get_new_moons(date) {
  const LUNAR_MONTH = 29.5305888531  // https://en.wikipedia.org/wiki/Lunar_month
  let y = date.getFullYear()
  let m = date.getMonth() + 1  // https://stackoverflow.com/questions/15799514/why-does-javascript-getmonth-count-from-0-and-getdate-count-from-1
  let d = date.getDate()
  // https://www.subsystems.us/uploads/9/8/9/4/98948044/moonphase.pdf
  if (m <= 2) {
    y -= 1
    m += 12
  }
  a = Math.floor(y / 100)
  b = Math.floor(a / 4)
  c = 2 - a + b
  e = Math.floor(365.25 * (y + 4716))
  f = Math.floor(30.6001 * (m + 1))
  julian_day = c + d + e + f - 1524.5
  days_since_last_new_moon = julian_day - 2451549.5
  new_moons = days_since_last_new_moon / LUNAR_MONTH
  days_into_cycle = (new_moons % 1) * LUNAR_MONTH
  return new_moons
}

function inLunarNewYear(date) {
  /* The date is decided by the Lunar Calendar, which is based on the
  cycles of the moon and sun and is generally 21–51 days behind the Gregorian
  (internationally-used) calendar. The date of New Year changes every
  year, but it always falls between January 21st and February 20th. */
  return Math.floor(get_new_moons(date)) > Math.floor(get_new_moons(new Date(date.getFullYear(), 0, 20))) ? 1 : 0
}

function getLunarNewYear(gregorian_year) {
  // Does not quite line up with https://www.travelchinaguide.com/essential/holidays/new-year/dates.htm
  for (let i = 0; i <= 30; ++i) {
    let start = new Date(gregorian_year, 0, 1)
    start.setDate(21 + i)
    if (inLunarNewYear(start)) return start
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

const holidaysList = (holidays) => holidays.map(holiday => `
<tr class="holiday">
  <td>${monthNames[holiday.month - 1]} ${holiday.day}</td>
  <td>${holiday.name}</td>
  <td>${holiday.category}</td>
</tr>
`).join('');

const holidaysTemplate = (holidays) => `
<div class="holidays">
  <h2>Holidays</h2>
  <table>
    <thead>
      <th>Date</th><th>Name</th><th>Category</th>
    </thead>
    <tbody>
      ${holidaysList(holidays)}
    </tbody>
  </table>
</div>
`;
