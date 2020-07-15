'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/kekstagram/data';
  var URL_SAVE = 'https://javascript.pages.academy/kekstagram';
  var DEBOUNCE_INTERVAL = 500;
  var HASHTAG_RE = /^(#[a-zA-Zа-яА-Я0-9]{1,19})(\s#[a-zA-Zа-яА-Я0-9]{1,19}){0,4}$/;
  var SCALE_MAX_VALUE = 100;
  var SCALE_MIN_VALUE = 25;
  var SCALE_GRID = 25;
  var COMMENTS_NUMBER = 5;
  var MAX_RANDOM_PHOTOS = 10;
  var FILTERS = [
    'filter-default',
    'filter-random',
    'filter-discussed'
  ];
  var StatusCode = {
    OK: 200
  };

  window.const = {
    URL_LOAD: URL_LOAD,
    URL_SAVE: URL_SAVE,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    HASHTAG_RE: HASHTAG_RE,
    SCALE_MAX_VALUE: SCALE_MAX_VALUE,
    SCALE_MIN_VALUE: SCALE_MIN_VALUE,
    SCALE_GRID: SCALE_GRID,
    COMMENTS_NUMBER: COMMENTS_NUMBER,
    MAX_RANDOM_PHOTOS: MAX_RANDOM_PHOTOS,
    FILTERS: FILTERS,
    StatusCode: StatusCode
  };
})();
