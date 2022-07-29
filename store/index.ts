const {version} = require('../package.json')
import config from '../nuxt.config'
import axios from "axios"

const $config = config.publicRuntimeConfig

export const state = () => ({
    version: version,
    user: null,
})

export const getters = {
    displayVersion: state => (state.version || '0') + ($config.isProd ? '' : '-dev'),
}

export const mutations = {
}

export const actions = {
    validateUuidV4(ctx, id: string) {
        return /^[\dA-Fa-f]{8}-[\dA-Fa-f]{4}-4[\dA-Fa-f]{3}-[89ABab][\dA-Fa-f]{3}-[\dA-Fa-f]{12}$/i.test(id)
    },
    async user(state, token: string) {
        try {
            if (!state.user) {
                ({ data: state.user } = await axios.get('/api/v1/users/', {
                    headers: {
                        Authorization: token
                    }
                }))
            }
            return state.user
        } catch (e) {
            // @ts-ignore
            console.error(e.message)
        }
    }
}
