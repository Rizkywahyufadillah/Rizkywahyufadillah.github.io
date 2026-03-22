/* ═══════════════════════════════════════════
   CELESTIAL MEMORIES — app.js
═══════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────
   DATA — EDIT SESUAI KENANGAN KALIAN
───────────────────────────────────────── */
const moments = [
    {
        id: 1,
        title: 'Nonton Film Avatar',
        date: 'Des 2025',
        location: 'Matos',
        img: 'img/moment-1.jpeg',
        story: 'Dari semua dunia yang ditampilkan di layar itu, satu hal yang paling aku syukuri — aku nonton bareng kamu. Entah cerita filmnya, yang aku ingat justru senyummu setiap kali ada adegan yang bikin kagum.'
    },
    {
        id: 2,
        title: 'First Time Scaling For Me',
        date: 'Nov 2025',
        location: 'Dokter gigi',
        img: 'img/moment-2.jpeg',
        story: 'Siapa sangka ke dokter gigi bisa jadi momen yang berkesan. Kamu yang temenin, kamu yang tenangkan.'
    },
    {
        id: 3,
        title: 'Makan di Warung Bahagia',
        date: 'Okt 2025',
        location: 'Warung Bahagia',
        img: 'img/moment-3.jpeg',
        story: 'Namanya Warung Bahagia, dan aku nggak bohong — aku memang bahagia di sana. Bukan karena makanannya, tapi karena kamu di seberang mejaku, ngobrol hal-hal kecil yang entah kenapa terasa sangat besar.'
    },
    {
        id: 4,
        title: 'Bukbang Mie Banglades',
        date: 'Agt 2025',
        location: 'Samping Mie Gambate',
        img: 'img/moment-4.jpeg',
        story: 'Mie enak tempat yang sederhana, tapi rasanya? Sempurna. Mungkin karena lapar, mungkin karena momennya, atau mungkin karena aku di samping orang yang paling aku suka.'
    },
    {
        id: 5,
        title: 'First Time CFD',
        date: 'Jun 2025',
        location: 'Ijen Street',
        img: 'img/moment-5.jpeg',
        story: 'Pagi-pagi, jalanan masih sejuk, dan kamu ada di sana. CFD pertama kita — jalan pelan, lihat orang-orang, ketawa hal sepele. Sesimpel itu, tapi aku mau ulangin terus kalau bisa.'
    },
    {
        id: 6,
        title: 'Kondangan Bersama',
        date: 'Jun 2024',
        location: 'Gedung Pernikahan',
        img: 'img/moment-6.jpeg',
        story: 'Di tengah keramaian orang merayakan cinta orang lain, aku malah sibuk bersyukur punya kamu di sebelahku. Momen itu aku diam-diam berdoa — semoga suatu hari kita yang ada di depan sana.'
    },
    {
        id: 7,
        title: 'Keluar Setelah Idul Fitri 2025',
        date: 'April 2025',
        location: 'Malang',
        img: 'img/moment-7.jpeg',
        story: 'Lebaran selalu penuh kehangatan, tapi tahun ini terasa berbeda. Ada kamu. Jalan bareng setelah sekian lama — sederhana, tapi buat aku ini salah satu momen paling berkesan di awal tahun ini.'
    }
];

/* ─────────────────────────────────────────
   LOVE-SHAPED CONSTELLATION
───────────────────────────────────────── */
function getLoveStarCoords() {
    return [
        { x: 105, y: 140 },   // 0 — kiri atas
        { x: 200, y: 108 },   // 1 — tengah atas
        { x: 295, y: 140 },   // 2 — kanan atas
        { x: 318, y: 230 },   // 3 — kanan tengah
        { x: 260, y: 310 },   // 4 — kanan bawah
        { x: 200, y: 340 },   // 5 — ujung bawah
        { x: 82, y: 230 },   // 6 — kiri tengah
    ];
}

const connections = [
    [0, 1],   // kiri atas → tengah atas
    [1, 2],   // tengah atas → kanan atas
    [2, 3],   // kanan atas → kanan tengah
    [3, 4],   // kanan tengah → kanan bawah
    [4, 5],   // kanan bawah → ujung bawah
    [5, 6],   // ujung bawah → kiri tengah
    [6, 0],   // kiri tengah → kiri atas 
];

/* ─────────────────────────────────────────
   AUDIO — splash screen unlock
───────────────────────────────────────── */
const audio = new Audio('music/our-song.mp3');
audio.loop = true;

