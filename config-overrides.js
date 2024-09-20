const path = require('path')
const { override } = require('customize-cra')

module.exports = override(
  config => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src')
    }
/*     config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        antd: {
          name: 'antd-chunk',
          test: /antd/,
          priority: 100
        },
        vendors: {
          name: 'vendors-chunk',
          test: /node_modules/,
          priority: 90
        }
      }
    } */
    return config
  }
)