// 1. Filter karya (Semua / Proyek Nyata / Eksplorasi)
(function () {
    var tabs = document.querySelectorAll('.tabs button');
    var works = document.querySelectorAll('.work');
    var empty = document.querySelector('.empty');
    tabs.forEach(function (t) {
        t.addEventListener('click', function () {
            tabs.forEach(function (x) { x.classList.remove('on'); });
            t.classList.add('on');
            var f = t.dataset.f, shown = 0;
            works.forEach(function (w) {
                var ok = f === 'all' || w.dataset.cat === f;
                w.style.display = ok ? '' : 'none';
                if (ok) shown++;
            });
            empty.hidden = shown > 0;
        });
    });
})();

// 2. Gambar kecil yang mengikuti kursor di bagian Pengalaman
(function () {
    var box = document.querySelector('.float');
    if (!box) return;
    document.querySelectorAll('.row[data-pv]').forEach(function (row) {
        row.addEventListener('mouseenter', function () {
            var img = box.querySelector('img');
            if (row.dataset.img) img.src = row.dataset.img;
            box.classList.add('show');
        });
        row.addEventListener('mouseleave', function () { box.classList.remove('show'); });
        row.addEventListener('mousemove', function (e) {
            box.style.transform = 'translate(' + (e.clientX + 20) + 'px,' + (e.clientY - 70) + 'px) rotate(-6deg)';
        });
    });
})();

// 3. Ukuran nama otomatis menyesuaikan lebar layar & panjang nama
(function () {
    var n = document.querySelector('.name');
    if (!n) return;
    function fit() {
        if (window.innerWidth <= 860) { n.style.fontSize = ''; return; }
        var hero = n.parentElement, cs = getComputedStyle(hero);
        var avail = hero.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        n.style.fontSize = '100px';
        n.style.fontSize = Math.min(140, (100 * avail) / n.offsetWidth) + 'px';
    }
    fit();
    window.addEventListener('resize', fit);
    if (document.fonts) document.fonts.ready.then(fit);
})();

// 4. Foto: warna hanya muncul di sekitar kursor
(function () {
    var p = document.querySelector('.portrait');
    var img = p && p.querySelector('img');
    if (!img) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 861px)').matches) return;
    var c = img.cloneNode();
    c.className = 'color';
    c.alt = '';
    p.appendChild(c);
    p.addEventListener('pointermove', function (e) {
        var r = img.getBoundingClientRect();
        p.style.setProperty('--x', (e.clientX - r.left) + 'px');
        p.style.setProperty('--y', (e.clientY - r.top) + 'px');
        p.classList.add('on');
    });
    p.addEventListener('pointerleave', function () {
        p.classList.remove('on');
    });
})();