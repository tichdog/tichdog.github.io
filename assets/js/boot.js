/* Ранняя установка темы и языка — до первой отрисовки кадра.
   Подключается блокирующим <script> в <head>; переключатели живут в site.js.
   Без этого браузер успевает показать светлую тему и русский текст, а затем
   анимированно перекрашивает страницу в выбранную тему. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  function read(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  var theme = read('tc-site-theme');
  if (theme !== 'dark' && theme !== 'light') {
    theme =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
  }
  root.setAttribute('data-theme', theme);

  var lang = read('tc-site-lang');
  if (lang !== 'ru' && lang !== 'en') {
    var nav = (navigator.language || 'ru').toLowerCase();
    lang = nav.indexOf('ru') === 0 ? 'ru' : nav.indexOf('en') === 0 ? 'en' : 'ru';
  }
  root.setAttribute('data-lang', lang);
  root.setAttribute('lang', lang);
})();
