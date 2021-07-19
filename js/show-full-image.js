import {isEscEvent} from './utils/is-esc-event.js';

const LOAD_COMMENTS_NUMBER = 5;

const fullScreenImage = document.querySelector('.big-picture');
const photoComments = fullScreenImage.querySelector('.social__comments');
const bigImage = fullScreenImage.querySelector('.big-picture__img');
const likesCount = fullScreenImage.querySelector('.likes-count');
const photoCaption = fullScreenImage.querySelector('.social__caption');
const visibleCommentsCount = fullScreenImage.querySelector('.visible-comments-count');
const allCommentsCount = fullScreenImage.querySelector('.comments-count');
const commentsLoader = fullScreenImage.querySelector('.comments-loader');
const fullImageCloseButton = fullScreenImage.querySelector('.big-picture__cancel');

let currentCommentsNumber;
let currentComments = [];

const getPictureComments = (comments) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < comments.length; i++) {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    newComment.innerHTML = `<img class="social__picture" src="${comments[i].avatar}" alt="${comments[i].name}" width="35" height="35"><p class="social__text">${comments[i].message}</p>`;
    fragment.appendChild(newComment);
  }

  return fragment;
};

const isMoreComments = (allComments, loadedComments) => {
  if (loadedComments >= allComments) {
    commentsLoader.classList.add('hidden');
  }
};

const closeFullImage = () => {
  fullScreenImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  visibleCommentsCount.textContent = null;
  commentsLoader.classList.remove('hidden');
};

const commentLoaderHandler = () => {
  photoComments.innerHTML = '';

  currentCommentsNumber += LOAD_COMMENTS_NUMBER;
  const newComments = currentComments.slice(0, currentCommentsNumber);
  photoComments.appendChild(getPictureComments(newComments));

  visibleCommentsCount.textContent = newComments.length;
  isMoreComments(currentComments.length, newComments.length);
};

const onFullImageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeFullImage();
    document.removeEventListener('keydown', onFullImageEscKeydown);
    document.removeEventListener('keydown', commentLoaderHandler);
  }
};

const showFullImage = (photo) => {
  bigImage.children[0].src = photo.url;
  likesCount.textContent = photo.likes;
  photoCaption.textContent = photo.description;

  allCommentsCount.textContent = photo.comments.length;
  visibleCommentsCount.textContent = photo.comments.length > LOAD_COMMENTS_NUMBER ? LOAD_COMMENTS_NUMBER : allCommentsCount.textContent;
  photoComments.innerHTML = '';

  photoComments.appendChild(getPictureComments(photo.comments.slice(0, LOAD_COMMENTS_NUMBER)));
  isMoreComments(photo.comments.length, LOAD_COMMENTS_NUMBER);

  currentCommentsNumber = LOAD_COMMENTS_NUMBER;
  currentComments = photo.comments;
  commentsLoader.addEventListener('click', commentLoaderHandler);

  fullScreenImage.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onFullImageEscKeydown);
};

fullImageCloseButton.addEventListener('click', () => {
  closeFullImage();
  document.addEventListener('keydown', onFullImageEscKeydown);
});

export {showFullImage};
