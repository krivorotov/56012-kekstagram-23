import {debounce} from './utils/debounce.js';
import {showImages, showRandomImages, showDiscussedImages} from './show-images.js';
import {getImages} from './main.js';

const filters = document.querySelector('.img-filters');
const filtersButtons = filters.querySelectorAll('.img-filters__button');
const filtersForm = filters.querySelector('.img-filters__form');
const defaultFilter = filters.querySelector('#filter-default');
const randomFilter = filters.querySelector('#filter-random');
const discussedFilter = filters.querySelector('#filter-discussed');

const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

const changeActiveButton = (activeFilter) => {
  filtersButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
  activeFilter.classList.add('img-filters__button--active');
};

const setDefaultFilter = (cb) => {
  changeActiveButton(defaultFilter);
  document.querySelectorAll('.picture').forEach((el) => el.remove());
  cb();
};

const setRandomFilter = (cb) => {
  changeActiveButton(randomFilter);
  document.querySelectorAll('.picture').forEach((el) => el.remove());
  cb();
};

const setDiscussedFilter = (cb) => {
  changeActiveButton(discussedFilter);
  document.querySelectorAll('.picture').forEach((el) => el.remove());
  cb();
};

const filterChangeHandler = (evt) => {
  const imagesData = getImages();

  switch (evt.target.id) {
    case 'filter-default':
      return setDefaultFilter(debounce(() => showImages(imagesData)));
    case 'filter-random':
      return setRandomFilter(debounce(() => showRandomImages(imagesData)));
    case 'filter-discussed':
      return setDiscussedFilter(debounce(() => showDiscussedImages(imagesData)));
  }
};

filtersForm.addEventListener('click', filterChangeHandler);

export {showFilters, setDefaultFilter, setRandomFilter, setDiscussedFilter};
