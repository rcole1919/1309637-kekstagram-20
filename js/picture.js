'use strict';

(function () {
  var listPictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var body = document.querySelector('body');
  var commentsLoader = document.querySelector('.comments-loader');
  var socialFooterText = document.querySelector('.social__footer-text');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var socialCommentList = document.querySelector('.social__comments');
  var socialComment = document.querySelector('.social__comment');

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

    if (allCommentsNumber <= window.const.COMMENTS_NUMBER) {
      socialCommentCount.textContent = allCommentsNumber + ' ' + window.util.chooseDeclination(allCommentsNumber, ['комментарий', 'комментария', 'комментариев']);
    } else {
      socialCommentCount.innerHTML = '5 из <span class="comments-count">' + allCommentsNumber + '</span> комментариев';
    }
    socialCommentList.textContent = '';

    var renderSocialComment = function (i) {
      var socialCommentElement = socialComment.cloneNode(true);
      socialCommentElement.querySelector('.social__picture').src = photo.comments[i].avatar;
      socialCommentElement.querySelector('.social__picture').alt = photo.comments[i].name;
      socialCommentElement.querySelector('.social__text').textContent = photo.comments[i].message;

      return socialCommentElement;
    };

    if (allCommentsNumber >= window.const.COMMENTS_NUMBER) {
      for (var i = 0; i < window.const.COMMENTS_NUMBER; i++) {
        socialCommentList.appendChild(renderSocialComment(i));
      }
    } else {
      for (i = 0; i < allCommentsNumber; i++) {
        socialCommentList.appendChild(renderSocialComment(i));
      }
    }

    var j = window.const.COMMENTS_NUMBER;
    var onCommentsLoad = function (evt) {
      evt.preventDefault();
      if (allCommentsNumber - j < window.const.COMMENTS_NUMBER) {
        for (i = j; i < allCommentsNumber; i++) {
          socialCommentList.appendChild(renderSocialComment(i));
        }
      } else {
        for (i = j; i < j + window.const.COMMENTS_NUMBER; i++) {
          socialCommentList.appendChild(renderSocialComment(i));
        }
        j += window.const.COMMENTS_NUMBER;
      }

      if (allCommentsNumber === socialCommentList.children.length) {
        commentsLoader.classList.add('hidden');
        commentsLoader.removeEventListener('click', onCommentsLoad);
      }
    };

    commentsLoader.addEventListener('click', onCommentsLoad);

    if (allCommentsNumber > window.const.COMMENTS_NUMBER) {
      commentsLoader.classList.remove('hidden');
    } else {
      commentsLoader.classList.add('hidden');
    }

    var onBigPicturePressEsc = function (evt) {
      if (socialFooterText !== document.activeElement) {
        window.util.onPressEsc(evt, onBigPictureClose);
      }
    };

    var onBigPictureClose = function () {
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
      socialCommentCount.classList.remove('hidden');
      document.removeEventListener('keydown', onBigPicturePressEsc);
      bigPictureCancel.removeEventListener('click', onBigPictureClose);
      commentsLoader.removeEventListener('click', onCommentsLoad);
    };

    bigPictureCancel.addEventListener('click', onBigPictureClose);
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

    var onPictureElementClick = function (evt) {
      evt.preventDefault();
      renderLargePicture(photo);
    };

    pictureElement.addEventListener('click', onPictureElementClick);

    return pictureElement;
  };

  var fragment = document.createDocumentFragment();
  var renderFeed = function (data) {
    data.forEach(function (el) {
      fragment.appendChild(renderPicture(el));
    });

    listPictures.appendChild(fragment);
  };

  window.picture = {
    body: body,
    listPictures: listPictures,
    renderFeed: renderFeed
  };
})();
