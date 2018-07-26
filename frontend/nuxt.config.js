const config = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Vue Jukebox',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Vue Jukebox' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    { src: '~assets/css/main.less', lang: 'less' }
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/vuetify'
  ],
  axios: {
  },
  proxy: {
    '/api': 'http://localhost:9010/',
    '/songs': 'http://localhost:9010/'
  },
  plugins: [
    { src: '~/plugins/ws', ssr: false }
  ],
  build: {
    vendor: ['babel-polyfill', 'axios', 'vuetify'],
    extend (config, ctx) {
      if (ctx.isClient) {
        config.node = {
          fs: 'empty'
        };
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  config.axios = {
    browserBaseURL: '/'
  };
  config.proxy = {
  };
}

module.exports = config;
