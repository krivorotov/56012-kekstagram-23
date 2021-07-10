import {showSuccessMessage} from './show-success-message.js';
import {showErrorMessage} from './show-error-message.js';
import {closeUploadImageForm} from './upload-image-form.js';

const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        onFail('Не удалось загрузить фотографии. Попробуйте еще раз');
      }
    })
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail('Не удалось загрузить фотографии. Попробуйте еще раз');
    });
};

const sendData = (onSuccess, body) => {
  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        showSuccessMessage();
      } else {
        closeUploadImageForm();
        showErrorMessage();
      }
    })
    .catch(() => {
      showErrorMessage();
    });
};

export {getData, sendData};
