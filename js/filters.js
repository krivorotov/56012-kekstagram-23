const filters = document.querySelector('.img-filters');
const filtersButtons = filters.querySelectorAll('.img-filters__button');
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
  defaultFilter.addEventListener('click', () => {
    changeActiveButton(defaultFilter);
    document.querySelectorAll('.picture').forEach((el) => el.remove());
    cb();
  });
};

const setRandomFilter = (cb) => {
  randomFilter.addEventListener('click', () => {
    changeActiveButton(randomFilter);
    document.querySelectorAll('.picture').forEach((el) => el.remove());
    cb();
  });
};

const setDiscussedFilter = (cb) => {
  discussedFilter.addEventListener('click', () => {
    changeActiveButton(discussedFilter);
    document.querySelectorAll('.picture').forEach((el) => el.remove());
    cb();
  });
};

export {showFilters, setDefaultFilter, setRandomFilter, setDiscussedFilter};
