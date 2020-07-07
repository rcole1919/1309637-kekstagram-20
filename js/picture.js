'use strict';

(function () {
  var COMMENTS_NUMBER = 5;
  var listPictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var body = document.querySelector('body');
  var commentsLoader = document.querySelector('.comments-loader');
  var socialFooterText = document.querySelector('.social__footer-text');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var socialCommentCount = document.querySelector('.social__comment-count');

  var renderLargePicture = function (photo) {
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    renderModal(bigPicture, photo);
  };

  var renderModal = function (picture, photo) {
    var allCommentsNumber = photo.comments.length;
    picture.querySelector('.big-picture__img > img').src = photo.url;
    picture.querySelector('.likes-count').textContent = photo.likes;
    picture.querySelector('.social__caption').textContent = photo.description;

    if (allCommentsNumber <= COMMENTS_NUMBER) {
      socialCommentCount.textContent = allCommentsNumber + ' ' + window.util.declination(allCommentsNumber, ['комментарий', 'комментария', 'комментариев']);
    } else {
      socialCommentCount.innerHTML = '5 из <span class="comments-count">' + allCommentsNumber + '</span> комментариев';
    }

    var getHTMLcomment = function (i) {
      return '<li class="social__comment"><img class="social__picture" src="' + photo.comments[i].avatar + '" alt="' + photo.comments[i].name + '" width="35" height="35"><p class="social__text">' + photo.comments[i].message + '</p></li>';
    };

    var HTMLcomments = window.util.getArray(allCommentsNumber, getHTMLcomment);
    var socialCommentList = picture.querySelector('.social__comments');
    socialCommentList.innerHTML = HTMLcomments.slice(0, COMMENTS_NUMBER).join(' ');

    var j = COMMENTS_NUMBER;
    var onLoadComments = function (evt) {
      evt.preventDefault();
      socialCommentList.insertAdjacentHTML('beforeend', HTMLcomments.slice(j, j + COMMENTS_NUMBER).join(' '));
      j += COMMENTS_NUMBER;
      if (allCommentsNumber === socialCommentList.children.length) {
        commentsLoader.classList.add('hidden');
        commentsLoader.removeEventListener('click', onLoadComments);
      }
    };

    commentsLoader.addEventListener('click', onLoadComments);

    if (allCommentsNumber > COMMENTS_NUMBER) {
      commentsLoader.classList.remove('hidden');
    } else {
      commentsLoader.classList.add('hidden');
    }

    var onBigPicturePressEsc = function (evt) {
      if (socialFooterText !== document.activeElement) {
        window.util.onPressEsc(evt, closeBigPicture);
      }
    };

    var closeBigPicture = function () {
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
      socialCommentCount.classList.remove('hidden');
      document.removeEventListener('keydown', onBigPicturePressEsc);
      bigPictureCancel.removeEventListener('click', closeBigPicture);
      commentsLoader.removeEventListener('click', onLoadComments);
      j = COMMENTS_NUMBER;
    };

    bigPictureCancel.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', onBigPicturePressEsc);
  };

  var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPicture = function (photo) {
    var pictureElement = picture.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;

    var onClickPictureElement = function (evt) {
      evt.preventDefault();
      renderLargePicture(photo);
    };

    pictureElement.addEventListener('click', onClickPictureElement);

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

  window.picture = {
    body: body
  };
})();
