export const state = () => ({
    authenticated: true
})

export const mutations = {
    set(state: any, auth: boolean) {
        state.authenticated = auth
    }
}
