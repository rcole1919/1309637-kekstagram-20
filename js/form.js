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
    if (evt.target === scaleControlSmaller || evt.target === scaleControlBigger) {
      var newValue = currentValue + (evt.target === scaleControlSmaller ? -SCALE_GRID : SCALE_GRID);
      if (newValue > SCALE_MAX_VALUE || newValue < SCALE_MIN_VALUE) {
        return;
      }
      currentValue = newValue;
      scaleControlValue.value = currentValue + '%';
      imgUploadPreview.style.transform = 'scale(' + currentValue * 0.01 + ')';
    }
  });

  var imgPreview = imgUploadPreview.querySelector('img');
  var filterInputs = document.querySelectorAll('.effects__radio');
  var effectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  if (document.querySelector('#effect-none').checked) {
    effectLevel.style.display = 'none';
  }

  var addFilter = function (evt) {
    imgPreview.removeAttribute('class');
    imgPreview.classList.add('effects__preview--' + evt.target.value);
    imgPreview.style.filter = '';
    effectLevel.style.display = document.querySelector('#effect-none').checked ? 'none' : 'block';
    effectLevelPin.style.left = effectLevelLine.offsetWidth + 'px';
    effectLevelDepth.style.width = '100%';
  };

  for (var i = 0; i < filterInputs.length; i++) {
    filterInputs[i].addEventListener('change', addFilter);
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
    hashtagsInput: hashtagsInput,
    filterInputs: filterInputs,
    imgPreview: imgPreview
  };
})();
