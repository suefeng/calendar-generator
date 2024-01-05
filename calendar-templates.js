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