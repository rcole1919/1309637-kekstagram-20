'use strict';

(function () {
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

  var getArray = function (number, func) {
    var pins = [];
    for (var j = 0; j < number; j++) {
      pins.push(func(j));
    }
    return pins;
  };

  var getComment = function () {
    return {
      avatar: 'img/avatar-' + getRandomNumber(AVATARS_NUMBER) + '.svg',
      message: getRandomElementFromArray(MESSAGES),
      name: getRandomElementFromArray(NAMES)
    };
  };

  var getPhoto = function (index) {
    return {
      url: 'photos/' + (index + 1) + '.jpg',
      description: 'Красота',
      likes: getRandomNumberFromRange(15, 200),
      comments: comments.length
    };
  };

  var getHTMLcomment = function (n) {
    return '<li class="social__comment"><img class="social__picture" src="' + comments[n].avatar + '" alt="' + comments[n].name + '" width="35" height="35"><p class="social__text">' + comments[n].message + '</p></li>';
  };

  var comments = getArray(COMMENTS_NUMBER, getComment);

  var photos = getArray(PHOTOS_NUMBER, getPhoto);

  var HTMLcomments = getArray(COMMENTS_NUMBER, getHTMLcomment);

  window.data = {
    PHOTOS_NUMBER: PHOTOS_NUMBER,
    AVATARS_NUMBER: AVATARS_NUMBER,
    COMMENTS_NUMBER: COMMENTS_NUMBER,
    NAMES: NAMES,
    MESSAGES: MESSAGES,
    comments: comments,
    photos: photos,
    HTMLcomments: HTMLcomments
  };
})();
