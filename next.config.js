const withOffline = require('next-offline');

module.exports = withOffline({
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        handler: 'NetworkFirst',
        options: {
          cacheName: 'start-url',
          expiration: {
            maxEntries: 1,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
          },
        },
        urlPattern: '/',
      },
      {
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60, // 1 hour
          },
        },
        urlPattern: new RegExp(`^${process.env.GUARDIAN_API_URL}`),
      },
      // Add more custom caching strategies as needed
      {
        handler: 'NetworkFirst',
        options: {
          cacheName: 'article-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
          },
        },
        urlPattern: /^http:\/\/article\/.*/,
      },
    ],
  },
  publicRuntimeConfig: {
    GUARDIAN_API_KEY: process.env.GUARDIAN_API_KEY,
    GUARDIAN_API_URL: process.env.GUARDIAN_API_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
  images: {
    domains: ['media.guim.co.uk'],
  },
});
