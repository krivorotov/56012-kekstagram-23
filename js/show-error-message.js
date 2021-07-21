import {isEscEvent} from './utils/is-esc-event.js';
import {isOutsideClickEvent} from './utils/is-outside-click-event.js';
import {onUploadImageFormClose} from './upload-image-form.js';

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const onErrorMessageClose = () => document.querySelector('.error').remove();

const onErrorMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onErrorMessageClose();
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
  }
};

const onErrorMessageOutsideClick = (evt) => {
  if (isOutsideClickEvent(evt, 'error__inner')) {
    onErrorMessageClose();
    document.removeEventListener('click', onErrorMessageOutsideClick);
  }
};

const showErrorMessage = () => {
  onUploadImageFormClose();

  const fragment = document.createDocumentFragment();
  const errorMessage = errorMessageTemplate.cloneNode(true);
  fragment.appendChild(errorMessage);
  document.body.appendChild(fragment);

  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onErrorMessageOutsideClick);

  const closeErrorMessageButton = document.querySelector('.error__button');
  closeErrorMessageButton.addEventListener('click', onErrorMessageClose);
};

export {showErrorMessage};
