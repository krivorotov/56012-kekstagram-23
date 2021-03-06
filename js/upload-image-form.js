import {isUnique} from './utils/is-unique.js';
import {isEscEvent} from './utils/is-esc-event.js';
import {resetEffectSettings} from './set-effect.js';
import {resetScaleSettings} from './scale-image.js';
import {sendData} from './api.js';
import {showSuccessMessage} from './show-success-message.js';
import {showErrorMessage} from './show-error-message.js';

const MAX_HASHTAG_NUMBER = 5;

const uploadImageForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadImagePopup = document.querySelector('.img-upload__overlay');
const uploadImageCloseButton = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const imageComment = document.querySelector('.text__description');

const correctHashtag = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const spaceRegex = /\s+/;

const onUploadImageFormClose = () => {
  uploadImagePopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = null;
  hashtagsInput.value = null;
  imageComment.value = null;
};

const onUploadImageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onUploadImageFormClose();
    document.removeEventListener('keydown', onUploadImageEscKeydown);
  }
};

const onUploadImageFormOpen = () => {
  resetScaleSettings();
  resetEffectSettings();
  uploadImagePopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadImageEscKeydown);
};

uploadInput.addEventListener('change', onUploadImageFormOpen);

uploadImageCloseButton.addEventListener('click', onUploadImageFormClose);

const showValidityError = (input) => {
  input.style.borderColor = 'red';
  input.style.borderWidth = '3px';
};

const hideValidityError = (input) => {
  input.style.borderColor = '';
  input.style.borderWidth = '';
};

const checkElementValidity = (hashtags, validation) => hashtags.every((element) => validation.test(element));

hashtagsInput.addEventListener('input', () => {
  const hashtagsArray = hashtagsInput.value.toLowerCase().split(spaceRegex);

  if (hashtagsArray.length > MAX_HASHTAG_NUMBER) {
    hashtagsInput.setCustomValidity(`Количество хэштегов не может превышать ${MAX_HASHTAG_NUMBER}`);
    showValidityError(hashtagsInput);
  } else if (isUnique(hashtagsArray)) {
    hashtagsInput.setCustomValidity('Нельзя использовать один хэш-тег дважды');
    showValidityError(hashtagsInput);
  } else if (!checkElementValidity(hashtagsArray, correctHashtag)) {
    hashtagsInput.setCustomValidity('Введен неправильный формат хэштега');
    showValidityError(hashtagsInput);
  } else {
    hashtagsInput.setCustomValidity('');
    hideValidityError(hashtagsInput);
  }

  hashtagsInput.reportValidity();
});

const onEscapeForbid = (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
};

hashtagsInput.addEventListener('keydown', onEscapeForbid);

imageComment.addEventListener('keydown',  onEscapeForbid);

const setImageFormSubmit = () => {
  uploadImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      showSuccessMessage,
      showErrorMessage,
      new FormData(evt.target),
    );
  });
};

export {onUploadImageFormClose, setImageFormSubmit};
