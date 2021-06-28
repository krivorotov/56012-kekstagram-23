import {getMocks} from './get-mocks.js';
import {showFullImage} from './show-full-image.js';

const NUMBER_PHOTOS_PER_PAGE = 25;
const imageContainer = document.querySelector('.pictures');
const imageTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const getImageFragment = (data, template) => {
  const fragment = document.createDocumentFragment();
  data.forEach((photo) => {
    const {url, likes, comments} = photo;
    const imageSampleHandler = () => {
      showFullImage(photo);
    };
    const imageSample = template.cloneNode(true);
    imageSample.querySelector('.picture__img').src = url;
    imageSample.querySelector('.picture__likes').textContent = likes;
    imageSample.querySelector('.picture__comments').textContent = comments.length;
    imageSample.addEventListener('click', imageSampleHandler);
    fragment.appendChild(imageSample);
  });

  return fragment;
};

export const photos = getMocks(NUMBER_PHOTOS_PER_PAGE);
const imageFragment = getImageFragment(photos, imageTemplate);
imageContainer.appendChild(imageFragment);
