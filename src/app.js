// WASL Teaser — waitlist submit, scroll reveals, footer links.
const config = window.WASL_TEASER_CONFIG || {};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function submitWaitlist(email) {
  const wl = config.waitlist || {};
  const endpoint = wl.endpoint;
  if (!endpoint) return { ok: true, mode: 'local' };

  const payload = {
    appId: wl.appId || 'wasl',
    name: '',
    email,
    phone: '',
    metadata: { source: wl.source || 'wasl-teaser', submittedAt: new Date().toISOString() }
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Waitlist request failed (${res.status})`);
  }
  return { ok: true, mode: 'remote' };
}

function wireForm(formId, inputId, messageId) {
  const form = document.getElementById(formId);
  const input = document.getElementById(inputId);
  const msg = document.getElementById(messageId);
  if (!form || !input || !msg) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = (input.value || '').trim();
    msg.classList.remove('error');
    if (!EMAIL_RE.test(email)) {
      msg.textContent = 'Enter a valid work email.';
      msg.classList.add('error');
      return;
    }
    const button = form.querySelector('button');
    if (button) button.disabled = true;
    msg.textContent = 'Adding you…';
    try {
      await submitWaitlist(email);
      msg.textContent = `You're on the list — we'll email ${email} when WASL goes live.`;
      form.reset();
    } catch (err) {
      msg.textContent = 'Something went wrong. Please try again in a moment.';
      msg.classList.add('error');
    } finally {
      if (button) button.disabled = false;
    }
  });
}

wireForm('waitlistForm', 'email', 'waitlistMessage');

// Reveal-on-scroll.
const revealables = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revealables.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('in'));
}

// Footer social links.
const linkLabels = { github: 'GitHub', linkedin: 'LinkedIn', x: 'X', youtube: 'YouTube' };
const socialEl = document.getElementById('socialLinks');
if (socialEl && config.links) {
  Object.entries(config.links).forEach(([key, href]) => {
    if (!href) return;
    const a = document.createElement('a');
    a.href = href;
    a.textContent = linkLabels[key] || key;
    a.target = '_blank';
    a.rel = 'noopener';
    socialEl.appendChild(a);
  });
}

// Year.
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
