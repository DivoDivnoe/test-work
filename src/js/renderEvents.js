export const findActualEvents = (allEvents, calendarObj) => {
  return allEvents.filter(event => {
    const date = new Date(event.timestamp);

    return (
      calendarObj.month === date.getMonth() &&
      calendarObj.year === date.getFullYear()
    );
  });
};

export const renderEvents = (container, events) => {
  events.forEach(event => {
    const day = new Date(event.timestamp).getDate();

    const eventBlock = [...container].find(item => {
      return (
        +item
          .querySelector('.calendar__item-date')
          .textContent.split(', ')
          .pop() === day
      );
    });

    renderEvent(eventBlock, event);
  });
};

const renderEvent = (eventBlock, event) => {
  const content = document.createElement('div');
  const title = document.createElement('h2');
  const text = document.createElement('p');

  eventBlock.classList.add('calendar__item--event');
  content.classList.add('calendar__item-content');
  title.classList.add('calendar__item-note');
  text.classList.add('calendar__item-text');

  title.textContent = event.title;
  text.textContent = event.names.join(', ');

  content.appendChild(title);
  content.appendChild(text);
  eventBlock.appendChild(content);
};
