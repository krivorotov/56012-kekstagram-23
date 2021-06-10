import {getRandomPositiveInteger} from './utils/get-random-positive-integer.js';
import {createRandomComments} from './сreate-random-comments.js';

const MIN_LIKES = 15;
const MAX_LIKES = 100;

function getImageContent (imageId) {
  return {
    id: imageId,
    url: `photos/${  imageId  }.jpg`,
    description: `Перед вами фотография №${  imageId  }`,
    likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
    comments: createRandomComments(),
  };
}

export {getImageContent};
