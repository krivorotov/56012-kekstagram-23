import './show-images.js';
import {photos} from './show-images.js';

const fullScreenPic = document.querySelector('.big-picture');

const getCommentsContent = (el) => {
  const photoComments = fullScreenPic.querySelector('.social__comments');
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < photos[el].comments.length; i++) {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    newComment.innerHTML = `<img class="social__picture" src="${  photos[el].comments.avatar  }" alt="${  photos[el].comments.name  }" width="35" height="35">`;
    newComment.innerHTML = `<p class="social__text">${  photos[el].comments.message  }</p>`;

    fragment.appendChild(newComment);
  }

  return photoComments.appendChild(fragment);
};

const pictures = document.querySelectorAll('.picture');

pictures.forEach((photo) => {
  photo.addEventListener('click', (evt) => {
    evt.preventDefault();

    const i = Array.prototype.slice.call(pictures).indexOf(photo);

    fullScreenPic.querySelector('.big-picture__img').children[0].src = photos[i].url;
    fullScreenPic.querySelector('.likes-count').textContent = photos[i].likes;
    fullScreenPic.querySelector('.comments-count').textContent = photos[i].comments.length;

    fullScreenPic.querySelector('.social__caption').textContent = photos[i].description;
    getCommentsContent(i);
    fullScreenPic.classList.remove('hidden');
  });
});
