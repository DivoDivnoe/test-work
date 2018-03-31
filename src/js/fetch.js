const fetchEvents = callback => {
  return fetch('events.json')
    .then(res => res.json())
    .then(json => callback(json))
    .catch(error => console.error(`Cannot show events: ${error.message}`));
};

export default fetchEvents;
