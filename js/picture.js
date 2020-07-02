'use strict';

(function () {
  var listPictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var body = document.querySelector('body');
  var commentsLoader = document.querySelector('.comments-loader');

  var renderLargePicture = function (photo) {
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    renderModal(bigPicture, photo);
  };

  var renderModal = function (picture, photo) {
    picture.querySelector('.big-picture__img > img').src = photo.url;
    picture.querySelector('.likes-count').textContent = photo.likes;
    picture.querySelector('.social__caption').textContent = photo.description;

    var getHTMLcomment = function (i) {
      return '<li class="social__comment"><img class="social__picture" src="' + photo.comments[i].avatar + '" alt="' + photo.comments[i].name + '" width="35" height="35"><p class="social__text">' + photo.comments[i].message + '</p></li>';
    };

    var HTMLcomments = window.util.getArray(photo.comments.length, getHTMLcomment);
    var socialCommentList = picture.querySelector('.social__comments');
    socialCommentList.innerHTML = HTMLcomments.join(' ');

    if (socialCommentList.children.length > window.data.COMMENTS_NUMBER) {
      commentsLoader.classList.remove('hidden');
    } else {
      commentsLoader.classList.add('hidden');
    }

    for (var i = window.data.COMMENTS_NUMBER; i < photo.comments.length; i++) {
      socialCommentList.children[i].classList.add('hidden');
    }

    var j = window.data.COMMENTS_NUMBER;
    var onLoadComments = function (evt) {
      evt.preventDefault();
      for (var k = j; k < j + window.data.COMMENTS_NUMBER; k++) {
        if (k === socialCommentList.children.length) {
          break;
        }
        socialCommentList.children[k].classList.remove('hidden');
      }
      if (k === socialCommentList.children.length) {
        commentsLoader.classList.add('hidden');
        commentsLoader.removeEventListener('click', onLoadComments);
      }
      j += window.data.COMMENTS_NUMBER;
    };

    commentsLoader.addEventListener('click', onLoadComments);

    picture.querySelector('.comments-count').textContent = photo.comments.length;
  };

  var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPicture = function (photo) {
    var pictureElement = picture.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
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

  var successHandler = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i]));
    }

    listPictures.appendChild(fragment);
  };

  window.load(successHandler);

  // bigPicture.querySelector('.comments-count').textContent = window.data.photos[0].comments;

  // var socialCommentCount = document.querySelector('.social__comment-count');
  // socialCommentCount.classList.add('hidden');
  // var commentsLoader = document.querySelector('.comments-loader');
  // commentsLoader.classList.add('hidden');

  var socialFooterText = document.querySelector('.social__footer-text');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  window.picture = {
    body: body
  };
})();
