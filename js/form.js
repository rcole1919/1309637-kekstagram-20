'use strict';

(function () {
  var HASHTAG_RE = /^(#[a-zA-Zа-яА-Я0-9]{1,19})(\s#[a-zA-Zа-яА-Я0-9]{1,19}){0,4}$/;
  var SCALE_MAX_VALUE = 100;
  var SCALE_MIN_VALUE = 25;
  var SCALE_GRID = 25;
  var currentValue = SCALE_MAX_VALUE;

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var scaleControl = document.querySelector('.img-upload__scale');
  var hashtagsInput = document.querySelector('.text__hashtags');

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

  window.form = {
    hashtagsInput: hashtagsInput
  };
})();
