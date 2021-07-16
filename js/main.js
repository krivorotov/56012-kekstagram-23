import {showImages} from './show-images.js';
import {getData} from './api.js';
import {setImageFormSubmit} from './upload-image-form.js';
import {showAlert} from './utils/show-alert.js';
import {showFilters} from './filters.js';

let photosData;

getData(
  (photos) => {
    photosData = photos;
    showImages(photos);
    showFilters();
  },
  () => showAlert('Не удалось загрузить фотографии. Попробуйте еще раз'),
);

setImageFormSubmit();

export {photosData};
