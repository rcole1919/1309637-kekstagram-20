'use strict';

(function () {
  var photos = [];

  var updatePictures = function (filter) {
    switch (filter) {
      case 'filter-random':
        return window.picture.renderPictureList(window.util.shuffleArray(photos.slice()).slice(0, window.const.MAX_RANDOM_PHOTOS));
      case 'filter-discussed':
        return window.picture.renderPictureList(photos.slice().sort(function (a, b) {
          return b.comments.length - a.comments.length;
        }));
      default:
        return window.picture.renderPictureList(photos);
    }
  };

  var imgFilter = document.querySelector('.img-filters');
  imgFilter.classList.remove('img-filters--inactive');

  var imgFilterButtons = document.querySelectorAll('.img-filters__button');

  var onFilterChange = window.debounce(function () {
    var pictures = window.picture.listPictures.querySelectorAll('.picture');
    for (var j = 0; j < pictures.length; j++) {
      window.picture.listPictures.removeChild(pictures[j]);
    }
    updatePictures(window.const.FILTERS[i]);
  });

  var addButtonClickHandler = function (imgFilterButton) {
    imgFilterButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      for (var i = 0; i < imgFilterButtons.length; i++) {
        imgFilterButtons[i].classList.remove('img-filters__button--active');
      }
      imgFilterButton.classList.add('img-filters__button--active');
      window.const.FILTERS[i] = imgFilterButton.id;

      onFilterChange();
    });
  };

  for (var i = 0; i < imgFilterButtons.length; i++) {
    addButtonClickHandler(imgFilterButtons[i]);
  }

  var successHandler = function (data) {
    photos = data;
    window.picture.renderPictureList(photos);
  };

  window.load(successHandler);
})();
