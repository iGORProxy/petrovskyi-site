/* Аналітика: GA4 і подія кліку на канал зв'язку з позначкою місця. */
(function () {
  var GA_ID = 'G-L4DWWLZDMV';
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  if (GA_ID) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID);
  }
  function place(el) {
    if (el.closest('.tabs')) return 'tabbar';
    if (el.closest('header')) return 'header';
    if (el.closest('.hero')) return 'hero';
    if (el.closest('#yak')) return 'formats';
    if (el.closest('.end')) return 'final';
    if (el.closest('.sign')) return 'article_author';
    if (el.closest('footer')) return 'footer';
    return 'other';
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    var channel = href.indexOf('t.me/ihor_petrovskyi') > -1 ? 'telegram' : href.indexOf('tel:') === 0 ? 'phone' : '';
    if (!channel) return;
    gtag('event', 'contact_click', {
      channel: channel,
      place: place(a),
      page_type: location.pathname.indexOf('/blog/') === 0 ? 'blog' : 'home'
    });
  }, true);
})();

/* Нижнє мобільне меню: підсвітка активного розділу на головній. */
(function () {
  var tabs = document.querySelectorAll('.tabs a[data-tab]');
  if (!tabs.length || !('IntersectionObserver' in window)) return;
  var map = {};
  tabs.forEach(function (a) { var s = document.getElementById(a.getAttribute('data-tab')); if (s) map[s.id] = a; });
  var seen = {};
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { seen[e.target.id] = e.isIntersecting; });
    var cur = null;
    Object.keys(map).forEach(function (id) { if (seen[id] && !cur) cur = id; });
    tabs.forEach(function (a) { a.removeAttribute('aria-current'); });
    if (cur) map[cur].setAttribute('aria-current', 'true');
  }, { rootMargin: '-45% 0px -45% 0px' });
  Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
})();
