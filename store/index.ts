const {version} = require('../package.json')
import config from '../nuxt.config'
import axios from "axios"

const $config = config.publicRuntimeConfig

export const state = () => ({
    version: version,
    user: {},
})

export const getters = {
    displayVersion: state => (state.version || '0') + ($config.isProd ? '' : '-dev'),
}

export const mutations = {
    async user(state, {token, force = false}) {
        try {
            if (!state.user.id || force) {
                ({ data: state.user } = await axios.get('/api/v1/users/', {
                    headers: {
                        Authorization: token
                    }
                }))
            }
        } catch (e) {
            // @ts-ignore
            console.error(e.message)
        }
    }
}

export const actions = {
    validateUuidV4(ctx, id: string) {
        return /^[\dA-Fa-f]{8}-[\dA-Fa-f]{4}-4[\dA-Fa-f]{3}-[89ABab][\dA-Fa-f]{3}-[\dA-Fa-f]{12}$/i.test(id)
    },
    /**
     * Send a notification to the user
     * @param ctx The context
     * @param title The title of the notification
     * @param message The message of the notification
     */
    notify(ctx, {title, message}) {
        let notification = new Notification(title, {
            body: message,
            icon: 'https://unicovoit.fr/icon.png'
        })
        setTimeout(() => {
            notification.close()
        }, 10000)
    }
}
