'use strict';

var PHOTOS_NUMBER = 25;
var AVATARS_NUMBER = 6;
var COMMENTS_NUMBER = 5;

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

var getRandomNumberFromRange = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
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

var comments = [];
for (var j = 0; j < COMMENTS_NUMBER; j++) {
  comments.push(getComment());
}

var getPhoto = function (index) {
  return {
    url: 'photos/' + (index + 1) + '.jpg',
    description: 'Красота',
    likes: getRandomNumberFromRange(15, 200),
    comments: comments.length
  };
};

var photos = [];
for (var k = 0; k < PHOTOS_NUMBER; k++) {
  photos.push(getPhoto(k));
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

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

bigPicture.querySelector('.big-picture__img').src = photos[0].url;

var HTMLcomments = [];
var n = 0;
var getHTMLcomment = function () {
  return '<li class="social__comment"><img class="social__picture" src="' + comments[n].avatar + '" alt="' + comments[n].name + '" width="35" height="35"><p class="social__text">' + comments[n].message + '</p></li>';
};

for (n = 0; n < COMMENTS_NUMBER; n++) {
  HTMLcomments.push(getHTMLcomment());
}

var joinedComments = HTMLcomments.join(' ');

bigPicture.querySelector('.social__comments').innerHTML = joinedComments;

bigPicture.querySelector('.comments-count').textContent = photos[0].comments;
bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
bigPicture.querySelector('.social__caption').textContent = photos[0].description;

var socialCommentCount = document.querySelector('.social__comment-count');
socialCommentCount.classList.add('hidden');
var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');
var body = document.querySelector('body');
body.classList.add('modal-open');