audio.addEventListener('loadedmetadata', () => {
    audio.currentTime = 6;
});

// Kunci scroll selama splash masih tampil
document.body.style.overflow = 'hidden';

document.getElementById('splash-btn').addEventListener('click', () => {
    const splash = document.getElementById('splash');
    splash.classList.add('hide');
    audio.play().catch(err => console.warn('Audio error:', err));

    // Lepas kunci scroll + scroll ke top + hapus splash
    setTimeout(() => {
        document.body.style.overflow = '';
        splash.remove();
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, 900);
});

/* ─────────────────────────────────────────
   STARFIELD BACKGROUND
───────────────────────────────────────── */
(function initStarfield() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let W, H, stars = [];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        const count = Math.floor((W * H) / 6000);
        stars = Array.from({ length: Math.min(count, 220) }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.1 + 0.2,
            a: Math.random() * 0.7 + 0.1,
            speed: Math.random() * 0.007 + 0.002,
            phase: Math.random() * Math.PI * 2
        }));
    }

    function draw(t) {
        ctx.clearRect(0, 0, W, H);
        stars.forEach(s => {
            const alpha = s.a * (0.35 + 0.65 * Math.sin(t * s.speed + s.phase));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(220,212,195,${alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(draw);
})();

/* ─────────────────────────────────────────
   BUILD CONSTELLATION SVG
───────────────────────────────────────── */
const linesLayer = document.getElementById('lines-layer');
const starsLayer = document.getElementById('stars-layer');
const visitedStars = new Set();
let currentModalId = null;
const starCoords = getLoveStarCoords();

function buildConstellation() {
    connections.forEach(([a, b], i) => {
        const { x: ax, y: ay } = starCoords[a];
        const { x: bx, y: by } = starCoords[b];
        const len = Math.hypot(bx - ax, by - ay);

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', ax);
        line.setAttribute('y1', ay);
        line.setAttribute('x2', bx);
        line.setAttribute('y2', by);
        line.setAttribute('class', 'star-line');
        line.setAttribute('stroke-dasharray', len);
        line.setAttribute('stroke-dashoffset', len);
        line.style.transitionDelay = `${i * 0.18 + 0.3}s`;
        linesLayer.appendChild(line);
    });

    moments.forEach((m, i) => {
        const { x, y } = starCoords[i];
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'star-group');
        g.setAttribute('data-id', m.id);
        g.setAttribute('role', 'button');
        g.setAttribute('tabindex', '0');
        g.setAttribute('aria-label', `Buka kenangan: ${m.title}`);

        const shortTitle = m.title.length > 13 ? m.title.slice(0, 12) + '…' : m.title;

        g.innerHTML = `
    <circle class="star-hit"  cx="${x}" cy="${y}" r="36"/>
    <circle class="star-pulse" cx="${x}" cy="${y}" r="8"/>
    <circle class="star-ring"  cx="${x}" cy="${y}" r="16"/>
    <circle class="star-core"  cx="${x}" cy="${y}" r="4.5" filter="url(#glow)"/>
    <text   class="star-label" x="${x}"  y="${y + 26}">${shortTitle}</text>
`;

        g.addEventListener('click', () => openStar(m.id));
        g.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openStar(m.id);
            }
        });

        starsLayer.appendChild(g);
    });
}

function animateLines() {
    document.querySelectorAll('.star-line').forEach((line, i) => {
        setTimeout(() => line.classList.add('drawn'), i * 180 + 300);
    });
}

/* ─────────────────────────────────────────
   MODAL
───────────────────────────────────────── */
const overlay = document.getElementById('modal-overlay');
const modalBox = document.getElementById('modal-box');

