// Shared page effects for Ayden's portfolio inner pages.
// Scroll-reveal, animated counters, cursor parallax, card-slide page transitions, and subtle card/chip sounds.
// Uses manual scroll-position checks (robust inside embedded iframes where IntersectionObserver may not fire).
export function initPageFX(root) {
  if (!root) return;

  /* ---------- audio ---------- */
  let actx = null;
  const ensure = () => {
    if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
    if (actx && actx.state === 'suspended') actx.resume();
  };
  window.addEventListener('pointerdown', ensure);
  const flip = () => {
    if (!actx) return;
    const dur = 0.07, sr = actx.sampleRate;
    const buf = actx.createBuffer(1, Math.floor(sr * dur), sr);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2.2);
    const s = actx.createBufferSource(); s.buffer = buf;
    const bp = actx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2300; bp.Q.value = 0.9;
    const g = actx.createGain(); g.gain.value = 0.13;
    s.connect(bp); bp.connect(g); g.connect(actx.destination); s.start();
  };
  const chip = () => {
    if (!actx) return;
    const t = actx.currentTime;
    [920, 1380].forEach((f, i) => {
      const o = actx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
      const g = actx.createGain();
      g.gain.setValueAtTime(0, t + i * 0.045);
      g.gain.linearRampToValueAtTime(0.085, t + i * 0.045 + 0.005);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.045 + 0.085);
      o.connect(g); g.connect(actx.destination);
      o.start(t + i * 0.045); o.stop(t + i * 0.045 + 0.1);
    });
  };

  const vh = () => window.innerHeight || document.documentElement.clientHeight;
  const inView = (el, frac) => {
    const r = el.getBoundingClientRect();
    if (r.height === 0 && r.width === 0) return false;
    return r.top < vh() * (1 - (frac || 0.06)) && r.bottom > 0;
  };

  /* ---------- scroll reveal ---------- */
  let revealEls = [...root.querySelectorAll('[data-reveal]')];
  revealEls.forEach((el) => {
    const dir = el.dataset.reveal || 'up';
    el.style.opacity = '0';
    el.style.willChange = 'opacity, transform';
    el.style.transition = 'opacity .7s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1)';
    el.style.transitionDelay = (el.dataset.delay || '0') + 'ms';
    el.style.transform = dir === 'left' ? 'translateX(-46px)'
      : dir === 'right' ? 'translateX(46px)'
      : dir === 'scale' ? 'scale(.9)'
      : dir === 'rot' ? 'translateY(40px) rotate(-4deg)'
      : 'translateY(46px)';
  });
  const checkReveal = () => {
    for (let i = revealEls.length - 1; i >= 0; i--) {
      if (inView(revealEls[i], 0.05)) {
        const el = revealEls[i];
        el.style.opacity = '1';
        el.style.transform = 'none';
        revealEls.splice(i, 1);
      }
    }
  };

  /* ---------- counters ---------- */
  let countEls = [...root.querySelectorAll('[data-count]')];
  function runCount(el) {
    const raw = el.dataset.count;
    const to = parseFloat(raw);
    const dur = parseInt(el.dataset.dur || '1500', 10);
    const dec = (raw.split('.')[1] || '').length;
    const pre = el.dataset.pre || '';
    const suf = el.dataset.suf || '';
    const t0 = performance.now();
    chip();
    function step(t) {
      let p = Math.min(1, (t - t0) / dur);
      p = 1 - Math.pow(1 - p, 3);
      const cur = to * p;
      el.textContent = pre + (dec ? cur.toFixed(dec) : Math.round(cur).toLocaleString()) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const checkCount = () => {
    for (let i = countEls.length - 1; i >= 0; i--) {
      if (inView(countEls[i], 0.12)) {
        const el = countEls[i];
        countEls.splice(i, 1);
        runCount(el);
      }
    }
  };

  /* ---------- cursor parallax ---------- */
  const floaters = [...root.querySelectorAll('[data-depth]')];
  let mx = 0, my = 0, praf = null;
  const ptick = () => {
    praf = null;
    for (const f of floaters) {
      const dep = parseFloat(f.dataset.depth) || 0.5;
      f.style.transform = `translate(${-mx * 42 * dep}px, ${-my * 42 * dep}px)`;
    }
  };
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX / window.innerWidth - 0.5;
    my = e.clientY / window.innerHeight - 0.5;
    if (!praf) praf = requestAnimationFrame(ptick);
  });

  /* ---------- scroll loop ---------- */
  const onScroll = () => { checkReveal(); checkCount(); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
  [120, 350, 700, 1200].forEach((ms) => setTimeout(onScroll, ms));

  /* ---------- sounds ---------- */
  root.querySelectorAll('[data-snd="chip"]').forEach((c) => c.addEventListener('mouseenter', chip));
  root.querySelectorAll('[data-snd="flip"]').forEach((c) => c.addEventListener('mouseenter', flip));

  /* ---------- card-slide page transition ---------- */
  const ov = root.querySelector('[data-transition]');
  // incoming reveal is driven by pure CSS (@keyframes pageReveal) so it covers on
  // first paint with no flash; once it finishes we hide it for a clean static state.
  if (ov) {
    ov.addEventListener('animationend', () => { ov.style.display = 'none'; }, { once: true });
    setTimeout(() => { ov.style.display = 'none'; }, 900);
  }
  // outgoing: slide the cover up from the bottom to cover, then navigate
  root.querySelectorAll('[data-nav]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      ensure(); chip();
      if (ov) {
        ov.style.display = 'flex';
        ov.style.animation = 'none';
        ov.style.transition = 'none';
        ov.style.transform = 'translateY(105%)';
        ov.getBoundingClientRect();
        ov.style.transition = 'transform .5s cubic-bezier(.7,0,.3,1)';
        ov.style.transform = 'translateY(0)';
      }
      setTimeout(() => { window.location.href = href; }, 520);
    });
  });
}
