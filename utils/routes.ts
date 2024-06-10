const PAGES_ROUTES = {
  home: { default: '/' },
  login: { default: '/login' },
  signup: { default: '/signup' },
  dashboard: { default: '/dashboard' },
  profile: { default: '/profile' },
  privacyPolicy: { default: '/privacy-policy' },
};

const PUBLIC_ROUTES = [
  PAGES_ROUTES.home.default,
  PAGES_ROUTES.privacyPolicy.default,
  PAGES_ROUTES.signup.default,
  PAGES_ROUTES.login.default,
];

const PRIVATE_ROUTES = [
  PAGES_ROUTES.profile.default,
  PAGES_ROUTES.dashboard.default,
];

export { PAGES_ROUTES, PUBLIC_ROUTES, PRIVATE_ROUTES };
