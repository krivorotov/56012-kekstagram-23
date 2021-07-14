import {showImages, showRandomImages, showDiscussedImages} from './show-images.js';
import {getData} from './api.js';
import {setImageFormSubmit} from './upload-image-form.js';
import {showAlert} from './utils/show-alert.js';
import {setDefaultFilter, setRandomFilter, setDiscussedFilter} from './filters.js';
import {debounce} from './utils/debounce.js';

getData(
  (photos) => {
    showImages(photos);
    setDefaultFilter(debounce(() => showImages(photos)));
    setRandomFilter(debounce(() => showRandomImages(photos)));
    setDiscussedFilter(debounce(() => showDiscussedImages(photos)));
  },
  () => showAlert('Не удалось загрузить фотографии. Попробуйте еще раз'),
);

setImageFormSubmit();
