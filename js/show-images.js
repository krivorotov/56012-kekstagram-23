import {getMocks} from './get-mocks.js';

const imageContainer = document.querySelector('.pictures');
const imageTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createImages = getMocks(25);

const imageFragment = document.createDocumentFragment();

createImages.forEach(({url, likes, comments}) => {
  const imageSample = imageTemplate.cloneNode(true);
  imageSample.querySelector('.picture__img').src = url;
  imageSample.querySelector('.picture__likes').textContent = likes;
  imageSample.querySelector('.picture__comments').textContent = comments.length;
  imageFragment.appendChild(imageSample);
});

imageContainer.appendChild(imageFragment);

export {imageContainer};
