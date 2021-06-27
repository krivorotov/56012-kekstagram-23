import {checkStringLength} from './utils/check-string-length.js';

const uploadInput = document.querySelector('.img-upload__input');
const uploadImageForm = document.querySelector('.img-upload__overlay');

const closeUploadImage = () => {
  uploadImageForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = null;
};

const onUploadImageEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeUploadImage();
    document.removeEventListener('keydown', onUploadImageEscKeydown);
  }
};

uploadInput.addEventListener('change', () => {
  uploadImageForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadImageEscKeydown);
});

const uploadImageCloseButton = document.querySelector('.img-upload__cancel');

uploadImageCloseButton.addEventListener('click', () => {
  closeUploadImage();
  document.addEventListener('keydown', onUploadImageEscKeydown);
});

const hashtagsInput = document.querySelector('.text__hashtags');
const correctHashtag = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

const isUnique = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) !== i) {
      return true;
    }
  }
  return false;
};

hashtagsInput.addEventListener('input', () => {
  const array = hashtagsInput.value.split(' ');

  for (let i = 0; i < array.length; i++) {
    if (array.length > 5) {
      hashtagsInput.setCustomValidity('Количество хэштегов не может превышать 5');
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
  evt.stopPropagation();
});

const imageComment = document.querySelector('.text__description');

imageComment.addEventListener('input', () => {
  const maxLength = 140;
  const valueLength = imageComment.value;

  if (!checkStringLength(valueLength, maxLength)) {
    imageComment.setCustomValidity('Комментарий не должен превышать 140 символов');
  } else {
    imageComment.setCustomValidity('');
  }

  imageComment.reportValidity();
});

imageComment.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
