'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var SCALE_MAX_VALUE = 100;
  var SCALE_MIN_VALUE = 25;
  var SCALE_GRID = 25;
  var COMMENTS_NUMBER = 5;
  var MAX_RANDOM_PHOTOS = 10;

  var URL_LOAD = 'https://javascript.pages.academy/kekstagram/data';
  var URL_SAVE = 'https://javascript.pages.academy/kekstagram';

  var HASHTAG_RE = /^(#[a-zA-Zа-яА-Я0-9]{1,19})(\s#[a-zA-Zа-яА-Я0-9]{1,19}){0,4}$/;
  var FILTERS = [
    'filter-default',
    'filter-random',
    'filter-discussed'
  ];

  var FILE_TYPES = [
    'jpg',
    'jpeg',
    'png'
  ];

  var StatusCode = {
    OK: 200
  };

  window.const = {
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    SCALE_MAX_VALUE: SCALE_MAX_VALUE,
    SCALE_MIN_VALUE: SCALE_MIN_VALUE,
    SCALE_GRID: SCALE_GRID,
    COMMENTS_NUMBER: COMMENTS_NUMBER,
    MAX_RANDOM_PHOTOS: MAX_RANDOM_PHOTOS,
    URL_LOAD: URL_LOAD,
    URL_SAVE: URL_SAVE,
    HASHTAG_RE: HASHTAG_RE,
    FILTERS: FILTERS,
    FILE_TYPES: FILE_TYPES,
    StatusCode: StatusCode
  };
})();
