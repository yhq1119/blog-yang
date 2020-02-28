const withCSS = require('@zeit/next-css')

module.exports =withCSS( {
    serverRuntimeConfig:{
        mySecret: 'secret'
    },
    publicRuntimeConfig: {
        APP_NAME: 'SEO-BLOG',
        API_DEVELOPMENT: 'http://localhost:8000/api',
        API_PRODUCTION:'',
        PRODUCTION: false,
        DOMAIN_PRODUCTION:'',
        DOMAIN_DEVELOPMENT:'http://localhost:3000'
    }
})