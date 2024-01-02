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
const calendarTypeElement = document.getElementById('calendar-type');
const searchParams = new URLSearchParams(window.location.search);

const getParam = (param, fallback) => {
  if(searchParams && searchParams.has(param)) {
    return searchParams.get(param);
  }
  return fallback;
}

const layoutType = getParam('layout-type', 'mirror');
const color = getParam('color', 'purple');
const year = getParam('year', new Date().getFullYear());
const calendarType = getParam('calendar-type', 'year');

document.body.classList.add(color);
document.body.classList.add(calendarType);

const generate_calendar = (year) => {
  if (calendarType === 'year') {
    calendarTypeElement.innerText = `${year} Year-at-a-glance`;
    document.body.classList.add(layoutType);
  }
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
