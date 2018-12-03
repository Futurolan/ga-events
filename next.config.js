const webpack = require('webpack')
const withPlugins = require('next-compose-plugins')
const sass = require('@zeit/next-sass')
const optimizedImages = require('next-optimized-images')

const nextConfig = {
  publicRuntimeConfig: {
    BACKEND_API_URL: process.env.BACKEND_API_URL,
    BACKEND_LOCAL_API_URL: process.env.BACKEND_LOCAL_API_URL,
    BASE_URL: process.env.BASE_URL
  },
  webpack: (config, { dev }) => {
    // Add polyfill for IE 10 & 11
    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()

      if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills.js')) {
        entries['main.js'].unshift('./client/polyfills.js')
      }

      return entries
    }

    // Add eslint on compilation
    config.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        emitWarning: dev
      }
    })
    config.plugins.push(new webpack.EnvironmentPlugin(process.env))

    return config
  }
}

module.exports = withPlugins([
  [optimizedImages, {
    handleImages: ['png', 'jpg'],
    mozjpeg: {
      quality: 80
    },
    optipng: {
      optimizationLevel: 3
    }
  }],
  [sass]
], nextConfig)
