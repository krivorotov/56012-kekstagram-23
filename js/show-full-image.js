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
const photoCaption = fullScreenImage.querySelector('.social__caption');
const visibleCommentsCount = fullScreenImage.querySelector('.visible-comments-count');
const allCommentsCount = fullScreenImage.querySelector('.comments-count');
const commentsLoader = fullScreenImage.querySelector('.comments-loader');

const closeFullImage = () => {
  fullScreenImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  visibleCommentsCount.textContent = null;
  commentsLoader.classList.remove('hidden');
};

const onFullImageEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeFullImage();
    document.removeEventListener('keydown', onFullImageEscKeydown);
  }
};

/*
const isMoreComments = (visibleComments, allComments) => {
  if (visibleComments.length === allComments.length) {
    commentsLoader.classList.add('hidden');
  }
};
*/

const showFullImage = (photo) => {
  bigImage.children[0].src = photo.url;
  likesCount.textContent = photo.likes;
  photoCaption.textContent = photo.description;
  allCommentsCount.textContent = photo.comments.length;
  photo.comments.length > 5 ? visibleCommentsCount.textContent = 5 : visibleCommentsCount.textContent = allCommentsCount.textContent;
  photoComments.innerHTML = '';

  let visibleComments = photo.comments.slice(0, 5);
  photoComments.appendChild(getPictureComments(visibleComments));
  if (visibleComments.length === photo.comments.length) {
    commentsLoader.classList.add('hidden');
  }

  console.log(visibleComments.length);

  commentsLoader.addEventListener('click', () => {
    photoComments.innerHTML = '';
    visibleComments = photo.comments.slice(0, visibleComments.length + 5);
    photoComments.appendChild(getPictureComments(visibleComments));
    visibleCommentsCount.textContent = visibleComments.length;
    console.log(visibleComments.length);
    if (visibleComments.length === photo.comments.length) {
      commentsLoader.classList.add('hidden');
    }
  });

  fullScreenImage.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onFullImageEscKeydown);
};

const fullImageCloseButton = fullScreenImage.querySelector('.big-picture__cancel');

fullImageCloseButton.addEventListener('click', () => {
  closeFullImage();
  document.addEventListener('keydown', onFullImageEscKeydown);
});

export {showFullImage};
