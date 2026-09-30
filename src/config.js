// WASL Teaser — runtime config. Posts to the shared NAYMA lead-capture service, tagged
// appId "wasl" so teaser signups are distinguishable. Safe to commit (no secrets).
window.WASL_TEASER_CONFIG = {
  waitlist: {
    endpoint: 'https://nayma-unified-leads-capture-795256461991.me-central1.run.app/',
    appId: 'wasl',
    source: 'wasl-teaser'
  },
  links: {
    github: 'https://github.com/waslhq',
    linkedin: 'https://www.linkedin.com/company/waslhq',
    x: 'https://x.com/waslhq',
    youtube: 'https://www.youtube.com/@waslhq'
  }
};
