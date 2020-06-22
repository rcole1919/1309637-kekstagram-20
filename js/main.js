'use strict';

var PHOTOS_NUMBER = 25;
var AVATARS_NUMBER = 6;
var COMMENTS_NUMBER = 5;
var HASHTAG_RE = /^(#[a-zA-Zа-яА-Я0-9]{1,19})(\s#[a-zA-Zа-яА-Я0-9]{1,19}){0,4}$/;

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

var listPictures = document.querySelector('.pictures');

var bigPicture = document.querySelector('.big-picture');
var body = document.querySelector('body');

var renderLargePicture = function (photo) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  renderModal(bigPicture, photo);
};

var renderModal = function (picture, photo) {
  picture.querySelector('.big-picture__img > img').src = photo.url;
  picture.querySelector('.likes-count').textContent = photo.likes;
};

var picture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var renderPicture = function (photo) {
  var pictureElement = picture.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;

  var onBigPicturePressEsc = function (evt) {
    if (evt.key === 'Escape' && socialFooterText !== document.activeElement) {
      closeBigPicture();
    }
  };

  var onClickPictureElement = function (evt) {
    evt.preventDefault();
    renderLargePicture(photo);
    bigPictureCancel.addEventListener('click', closeBigPicture);
    pictureElement.addEventListener('keydown', onBigPicturePressEsc);
  };

  pictureElement.addEventListener('click', onClickPictureElement);

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPicturePressEsc);
    bigPictureCancel.removeEventListener('click', closeBigPicture);
  };
  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPicture(photos[i]));
}

listPictures.appendChild(fragment);

bigPicture.querySelector('.social__comments').innerHTML = HTMLcomments.join(' ');
bigPicture.querySelector('.comments-count').textContent = photos[0].comments;
bigPicture.querySelector('.social__caption').textContent = photos[0].description;

var socialCommentCount = document.querySelector('.social__comment-count');
socialCommentCount.classList.add('hidden');
var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');


var socialFooterText = document.querySelector('.social__footer-text');
var bigPictureCancel = document.querySelector('.big-picture__cancel');


var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = document.querySelector('#upload-cancel');

var getImgUploadOpen = function () {
  imgUploadOverlay.classList.remove('hidden');
};

var onUploadPressEsc = function (evt) {
  if (evt.key === 'Escape' && hashtagsInput !== document.activeElement) {
    closeUploadOverlay();
  }
};

uploadFile.addEventListener('change', function (evt) {
  evt.preventDefault();
  body.classList.add('modal-open');
  getImgUploadOpen();
  document.addEventListener('keydown', onUploadPressEsc);
  imgUploadCancel.addEventListener('click', closeUploadOverlay);
});

var closeUploadOverlay = function () {
  imgUploadOverlay.classList.add('hidden');
  uploadFile.value = '';
  body.classList.remove('modal-open');
  document.removeEventListener('change', getImgUploadOpen);
  document.removeEventListener('keydown', onUploadPressEsc);
  imgUploadCancel.removeEventListener('click', closeUploadOverlay);
};

var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var scaleControl = document.querySelector('.img-upload__scale');

var SCALE_MAX_VALUE = 100;
var SCALE_MIN_VALUE = 25;
var SCALE_GRID = 25;
var currentValue = SCALE_MAX_VALUE;

scaleControl.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (evt.target === scaleControlSmaller) {
    currentValue = Math.max(SCALE_MIN_VALUE, currentValue - SCALE_GRID);
  } else if (evt.target === scaleControlBigger) {
    currentValue = Math.min(SCALE_MAX_VALUE, currentValue + SCALE_GRID);
  }
  scaleControlValue.value = currentValue + '%';
  imgUploadPreview.style.transform = 'scale(' + currentValue * 0.01 + ')';
});

var imgPreview = imgUploadPreview.querySelector('img');
var filterInputs = document.querySelectorAll('.effects__radio');
var effectLevel = document.querySelector('.img-upload__effect-level');

if (document.querySelector('#effect-none').checked) {
  effectLevel.style.display = 'none';
}

var addFilter = function (evt) {
  imgPreview.removeAttribute('class');
  imgPreview.classList.add('effects__preview--' + evt.target.value);
  effectLevel.style.display = document.querySelector('#effect-none').checked ? 'none' : 'block';
};

for (var inp = 0; inp < filterInputs.length; inp++) {
  filterInputs[inp].addEventListener('change', addFilter);
}

var hashtagsInput = document.querySelector('.text__hashtags');

hashtagsInput.addEventListener('input', function () {
  var hashtags = hashtagsInput.value.toUpperCase().split(' ');
  var onlyUnique = function (value, index, self) {
    return self.indexOf(value) === index;
  };
  if (!HASHTAG_RE.test(hashtagsInput.value)) {
    hashtagsInput.setCustomValidity('Хештег должен содержать как минимум один символ после решетки. Допустимые символы: a-z, A-Z, а-я, А-Я, 0-9. Длина хештега не более 20 символов, включая решетку. Можно ввести не более пяти хештегов');
  } else if (hashtags.length !== hashtags.filter(onlyUnique).length) {
    hashtagsInput.setCustomValidity('Хештеги не должны повторяться');
  } else {
    hashtagsInput.setCustomValidity('');
  }
});
