//Скопировал функцию сюда, не получилось импортировать из другого файла, буду рад узнать как это сделать :)
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

const MESSAGES_IN_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES_IN_COMMENTS = ['Андрей', 'Виктор', 'Семен', 'Ярослав', 'Ольга', 'Мария', 'Игорь', 'Владимир', 'Светлана', 'Ирина'];

function createArrayOf25 (number) {
  let array = [];
  for (let i = 1; i <= 25; i++) {
    array.push(i);
  }

  return array[number];
}

let commentsId = 1;

function createRandomComments () {
  let array = [];
  for (let i = 0; i < getRandomPositiveInteger(1, 5); i++) {
    array[i] = {
      id: commentsId++,
      avatar: 'img/avatar-' + getRandomPositiveInteger(1, 6) + '.svg',
      message: getRandomArrayElement(MESSAGES_IN_COMMENTS),
      name: getRandomArrayElement(NAMES_IN_COMMENTS),
    };
  }

  return array;
}

function getImageContent (imageId) {
  return {
    id: createArrayOf25(imageId),
    url: 'photos/' + createArrayOf25(imageId) + '.jpg',
    description: 'Перед вами фотография №' + createArrayOf25(imageId),
    likes: getRandomPositiveInteger(15, 100),
    comments: createRandomComments(),
  };
}

let number = 0;

const photos = new Array(25).fill(null).map(() => getImageContent(number++));
