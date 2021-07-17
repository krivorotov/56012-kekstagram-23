import {showImages} from './show-images.js';
import {getData} from './api.js';
import {setImageFormSubmit} from './upload-image-form.js';
import {showAlert} from './utils/show-alert.js';
import {showFilters} from './filters.js';

let imagesData;

const getImages = () => imagesData;

getData(
  (photos) => {
    imagesData = photos;
    showImages(photos);
    showFilters();
  },
  () => showAlert('Не удалось загрузить фотографии. Попробуйте еще раз'),
);

setImageFormSubmit();

export {getImages};
