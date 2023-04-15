const path = require('path');

module.exports = {
  images: {
    domains: ["image.tmdb.org", "ibb.co", "i.ibb.co"],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add the path to the redux folder to the list of modules that webpack will resolve
    config.resolve.modules.push(path.resolve(__dirname, './redux'));

    // Return the modified config
    return config;
  },
};