function openStar(id) {
    const m = moments.find(x => x.id === id);
    if (!m) return;
    currentModalId = id;

    document.getElementById('modal-title').textContent = m.title;
    document.getElementById('modal-loc').textContent = `📍 ${m.location}`;
    document.getElementById('modal-story').textContent = m.story;
    document.getElementById('modal-date-badge').textContent = m.date;

    const img = document.getElementById('modal-img');
    const ph = document.getElementById('img-placeholder');

    if (m.img) {
        img.src = m.img;
        img.style.display = 'block';
        ph.style.display = 'none';
    } else {
        img.style.display = 'none';
        ph.style.display = 'flex';
        ph.querySelector('.img-path-hint').textContent = `img/moment-${id}.jpg`;
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    visitedStars.add(id);
    document.querySelectorAll('.star-group').forEach(g => {
        if (visitedStars.has(Number(g.dataset.id))) g.classList.add('visited');
    });
    updateProgress();

    setTimeout(() => document.getElementById('modal-close').focus(), 50);
}

function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

function navigateModal(dir) {
    const ids = moments.map(m => m.id);
    const curr = ids.indexOf(currentModalId);
    openStar(ids[(curr + dir + ids.length) % ids.length]);
}

function updateProgress() {
    const visited = visitedStars.size;
    const total = moments.length;
    document.getElementById('progress-hint').textContent =
        `${visited} dari ${total} kenangan ditemukan`;

    if (visited === total) {
        const btn = document.getElementById('reveal-btn');
        btn.style.display = 'block';
        requestAnimationFrame(() => requestAnimationFrame(() => btn.classList.add('shown')));
    }
}

function scrollToStats() {
    document.getElementById('infographic').scrollIntoView({ behavior: 'smooth' });
}

overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') navigateModal(-1);
    if (e.key === 'ArrowRight') navigateModal(1);
});

let touchStartY = 0;
modalBox.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });
modalBox.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientY - touchStartY;
    if (delta > 80 && modalBox.scrollTop === 0) closeModal();
}, { passive: true });

document.getElementById('btn-prev').addEventListener('click', () => navigateModal(-1));
document.getElementById('btn-next').addEventListener('click', () => navigateModal(1));
document.getElementById('modal-close').addEventListener('click', closeModal);

/* ─────────────────────────────────────────
   COUNTER ANIMATION
───────────────────────────────────────── */
function animateCounter(el, target, duration = 1600) {
    if (el.dataset.isInfinity) { el.textContent = '∞'; return; }
    let start = null;
    function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target).toLocaleString('id-ID');
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('id-ID');
    }
    requestAnimationFrame(step);
}

/* ─────────────────────────────────────────
   CONFETTI
───────────────────────────────────────── */
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const palette = ['#c9a84c', '#e8d5a3', '#fff8e7', '#a07830', '#f0c060', '#ffe0a0'];
    const pieces = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 60,
        r: Math.random() * 4 + 1.5,
        color: palette[Math.floor(Math.random() * palette.length)],
        tiltAngle: Math.random() * Math.PI,
        tiltSpeed: Math.random() * 0.06 + 0.025,
        speed: Math.random() * 1.8 + 0.8,
        drift: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.5 + 0.5,
    }));

    let frame = 0;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            p.tiltAngle += p.tiltSpeed;
            p.y += p.speed;
            p.x += Math.sin(p.tiltAngle) + p.drift;
            if (p.y > canvas.height + 20) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
            ctx.save();
            ctx.globalAlpha = p.opacity * (1 - frame / 320);
            ctx.beginPath();
            ctx.ellipse(p.x, p.y, p.r, p.r * 0.5, p.tiltAngle, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.restore();
        });
        frame++;
        if (frame < 320) requestAnimationFrame(draw);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
}

/* ─────────────────────────────────────────
   INTERSECTION OBSERVER
───────────────────────────────────────── */
const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        if (el.id === 'map-wrap') {
            el.classList.add('visible');
            animateLines();
        }

        if (el.classList.contains('section-label') ||
            el.classList.contains('section-title') ||
            el.classList.contains('section-desc')) {
            el.classList.add('visible');
        }

        if (el.classList.contains('stat-card')) {
            setTimeout(() => {
                el.classList.add('visible');
                const counter = el.querySelector('[data-count], [data-is-infinity]');
                if (counter) {
                    counter.dataset.isInfinity
                        ? (counter.textContent = '∞')
                        : animateCounter(counter, Number(counter.dataset.count));
                }
            }, (Number(el.dataset.delay) || 0) * 110);
        }

        if (el.id === 'final-msg') {
            el.classList.add('visible');
            setTimeout(launchConfetti, 700);
        }

        io.unobserve(el);
    });
}, { threshold: 0.12 });

/* ─────────────────────────────────────────
   INIT
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    buildConstellation();

    document.querySelectorAll('.section-label, .section-title, .section-desc')
        .forEach(el => io.observe(el));

    io.observe(document.getElementById('map-wrap'));
    document.querySelectorAll('.stat-card').forEach(el => io.observe(el));
    io.observe(document.getElementById('final-msg'));
});