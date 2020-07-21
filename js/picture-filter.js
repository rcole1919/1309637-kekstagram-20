'use strict';

(function () {
  var photos = [];
  var filterId;

  var updatePictures = function (filter) {
    switch (filter) {
      case 'filter-random':
        filterId = filter;
        return window.picture.renderFeed(window.util.shuffleArray(photos.slice()).slice(0, window.const.MAX_RANDOM_PHOTOS));
      case 'filter-discussed':
        filterId = filter;
        return window.picture.renderFeed(photos.slice().sort(function (a, b) {
          return b.comments.length - a.comments.length;
        }));
      default:
        filterId = filter;
        return window.picture.renderFeed(photos);
    }
  };

  var imgFilter = document.querySelector('.img-filters');
  imgFilter.classList.remove('img-filters--inactive');

  var imgFilterButtons = document.querySelectorAll('.img-filters__button');

  var onFilterChange = window.debounce(function () {
    var pictures = window.picture.listPictures.querySelectorAll('.picture');
    pictures.forEach(function (el) {
      window.picture.listPictures.removeChild(el);
    });
    updatePictures(filterId);
  });

  var onButtonClick = function (imgFilterButton) {
    imgFilterButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      imgFilterButtons.forEach(function (el) {
        el.classList.remove('img-filters__button--active');
      });
      imgFilterButton.classList.add('img-filters__button--active');
      filterId = imgFilterButton.id;
      onFilterChange();
    });
  };

  imgFilterButtons.forEach(function (el) {
    onButtonClick(el);
  });

  var onSuccessLoad = function (data) {
    photos = data;
    window.picture.renderFeed(photos);
  };

  window.backend.load(onSuccessLoad);
})();
