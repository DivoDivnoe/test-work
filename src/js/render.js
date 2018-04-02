const weakDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];

export const renderDate = (dateText, calendarObj) => {
  dateText.textContent = `${months[calendarObj.month]} ${calendarObj.year}`;
};

export const renderCalendar = (ul, calendarObj) => {
  const {firstWeakDay, lastWeakDay, isCurrentMonth, todayDate} = calendarObj;

  let prevMonthDays = calendarObj.prevMonthDays;
  let nextMonthDays = 1;

  const fragment = document.createDocumentFragment();

  for (let i = firstWeakDay - 1; i >= 1; i--) {
    const classList = ['calendar__item', 'calendar__item--inactive'];
    const template = `${weakDays[i - 1]}, ${prevMonthDays}`;

    renderBlock(fragment, classList, template, false);

    prevMonthDays--;
  }

  for (let i = 1; i <= calendarObj.days; i++) {
    const classList =
      isCurrentMonth && todayDate === i
        ? ['calendar__item', 'calendar__item--active']
        : ['calendar__item'];
    const template =
      firstWeakDay + i - 1 <= 7 ? `${weakDays[firstWeakDay + i - 2]}, ${i}` : i;

    renderBlock(fragment, classList, template);
  }

  for (let i = lastWeakDay + 1; i <= 7; i++) {
    const classList = ['calendar__item', 'calendar__item--inactive'];

    renderBlock(fragment, classList, nextMonthDays);

    nextMonthDays++;
  }

  ul.innerHTML = '';
  ul.appendChild(fragment);

  const calendarItems = ul.querySelectorAll('.calendar__item');

  calendarItems.forEach(item => resizeHeight(item));

  window.addEventListener('resize', () => resizeAllBlocks(calendarItems));
};

const renderBlock = (container, classList, content, append = true) => {
  const item = document.createElement('li');
  const span = document.createElement('span');

  item.classList.add(...classList);
  item.setAttribute('tabindex', 0);
  span.classList.add('calendar__item-date');
  span.textContent = content;
  item.appendChild(span);
  append ? container.appendChild(item) : container.prepend(item);
};

const resizeHeight = block => {
  block.style.height = `${block.offsetWidth}px`;
};

const resizeAllBlocks = blocks => {
  blocks.forEach(block => resizeHeight(block));
};
