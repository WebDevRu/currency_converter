require('dotenv').config();
const withLess = require("next-with-less");
const { i18n } = require('./next-i18next.config');

const publicRuntimeConfig = {
  appEnv: process.env.APP_ENV,
};


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n
}

module.exports = withLess({
  ...nextConfig,
  publicRuntimeConfig,
  lessLoaderOptions: {
    /* ... */
  }
});
