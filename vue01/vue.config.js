const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  chainWebpack: config => {
    config.performance
      .maxAssetSize(1024 * 1024)
      .maxEntrypointSize(1024 * 1024)
  }
})
