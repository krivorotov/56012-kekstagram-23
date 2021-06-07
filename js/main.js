const MESSAGES_IN_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES_IN_COMMENTS = ['Андрей', 'Виктор', 'Семен', 'Ярослав', 'Ольга', 'Мария', 'Игорь', 'Владимир', 'Светлана', 'Ирина'];

const MIN_COMMENTS = 1;
const MAX_COMMENTS = 5;

const MIN_LIKES = 15;
const MAX_LIKES = 100;

const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

let commentsId = 1;

function createRandomComments () {
  const array = [];
  for (let i = 0; i < getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS); i++) {
    array[i] = {
      id: commentsId++,
      avatar: `img/avatar-${  getRandomPositiveInteger(MIN_AVATAR, MAX_AVATAR)  }.svg`,
      message: getRandomArrayElement(MESSAGES_IN_COMMENTS),
      name: getRandomArrayElement(NAMES_IN_COMMENTS),
    };
  }

  return array;
}

function getImageContent (imageId) {
  return {
    id: imageId,
    url: `photos/${  imageId  }.jpg`,
    description: `Перед вами фотография №${  imageId  }`,
    likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
    comments: createRandomComments(),
  };
}

function getMocks (number) {
  let count = 1;

  return new Array(number).fill(null).map(() => getImageContent(count++));
}

getMocks(25);
