'use strict';

(function () {
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
      window.util.onPressEsc(evt, socialFooterText, closeBigPicture);
    };

    var onClickPictureElement = function (evt) {
      evt.preventDefault();
      renderLargePicture(photo);
      bigPictureCancel.addEventListener('click', closeBigPicture);
      document.addEventListener('keydown', onBigPicturePressEsc);
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
  for (var i = 0; i < window.data.photos.length; i++) {
    fragment.appendChild(renderPicture(window.data.photos[i]));
  }

  listPictures.appendChild(fragment);

  bigPicture.querySelector('.social__comments').innerHTML = window.data.HTMLcomments.join(' ');
  bigPicture.querySelector('.comments-count').textContent = window.data.photos[0].comments;
  bigPicture.querySelector('.social__caption').textContent = window.data.photos[0].description;

  var socialCommentCount = document.querySelector('.social__comment-count');
  socialCommentCount.classList.add('hidden');
  var commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');

  var socialFooterText = document.querySelector('.social__footer-text');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  window.picture = {
    body: body
  };
})();
