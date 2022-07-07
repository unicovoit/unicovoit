// enable store for auth module
const {version} = require('../package.json')
import config from '../nuxt.config'

const $config = config.publicRuntimeConfig

export const state = () => ({
    version: version,
})

export const getters = {
    displayVersion: state => (state.version || '0') + ($config.isProd ? '' : '-dev')
}

export const mutations = {
}

export const actions = {
    validateUuidV4(ctx, id: string) {
        return /^[\dA-Fa-f]{8}-[\dA-Fa-f]{4}-4[\dA-Fa-f]{3}-[89ABab][\dA-Fa-f]{3}-[\dA-Fa-f]{12}$/i.test(id)
    }
}
