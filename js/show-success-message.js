import {isEscEvent} from './utils/is-esc-event.js';
import {isOutsideClickEvent} from './utils/is-outside-click-event.js';
import {closeUploadImageForm} from './upload-image-form.js';

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const closeSuccessMessage = () => document.querySelector('.success').remove();

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  }
};

const onSuccessMessageOutsideClick = (evt) => {
  if (isOutsideClickEvent(evt, 'success__inner')) {
    closeSuccessMessage();
    document.removeEventListener('click', onSuccessMessageOutsideClick);
  }
};

const closeSuccessMessageHandler = () => {
  const closeSuccessMessageButton = document.querySelector('.success__button');
  closeSuccessMessageButton.addEventListener('click', closeSuccessMessage);
};

const showSuccessMessage = () => {
  closeUploadImageForm();

  const fragment = document.createDocumentFragment();
  const successMessage = successMessageTemplate.cloneNode(true);
  fragment.appendChild(successMessage);
  document.body.appendChild(fragment);

  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', onSuccessMessageOutsideClick);

  closeSuccessMessageHandler();
};

export {showSuccessMessage};
