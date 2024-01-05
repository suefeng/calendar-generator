const calendarContainer = document.getElementById('calendar-container');
const calendarTypeElement = document.getElementById('calendar-type');

const getParam = (param, fallback) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams && searchParams.has(param)) {
    return searchParams.get(param);
  }
  return fallback;
}

const layoutType = getParam('layout-type', 'mirror');
const color = getParam('color', 'purple');
const year = getParam('year', new Date().getFullYear());
const calendarType = getParam('calendar-type', 'year');
const showHolidays = getParam('holidays', 'hide-holidays');

document.body.classList.add(color);
document.body.classList.add(calendarType);
document.body.classList.add(showHolidays);

const generateCalendar = (year) => {
  if (calendarType === 'year') {
    calendarTypeElement.innerText = `${year} Year-at-a-glance`;
    document.body.classList.add(layoutType);
  }
  const holidays = generateHolidays(year);
  const lunarNewYear = getLunarNewYear(year);
  const easter = getEaster(year);
  holidays.push({ "month": lunarNewYear.getMonth() + 1, "day": lunarNewYear.getDate(), "name": "Lunar New Year", category: "other" });
  holidays.push({ "month": easter[0], "day": easter[1], "name": "Easter Sunday", category: "other" });
  holidays.sort((a, b) => a.month - b.month);

  monthNames.forEach((monthName, i) => {
    const month = i;

    if (i < 6) {
      calendarContainer.querySelector('.first-column').innerHTML += calendarTemplate(monthName, month);
    }
    if (i > 5) {
      calendarContainer.querySelector('.second-column').innerHTML += calendarTemplate(monthName, month);
    }

    let firstDay = new Date(year, month);
    const daysOfMonth = generateDaysOfMonth(year);
    let calendarDays = document.getElementById(`calendar-days-${month}`);
    calendarDays.innerHTML = '';

    for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {

      let day = document.createElement('div');

      if (i >= firstDay.getDay()) {
        const date = i - firstDay.getDay() + 1;
        day.innerHTML = `<div class="day">${date}</div>`;

        if (calendarType === 'month') {
          holidays.filter(holiday => {
            if (month === holiday.month - 1 && date === holiday.day) {
              day.innerHTML += `<div class="holiday">${holiday.name}</div>`;
            }
          });
        }
      }
      calendarDays.appendChild(day);
    }
  });

  if (calendarType === 'year') {
    const holidayWrapper = document.createElement('div');
    holidayWrapper.innerHTML = holidaysTemplate(holidays)
    calendarContainer.after(holidayWrapper);
  }
}

generateCalendar(year);
