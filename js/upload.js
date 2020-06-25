'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('#upload-cancel');

  var getImgUploadOpen = function () {
    imgUploadOverlay.classList.remove('hidden');
  };

  var onUploadPressEsc = function (evt) {
    window.util.onPressEsc(evt, window.form.hashtagsInput, closeUploadOverlay);
  };

  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.picture.body.classList.add('modal-open');
    getImgUploadOpen();
    document.addEventListener('keydown', onUploadPressEsc);
    imgUploadCancel.addEventListener('click', closeUploadOverlay);
  });

  var closeUploadOverlay = function () {
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    window.picture.body.classList.remove('modal-open');
    document.removeEventListener('change', getImgUploadOpen);
    document.removeEventListener('keydown', onUploadPressEsc);
    imgUploadCancel.removeEventListener('click', closeUploadOverlay);
  };
})();
