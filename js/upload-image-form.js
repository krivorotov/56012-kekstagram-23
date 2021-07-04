import {isUnique} from './utils/is-unique.js';
import {isEscEvent} from './utils/is-esc-event.js';
import {resetEffectSettings} from './set-effect.js';
import {resetScaleSettings} from './scale-image.js';

const MAX_HASHTAG_NUMBER = 5;
const uploadInput = document.querySelector('.img-upload__input');
const uploadImageForm = document.querySelector('.img-upload__overlay');
const uploadImageCloseButton = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const imageComment = document.querySelector('.text__description');
const correctHashtag = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

const onUploadImageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeUploadImageForm();
  }
};

function openUploadImageForm () {
  resetScaleSettings();
  resetEffectSettings();
  uploadImageForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadImageEscKeydown);
}

function closeUploadImageForm () {
  uploadImageForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = null;
  document.removeEventListener('keydown', onUploadImageEscKeydown);
}

uploadInput.addEventListener('change', () => {
  openUploadImageForm();
});

uploadImageCloseButton.addEventListener('click', () => {
  closeUploadImageForm();
});

hashtagsInput.addEventListener('input', () => {
  const array = hashtagsInput.value.split(' ');

  for (let i = 0; i < array.length; i++) {
    if (array.length > MAX_HASHTAG_NUMBER) {
      hashtagsInput.setCustomValidity(`Количество хэштегов не может превышать ${MAX_HASHTAG_NUMBER}`);
    } else if (isUnique(array)) {
      hashtagsInput.setCustomValidity('Нельзя использовать один хэш-тег дважды');
    } else if (!correctHashtag.test(array[i])) {
      hashtagsInput.setCustomValidity('Введен неправильный формат хэштега');
    } else {
      hashtagsInput.setCustomValidity('');
    }
  }

  hashtagsInput.reportValidity();
});

hashtagsInput.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

imageComment.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});
