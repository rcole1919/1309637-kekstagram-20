'use strict';

var PHOTOS_NUMBER = 25;
var AVATARS_NUMBER = 6;
var COMMENTS_NUMBER = 3;

var NAMES = [
  'Игорь',
  'Александр',
  'Анна',
  'Наталья',
  'Анатолий',
  'Владимир',
  'Любовь',
  'Светлана',
  'Дмитрий',
  'Марина',
  'Егор'
];

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomNumber = function (value) {
  return Math.floor(Math.random() * value) + 1;
};

var getRandomElementFromArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomNumber(AVATARS_NUMBER) + '.svg',
    message: getRandomElementFromArray(MESSAGES),
    name: getRandomElementFromArray(NAMES)
  };
};

var theseComments = [];
for (var j = 0; j < getRandomNumber(COMMENTS_NUMBER); j++) {
  theseComments.push(getComment());
}

var getPhoto = function () {
  return {
    url: 'photos/' + getRandomNumber(PHOTOS_NUMBER) + '.jpg',
    description: 'Красота',
    likes: Math.floor(Math.random() * 185) + 16,
    comments: theseComments
  };
};

var photos = [];
for (var k = 0; k < PHOTOS_NUMBER; k++) {
  photos.push(getPhoto());
}

var listPictures = document.querySelector('.pictures');

var picture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var renderPicture = function (photo) {
  var pictureElement = picture.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;

  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPicture(photos[i]));
}

listPictures.appendChild(fragment);
