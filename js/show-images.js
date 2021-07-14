import {showFullImage} from './show-full-image.js';
import {getRandomArrayElement} from './utils/get-random-array-element.js';

const RANDOM_IMAGES_NUMBER = 10;
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

const showImages = (photos) => {
  const imageFragment = getImageFragment(photos, imageTemplate);
  imageContainer.appendChild(imageFragment);
};

const getRandomImagesArray = (photos) => {
  const array = [];
  while (array.length !== RANDOM_IMAGES_NUMBER) {
    const randomElement = getRandomArrayElement(photos);
    if (!array.includes(randomElement)) {
      array.push(randomElement);
    }
  }
  return array;
};

const showRandomImages = (photos) => {
  const photosArray = getRandomImagesArray(photos);
  const imageFragment = getImageFragment(photosArray, imageTemplate);
  imageContainer.appendChild(imageFragment);
};

const showDiscussedImages = (photos) => {
  const photosCopy = photos.slice();
  photosCopy.sort((imageA, imageB) => imageB.comments.length - imageA.comments.length);
  const imageFragment = getImageFragment(photosCopy, imageTemplate);
  imageContainer.appendChild(imageFragment);
};

export {showImages, showRandomImages, showDiscussedImages};
