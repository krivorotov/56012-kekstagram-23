import {showImages} from './show-images.js';
import {getData} from './api.js';
import {closeUploadImageForm, setImageFormSubmit} from './upload-image-form.js';
import {showAlert} from './utils/show-alert.js';

getData(
  (photos) => {
    showImages(photos);
  },
  () => showAlert('Не удалось загрузить фотографии. Попробуйте еще раз'),
);

setImageFormSubmit(closeUploadImageForm);
