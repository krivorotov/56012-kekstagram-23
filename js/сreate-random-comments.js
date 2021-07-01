import {getRandomArrayElement} from './utils/get-random-array-element.js';
import {getRandomPositiveInteger} from './utils/get-random-positive-integer.js';

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
const MAX_COMMENTS = 50;

const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

function createRandomComments () {
  const array = [];
  for (let i = 0; i < getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS); i++) {
    array[i] = {
      id: i + 1,
      avatar: `img/avatar-${  getRandomPositiveInteger(MIN_AVATAR, MAX_AVATAR)  }.svg`,
      message: getRandomArrayElement(MESSAGES_IN_COMMENTS),
      name: getRandomArrayElement(NAMES_IN_COMMENTS),
    };
  }

  return array;
}

export {createRandomComments};
