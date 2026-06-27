// WASL Teaser — runtime config. Reuses the shared waitlist endpoint, tagged so
// teaser signups are distinguishable from the main site. Safe to commit (no secrets).
window.WASL_TEASER_CONFIG = {
  waitlist: {
    endpoint: 'https://wasl-waitlist-notification-23987395973.me-central1.run.app/',
    method: 'POST',
    contentType: 'application/json',
    source: 'wasl-teaser',
    fieldMap: { email: 'email', source: 'source' }
  },
  links: {
    github: 'https://github.com/waslhq',
    linkedin: 'https://www.linkedin.com/company/waslhq',
    x: 'https://x.com/waslhq',
    youtube: 'https://www.youtube.com/@waslhq'
  }
};
