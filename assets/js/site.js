/* Todo Calendar — site behaviour: language, theme, mobile menu.
   Минимум логики, без зависимостей и без аналитики. */
(function () {
  'use strict';

  var root = document.documentElement;
  var STORAGE_LANG = 'tc-site-lang';
  var STORAGE_THEME = 'tc-site-theme';

  root.classList.add('js');

  function safeGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      /* приватный режим — просто не запоминаем выбор */
    }
  }

  /* --- Язык --- */
  function preferredLang() {
    var stored = safeGet(STORAGE_LANG);
    if (stored === 'ru' || stored === 'en') return stored;
    var nav = (navigator.language || 'ru').toLowerCase();
    return nav.indexOf('ru') === 0 ? 'ru' : nav.indexOf('en') === 0 ? 'en' : 'ru';
  }

  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);

    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      button.setAttribute('aria-pressed', String(button.getAttribute('data-set-lang') === lang));
    }
  }

  /* --- Тема --- */
  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function currentTheme() {
    var stored = safeGet(STORAGE_THEME);
    return stored === 'dark' || stored === 'light' ? stored : systemTheme();
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var button = document.querySelector('[data-toggle-theme]');
    if (button) {
      button.setAttribute('aria-label', theme === 'dark' ? 'Светлая тема' : 'Тёмная тема');
      button.setAttribute('title', theme === 'dark' ? 'Светлая тема' : 'Тёмная тема');
    }
  }

  /* --- Мобильное меню --- */
  function closeMenu() {
    var nav = document.getElementById('site-nav');
    var button = document.querySelector('[data-toggle-menu]');
    if (!nav || !button) return;
    nav.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
  }

  function initMenu() {
    var nav = document.getElementById('site-nav');
    var button = document.querySelector('[data-toggle-menu]');
    if (!nav || !button) return;

    button.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1080) closeMenu();
    });
  }

  /* --- Инициализация --- */
  applyLang(preferredLang());
  applyTheme(currentTheme());

  document.addEventListener('click', function (event) {
    var langButton = event.target.closest('[data-set-lang]');
    if (langButton) {
      var lang = langButton.getAttribute('data-set-lang');
      applyLang(lang);
      safeSet(STORAGE_LANG, lang);
      return;
    }

    var themeButton = event.target.closest('[data-toggle-theme]');
    if (themeButton) {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      safeSet(STORAGE_THEME, next);
    }
  });

  if (window.matchMedia) {
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function () {
      if (!safeGet(STORAGE_THEME)) applyTheme(systemTheme());
    };
    if (media.addEventListener) media.addEventListener('change', onChange);
    else if (media.addListener) media.addListener(onChange);
  }

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  onReady(function () {
    initMenu();

    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  });
})();
