import calendar from './myCalendar';
import {renderCalendar, renderDate} from './render';
import fetchEvents from './fetch';
import {renderEvents, findActualEvents} from './renderEvents';

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
      renderEvents(
        calendarBlock.querySelectorAll('.calendar__item'),
        findActualEvents(res, calendar)
      );
    });
  };

  calendar.changeDateHandler = render;

  prevBtn.addEventListener('click', () => calendar.prev());
  nextBtn.addEventListener('click', () => calendar.next());
  todayBtn.addEventListener('click', () => calendar.reset());

  render();
});
