module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'PT-WC-Q Vue',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW'

  }
}
