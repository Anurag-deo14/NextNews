// next.config.js

const withOffline = require('next-offline');

module.exports = withOffline({
  // Your original Next.js configurations go here

  publicRuntimeConfig: {
    GUARDIAN_API_KEY: process.env.GUARDIAN_API_KEY,
    GUARDIAN_API_URL: process.env.GUARDIAN_API_URL,
  },

  images: {
    domains: ['media.guim.co.uk'],
  },

  // Example: Add additional runtime caching for dynamic data (API responses)
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern:  /^http:\/\/localhost:3000\/article\/.*/,

        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  },
});
