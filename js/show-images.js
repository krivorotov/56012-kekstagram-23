import {getMocks} from './get-mocks.js';

const NUMBER_PHOTOS_PER_PAGE = 25;
const imageContainer = document.querySelector('.pictures');
const imageTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const getImageFragment = (data, template) => {
  const fragment = document.createDocumentFragment();
  data.forEach(({url, likes, comments}) => {
    const imageSample = template.cloneNode(true);
    imageSample.querySelector('.picture__img').src = url;
    imageSample.querySelector('.picture__likes').textContent = likes;
    imageSample.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(imageSample);
  });
  return fragment;
};

export const photos = getMocks(NUMBER_PHOTOS_PER_PAGE);
const imageFragment = getImageFragment(photos, imageTemplate);
imageContainer.appendChild(imageFragment);
