import {isEscEvent} from './utils/is-esc-event.js';
import {isOutsideClickEvent} from './utils/is-outside-click-event.js';
import {closeUploadImageForm} from './upload-image-form.js';

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const closeErrorMessage = () => document.querySelector('.error').remove();

const onErrorMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
  }
};

const onErrorMessageOutsideClick = (evt) => {
  if (isOutsideClickEvent(evt, 'error__inner')) {
    closeErrorMessage();
    document.removeEventListener('click', onErrorMessageOutsideClick);
  }
};

const closeErrorMessageHandler = () => {
  const closeErrorMessageButton = document.querySelector('.error__button');
  closeErrorMessageButton.addEventListener('click', closeErrorMessage);
};

const showErrorMessage = () => {
  closeUploadImageForm();

  const fragment = document.createDocumentFragment();
  const errorMessage = errorMessageTemplate.cloneNode(true);
  fragment.appendChild(errorMessage);
  document.body.appendChild(fragment);

  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onErrorMessageOutsideClick);

  closeErrorMessageHandler();
};

export {showErrorMessage};
