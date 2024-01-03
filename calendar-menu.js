const showHidePageLayout = (type) => {
  const pageLayoutTypeFieldset = document.getElementById('layout-fieldset');

  if (type === 'year') {
    pageLayoutTypeFieldset.classList.remove('hidden');
  } else {
    pageLayoutTypeFieldset.classList.add('hidden');
  }
}

const generateYear = (numberOfYears) => {
  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from({ length: 5 }, (_, i) => i + currentYear);

  return yearsArray.map(year =>
    `<option value=${year}>${year}</option>`
  );
}

document.getElementById('select-year').innerHTML = generateYear(3);
