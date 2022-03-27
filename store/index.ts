export const state: () => { counter: number } = () => ({
    counter: 10
})

export const mutations = {
    increment(state: any) {
        state.counter++
    }
}
