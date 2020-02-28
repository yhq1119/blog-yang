import getConfig from 'next/config'
const { publicRuntimeConfig} = getConfig()

// console.log(publicRuntimeConfig)

export const API = publicRuntimeConfig.PRODUCTION ?
publicRuntimeConfig.API_PRODUCTION
:
publicRuntimeConfig.API_DEVELOPMENT

export const APP_NAME = publicRuntimeConfig.APP_NAME

// console.log(APP_NAME)

export const DOMAIN = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.DOMAIN_PRODUCTION
:
publicRuntimeConfig.DOMAIN_DEVELOPMENT
// DOMAIN_PRODUCTION:'',
// DOMAIN_DEVELOPMENT:'http://localhost:3000'