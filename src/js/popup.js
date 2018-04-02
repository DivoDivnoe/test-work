const popupWrapper = document.querySelector('.popup-wrapper');
const popup = popupWrapper.querySelector('.popup');
const popupContent = popup.querySelector('.popup__content');
const closer = popup.querySelector('.popup__close');

const initPopup = eventBlocks => {
  [...eventBlocks].forEach(block => {
    block.addEventListener('click', clickBlockHandler);
  });

  window.addEventListener('resize', () => {
    [...eventBlocks].forEach(block => {
      block.removeEventListener('click', clickBlockHandler);
      block.addEventListener('click', clickBlockHandler);
    });
  });
};

const clickBlockHandler = evt => {
  if (document.body.clientWidth > 900) return false;

  const target = evt.currentTarget;
  const content = target.querySelector('.event').cloneNode(true);

  popupContent.innerHTML = '';
  content.classList.add('event--active');
  popupContent.appendChild(content);

  const closePopupHandler = () => {
    popupWrapper.classList.remove('popup-wrapper--active');
    closer.removeEventListener('click', closePopupHandler);
    target.addEventListener('click', clickBlockHandler);
  };

  popupWrapper.classList.add('popup-wrapper--active');

  target.removeEventListener('click', clickBlockHandler);
  closer.addEventListener('click', closePopupHandler);
};

export default initPopup;
