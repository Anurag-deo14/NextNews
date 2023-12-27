module.exports = [
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
        cacheName: 'static-asset',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
      urlPattern: /\.(?:js|css)$/,
    },
    {
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
        },
      },
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
    },
    // Add more caching strategies as needed
  ];
  