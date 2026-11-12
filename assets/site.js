(function () {
  // Copy buttons
  document.querySelectorAll('.code').forEach(function (block) {
    var btn = document.createElement('button');
    btn.className = 'copy';
    btn.textContent = 'Copy';
    btn.addEventListener('click', function () {
      var pre = block.querySelector('pre').cloneNode(true);
      pre.querySelectorAll('.c, .p').forEach(function (n) { n.remove(); });
      var text = pre.textContent.split('\n').map(function (l) { return l.replace(/\s+$/, ''); })
        .filter(function (l) { return l.length; }).join('\n');
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Copied'; btn.classList.add('done');
        setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('done'); }, 1400);
      });
    });
    block.appendChild(btn);
  });

  // Theme toggle
  var root = document.documentElement;
  try { var saved = localStorage.getItem('theme'); if (saved) root.dataset.theme = saved; } catch (e) {}
  document.getElementById('themeBtn').addEventListener('click', function () {
    var dark = root.dataset.theme ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });

  // Mobile nav
  var nav = document.getElementById('nav');
  document.getElementById('menuBtn').addEventListener('click', function () { nav.classList.toggle('open'); });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') nav.classList.remove('open'); });

})();
