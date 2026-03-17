// Open resume PDF in a new tab
document.getElementById("resume").addEventListener("click", function () {
    window.open("/static/Anthony_Petrosino_Resume.pdf", "_blank");
    this.textContent = "Enjoy reviewing my resume, please contact me with any questions.";
});

// Dark mode toggle
(function () {
    const btn = document.getElementById('theme-toggle');
    const body = document.body;

    function applyTheme(dark) {
        body.classList.toggle('dark', dark);
        // swap AP logo for contrast
        const logo = document.querySelector('.img-APlogo');
        if (logo) {
            logo.src = dark
                ? 'static/ap_logo_green_no_background.png'
                : 'static/ap_logo_black_no_background.png';
        }
    }

    const saved = localStorage.getItem('theme');
    applyTheme(saved === 'dark');

    btn.addEventListener('click', () => {
        const isDark = !body.classList.contains('dark');
        applyTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
})();

// Smooth scrolling for nav links
document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Carousel
(function () {
    const track    = document.querySelector('.card-list');
    const prevBtn  = document.querySelector('.carousel-btn-prev');
    const nextBtn  = document.querySelector('.carousel-btn-next');
    const viewport = document.querySelector('.carousel-viewport');
    const cards    = Array.from(track.querySelectorAll('.project-card'));
    const OVERLAP  = 32; // matches margin-left: -2rem on cards
    let index      = 0;

    function visibleCount() {
        const vw = viewport.offsetWidth;
        if (vw >= 1024) return 3;
        if (vw >= 600)  return 2;
        return 1;
    }

    function setCardWidths() {
        const count = visibleCount();
        const w = (viewport.offsetWidth - OVERLAP * (count - 1)) / count;
        cards.forEach(c => { c.style.width = w + 'px'; });
        return w;
    }

    function clamp(val) {
        return Math.max(0, Math.min(val, cards.length - visibleCount()));
    }

    function update() {
        const w = setCardWidths();
        index = clamp(index);
        // each card after the first is offset by (w - OVERLAP) due to negative margin
        const offset = index * (w - OVERLAP);
        track.style.transform = `translateX(-${offset}px)`;
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index >= cards.length - visibleCount();
    }

    prevBtn.addEventListener('click', () => { index = clamp(index - 1); update(); });
    nextBtn.addEventListener('click', () => { index = clamp(index + 1); update(); });
    window.addEventListener('resize', update);

    update();
})();
