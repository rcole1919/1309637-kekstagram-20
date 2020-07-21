'use strict';

(function () {
  var currentValue = window.const.SCALE_MAX_VALUE;

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var scaleControl = document.querySelector('.img-upload__scale');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');

  scaleControl.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (evt.target === scaleControlSmaller || evt.target === scaleControlBigger) {
      var newValue = currentValue + (evt.target === scaleControlSmaller ? -window.const.SCALE_GRID : window.const.SCALE_GRID);
      if (newValue > window.const.SCALE_MAX_VALUE || newValue < window.const.SCALE_MIN_VALUE) {
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

  var onfilterInputChange = function (evt) {
    imgPreview.removeAttribute('class');
    imgPreview.classList.add('effects__preview--' + evt.target.value);
    imgPreview.style.filter = '';
    effectLevel.style.display = document.querySelector('#effect-none').checked ? 'none' : 'block';
    effectLevelPin.style.left = effectLevelLine.offsetWidth + 'px';
    effectLevelDepth.style.width = '100%';
  };

  var getDefaultValue = function () {
    imgPreview.removeAttribute('class');
    imgPreview.style.filter = '';
    effectLevel.style.display = 'none';
    effectLevelPin.style.left = effectLevelLine.offsetWidth + 'px';
    effectLevelDepth.style.width = '100%';
    scaleControlValue.value = '100%';
    currentValue = window.const.SCALE_MAX_VALUE;
    imgUploadPreview.style.transform = 'scale(1)';
    hashtagsInput.value = '';
    document.querySelector('#upload-file').value = '';
    textDescription.value = '';
    window.picture.body.classList.remove('modal-open');
  };

  filterInputs.forEach(function (el) {
    el.addEventListener('change', onfilterInputChange);
  });

  hashtagsInput.addEventListener('input', function () {
    var hashtags = hashtagsInput.value.toLowerCase().split(' ');
    if (!window.const.HASHTAG_RE.test(hashtagsInput.value)) {
      hashtagsInput.setCustomValidity('Хештег должен содержать как минимум один символ после решетки. Допустимые символы: a-z, A-Z, а-я, А-Я, 0-9. Длина хештега не более 20 символов, включая решетку. Можно ввести не более пяти хештегов');
      hashtagsInput.style.outline = window.const.OUTLINE_INVALID_STYLE;
    } else if (hashtags.length !== hashtags.filter(window.util.getOnlyUnique).length) {
      hashtagsInput.setCustomValidity('Хештеги не должны повторяться');
      hashtagsInput.style.outline = window.const.OUTLINE_INVALID_STYLE;
    } else {
      hashtagsInput.setCustomValidity('');
      hashtagsInput.removeAttribute('style');
    }
  });

  var main = document.querySelector('main');
  var success = document.querySelector('#success')
    .content
    .querySelector('.success');

  var error = document.querySelector('#error')
    .content
    .querySelector('.error');

  var successButton = success.querySelector('.success__button');
  var errorButton = error.querySelector('.error__button');

  var showMessage = function (node, button, closeFunc, onMessagePressEsc) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(node);
    main.appendChild(fragment);
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    button.addEventListener('click', closeFunc);
    document.addEventListener('keydown', onMessagePressEsc);
  };

  var onSuccessShow = function () {
    showMessage(success, successButton, onSuccessClose, onSuccessPressEsc);
  };

  var onErrorShow = function () {
    showMessage(error, errorButton, onErrorClose, onErrorPressEsc);
  };

  var onSuccessPressEsc = function (evt) {
    window.util.onPressEsc(evt, onSuccessClose);
  };
  var onErrorPressEsc = function (evt) {
    window.util.onPressEsc(evt, onErrorClose);
  };

  var closeMessage = function (node, button, closeFunc, onMessagePressEsc) {
    node.remove();
    button.removeEventListener('click', closeFunc);
    document.removeEventListener('keydown', onMessagePressEsc);
    getDefaultValue();
  };

  var onSuccessClose = function () {
    closeMessage(success, successButton, onSuccessClose, onSuccessPressEsc);
  };

  var onErrorClose = function () {
    closeMessage(error, errorButton, onErrorClose, onErrorPressEsc);
  };

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccessShow, onErrorShow);
    evt.preventDefault();
  });

  window.form = {
    hashtagsInput: hashtagsInput,
    filterInputs: filterInputs,
    imgPreview: imgPreview,
    getDefaultValue: getDefaultValue
  };
})();
