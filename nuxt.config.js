require('dotenv').config()

const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '~/modules/coffeescript',
    '@nuxtjs/feed'
  ],
  feed: [
    // A default feed configuration object
    {
      path: '/feed.xml', // The route to your feed.
      async create (feed) {
        feed.options = {
          title: 'My blog',
          link: 'https://testing/feed.xml',
          description: 'This is my personal feed!',
        }
      
        const axios = require('axios')
        const posts = (await axios.get('http://moodle.com/wp-json/wp/v2/posts')).data
        posts.forEach(post => {
          feed.addItem({
            title: post.title.rendered,
            id: post.id,
            link: post.link,
            description: post.excerpt.rendered,
            // content: post.content.rendered
          })
        })
      
        feed.addCategory('Nuxt.js')
      
        feed.addContributor({
          name: 'Alexander Lichter',
          email: 'example@lichter.io',
          link: 'https://lichter.io/'
        })
      }, // The create function (see below)
      cacheTime: 1000 * 60 * 15, // How long should the feed be cached
      type: 'rss2' // Can be: rss2, atom1, json1
    }
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
