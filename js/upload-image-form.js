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

function closeUploadImageForm () {
  uploadImagePopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = null;
  hashtagsInput.value = null;
  imageComment.value = null;
}

const onUploadImageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUploadImageForm();
    document.removeEventListener('keydown', onUploadImageEscKeydown);
  }
};

function openUploadImageForm () {
  resetScaleSettings();
  resetEffectSettings();
  uploadImagePopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadImageEscKeydown);
}

uploadInput.addEventListener('change', openUploadImageForm);

uploadImageCloseButton.addEventListener('click', closeUploadImageForm);

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
  const userHashtagsArray = hashtagsInput.value.split(' ');
  const formattedArray = userHashtagsArray.map((hashtag) => hashtag.toLowerCase());

  if (formattedArray.length > MAX_HASHTAG_NUMBER) {
    hashtagsInput.setCustomValidity(`Количество хэштегов не может превышать ${MAX_HASHTAG_NUMBER}`);
    showValidityError(hashtagsInput);
  } else if (isUnique(formattedArray)) {
    hashtagsInput.setCustomValidity('Нельзя использовать один хэш-тег дважды');
    showValidityError(hashtagsInput);
  } else if (!checkElementValidity(formattedArray, correctHashtag)) {
    hashtagsInput.setCustomValidity('Введен неправильный формат хэштега');
    showValidityError(hashtagsInput);
  } else {
    hashtagsInput.setCustomValidity('');
    hideValidityError(hashtagsInput);
  }

  hashtagsInput.reportValidity();
});

const forbidEscape = (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
};

hashtagsInput.addEventListener('keydown', forbidEscape);

imageComment.addEventListener('keydown',  forbidEscape);

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

export {closeUploadImageForm, setImageFormSubmit};
