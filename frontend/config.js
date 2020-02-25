import getConfig from 'next/config'
const { publicRuntimeConfig} = getConfig()

// console.log(publicRuntimeConfig)

export const API = publicRuntimeConfig.PRODUCTION ? 'https://api.com' : 'http://localhost:8000/api'

export const APP_NAME = publicRuntimeConfig.APP_NAME

// console.log(APP_NAME)