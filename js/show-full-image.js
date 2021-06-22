import {photos} from './show-images.js';

const fullScreenPic = document.querySelector('.big-picture');
const photoComments = fullScreenPic.querySelector('.social__comments');

const getPictureComments = (el) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < photos[el].comments.length; i++) {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    newComment.innerHTML = `<img class="social__picture" src="${photos[el].comments[i].avatar}" alt="${photos[el].comments[i].name}" width="35" height="35"><p class="social__text">${photos[el].comments[i].message}</p>`;
    fragment.appendChild(newComment);
  }

  return photoComments.appendChild(fragment);
};

const pictures = document.querySelectorAll('.picture');

pictures.forEach((photo) => {
  photo.addEventListener('click', () => {

    const i = Array.prototype.slice.call(pictures).indexOf(photo); //превращаю коллекцию в массив, так как photo нельзя использователь как счетчик

    fullScreenPic.querySelector('.big-picture__img').children[0].src = photos[i].url;
    fullScreenPic.querySelector('.likes-count').textContent = photos[i].likes;
    fullScreenPic.querySelector('.comments-count').textContent = photos[i].comments.length;
    photoComments.innerHTML = ''; //удаляю захардкоженные комментарии из раметки
    getPictureComments(i);
    fullScreenPic.querySelector('.social__caption').textContent = photos[i].description;

    fullScreenPic.classList.remove('hidden');

    fullScreenPic.querySelector('.social__comment-count').classList.add('hidden');
    fullScreenPic.querySelector('.comments-loader').classList.add('hidden');

    document.body.classList.add('modal-open');

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        fullScreenPic.classList.add('hidden');
        document.body.classList.remove('modal-open');
      }
    });
  });
});

const FullPicCloseButton = fullScreenPic.querySelector('.big-picture__cancel');

FullPicCloseButton.addEventListener('click', () => {
  fullScreenPic.classList.add('hidden');
  document.body.classList.remove('modal-open');
});
