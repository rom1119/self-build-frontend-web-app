import base64 from  'base-64'
import Token from "../types/Token";

export default function ({ $axios, redirect, store, app }) {
    $axios.onRequest(config => {
        // console.log('Making request to ' + config.url)
        if (config.url === process.env.API_URL_GET_TOKEN && config.method.toLowerCase() === 'post') {
            let clientId = process.env.API_CLIENT_ID
            let clientSecret = process.env.API_CLIENT_SECRET
            let encodedCredentialApi = base64.encode(clientId + ':' + clientSecret)

            config.headers.common['Authorization'] = 'Basic ' + encodedCredentialApi
        } else if (config.url === process.env.API_URL_GET_TOKEN && config.method.toLowerCase() === 'delete') {

            if (app.$auth.$storage._state['_token.local']) {
                let token = store.getters['token/getOne']
                config.headers.common['AUTH-TOKEN'] = token.access_token

            }
        } else {
            // console.log(config.method.toLowerCase())
            // config.headers.common['Authorization'] = 'Bearer 123'
        }

    })

    $axios.onResponse((res) => {
        let urlRegEx = new RegExp(process.env.API_URL_GET_TOKEN)
        if (res.config.url.match(urlRegEx) && res.config.method.toLowerCase() === 'post') {
            store.dispatch('token/create', res.data)
            // console.log(app.$auth.$storage._state['_token.local'])
            // console.log(store.getters['token/getOne'].access_token)
            if (app.$auth.$storage._state['_token.local']) {
                let token = store.getters['token/getOne']
                app.$auth.$storage._state['_token.local'] = 'Bearer ' + token.access_token
            }
            // app.$auth.$storage.dispatch('Bearer ' + token.access_token)

        } else if (!res.config.url.match(urlRegEx)) {
            refreshTokenRequest($axios, store)

        } else {
        }
        // console.log(res)
        // console.log(store.getters['token/getOne'])

    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 401) {
            redirect('/login')
        }
    })
}

async function refreshTokenRequest($axios, store) {
    const data = new FormData()
    let token = store.getters['token/getOne']
    data.append('refresh_token', token.refresh_token)
    data.append('grant_type', 'refresh_token')
    await $axios.$post(process.env.API_URL_GET_TOKEN, data)
}
