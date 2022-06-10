const { i18n } = require('./next-i18next.config')

module.exports = {
  reactStrictMode: true,
  basePath: '/insurance',
  env: {
    LOGIN_URL: process.env.LOGIN_URL,
    SIGNUP_URL: process.env.SIGNUP_URL,
    MY_INSURANCE : process.env.MY_INSURANCE,
  },
  i18n,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  http: true,
  reloadOnPrerender: true
}

