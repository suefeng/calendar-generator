const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};
const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};
const calendar = document.getElementById('calendar-container');
const searchParams = new URLSearchParams(window.location.search);

const getParam = (param, fallback) => {
  if(searchParams && searchParams.has(param)) {
    return searchParams.get(param);
  }
  return fallback;
}

const layoutType = getParam('layout-type', 'edges');
const color = getParam('color', 'purple');
const year = getParam('year', new Date().getFullYear());

document.body.classList.add(layoutType);
document.body.classList.add(color);
document.getElementById('year').innerText = `${year} `;

const month_names = [
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
const template = (month_name, month) => `<div class="calendar">
  <div class="calendar-header">
    <span class="month">${month_name}</span>
  </div>
  <div class="calendar-body">
    <div class="calendar-week-days">
      <div>S</div>
      <div>M</div>
      <div>T</div>
      <div>W</div>
      <div>Th</div>
      <div>F</div>
      <div>S</div>
    </div>
    <div class="calendar-days" id="calendar-days-${month}">
    </div>
  </div>
</div>
`;

const generate_calendar = (year) => {
  console.log(year)
  month_names.forEach((month_name, i) => {
    const month = i;
    

    if (i < 6) {
      calendar.querySelector('.first-column').innerHTML += template(month_name, month);
    }
    if (i > 5) {
      calendar.querySelector('.second-column').innerHTML += template(month_name, month);
    }
    
    let first_day = new Date(year, month);
    let days_of_month = [
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
    let calendar_days = document.getElementById(`calendar-days-${month}`);
    calendar_days.innerHTML = '';

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {

      let day = document.createElement('div');
  
      if (i >= first_day.getDay()) {
        day.innerHTML = i - first_day.getDay() + 1;
      }
      calendar_days.appendChild(day);
    }
  });
}

generate_calendar(year);
