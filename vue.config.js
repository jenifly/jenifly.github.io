targetHost = 'https://github.com/jenifly/jenifly.github.io'
module.exports = {
  productionSourceMap: false,
  devServer: {
    overlay: {
      warnings: false,
    },
    proxy: {
      '/file-list': {
        target: targetHost,
        changeOrigin: true,
        pathRewrite: {
          '^/file-list': targetHost + '/file-list'
        }
      }
    }
  }
}