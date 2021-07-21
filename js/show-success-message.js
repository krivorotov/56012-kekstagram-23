import {isEscEvent} from './utils/is-esc-event.js';
import {isOutsideClickEvent} from './utils/is-outside-click-event.js';
import {onUploadImageFormClose} from './upload-image-form.js';

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const onSuccessMessageClose = () => {
  const successMessagePopup = document.querySelector('.success');
  if (successMessagePopup) {
    successMessagePopup.remove();
  }
};

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onSuccessMessageClose();
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  }
};

const onSuccessMessageOutsideClick = (evt) => {
  if (isOutsideClickEvent(evt, 'success__inner')) {
    onSuccessMessageClose();
    document.removeEventListener('click', onSuccessMessageOutsideClick);
  }
};

const showSuccessMessage = () => {
  onUploadImageFormClose();

  const fragment = document.createDocumentFragment();
  const successMessage = successMessageTemplate.cloneNode(true);
  fragment.appendChild(successMessage);
  document.body.appendChild(fragment);

  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', onSuccessMessageOutsideClick);

  const closeSuccessMessageButton = document.querySelector('.success__button');
  closeSuccessMessageButton.addEventListener('click', onSuccessMessageClose);
};

export {showSuccessMessage};
