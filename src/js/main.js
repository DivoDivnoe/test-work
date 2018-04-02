import calendar from './myCalendar';
import {renderCalendar, renderDate} from './render';
import fetchEvents from './fetch';
import {renderEvents, findActualEvents} from './renderEvents';
import initPopup from './popup';

const LEFT_KEY_CODE = 37;
const RIGHT_KEY_CODE = 39;

document.addEventListener('DOMContentLoaded', () => {
  const calendarBlock = document.querySelector('.calendar');
  const dateBlock = calendarBlock.querySelector('.calendar__date');
  const dateText = dateBlock.querySelector('.calendar__date-text');
  const prevBtn = dateBlock.querySelector('.calendar__date-btn--prev');
  const nextBtn = dateBlock.querySelector('.calendar__date-btn--next');
  const todayBtn = calendarBlock.querySelector('.calendar__today');
  const calendarList = calendarBlock.querySelector('.calendar__list');

  const render = () => {
    renderDate(dateText, calendar);
    renderCalendar(calendarList, calendar);
    fetchEvents(res => {
      const calendarItems = calendarBlock.querySelectorAll('.calendar__item');

      renderEvents(calendarItems, findActualEvents(res, calendar));

      const eventBlocks = [...calendarItems].filter(item =>
        item.classList.contains('calendar__item--event')
      );

      if (eventBlocks) {
        initPopup(eventBlocks);
      }
    });
  };

  calendar.changeDateHandler = render;

  prevBtn.addEventListener('click', () => calendar.prev());
  nextBtn.addEventListener('click', () => calendar.next());
  todayBtn.addEventListener('click', () => calendar.reset());

  document.addEventListener('keydown', evt => {
    switch (evt.keyCode) {
      case LEFT_KEY_CODE:
        calendar.prev();
        break;
      case RIGHT_KEY_CODE:
        calendar.next();
    }
  });

  render();
});
