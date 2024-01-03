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
const weekDays = () => {
  if (calendarType === 'year') {
    return `
    <div>S</div>
    <div>M</div>
    <div>T</div>
    <div>W</div>
    <div>Th</div>
    <div>F</div>
    <div>S</div>
    `
  } else {
    return `
    <div>Sunday</div>
    <div>Monday</div>
    <div>Tuesday</div>
    <div>Wednesday</div>
    <div>Thursday</div>
    <div>Friday</div>
    <div>Saturday</div>
    `;
  }
}
const template = (month_name, month) => `
<div class="calendar">
  <div class="calendar-header">
    <span class="month">${month_name}</span>
  </div>
  <div class="calendar-body">
    <div class="calendar-week-days">
      ${weekDays()}
    </div>
    <div class="calendar-days" id="calendar-days-${month}">
    </div>
  </div>
  <div class="notes"></div>
</div>
`;