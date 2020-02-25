const withCSS = require('@zeit/next-css')

module.exports =withCSS( {
    serverRuntimeConfig:{
        mySecret: 'secret'
    },
    publicRuntimeConfig: {
        APP_NAME: 'SEO-BLOG',
        API_DEVELOPMENT: 'http://localhost:8000/api',
        PRODUCTION: false
    }
})