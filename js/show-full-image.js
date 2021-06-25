const fullScreenImage = document.querySelector('.big-picture');
const photoComments = fullScreenImage.querySelector('.social__comments');

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

const bigImage = fullScreenImage.querySelector('.big-picture__img');
const likesCount = fullScreenImage.querySelector('.likes-count');
const allCommentsNumber = fullScreenImage.querySelector('.comments-count');
const photoCaption = fullScreenImage.querySelector('.social__caption');
const commentsCount = fullScreenImage.querySelector('.social__comment-count');
const commentsLoader = fullScreenImage.querySelector('.comments-loader');

const closeFullImage = () => {
  fullScreenImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onFullImageEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeFullImage();
    document.removeEventListener('keydown', onFullImageEscKeydown);
  }
};

const showFullImage = (photo) => {
  bigImage.children[0].src = photo.url;
  likesCount.textContent = photo.likes;
  allCommentsNumber.textContent = photo.comments.length;
  photoComments.innerHTML = '';
  photoComments.appendChild(getPictureComments(photo.comments));
  photoCaption.textContent = photo.description;

  fullScreenImage.classList.remove('hidden');

  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onFullImageEscKeydown);
};

const fullImageCloseButton = fullScreenImage.querySelector('.big-picture__cancel');

fullImageCloseButton.addEventListener('click', () => {
  closeFullImage();
  document.addEventListener('keydown', onFullImageEscKeydown);
});

export {showFullImage};
