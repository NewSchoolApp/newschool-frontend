export const state = () => ({
    type: '',
    message: ''
})

export const mutations = {
    showMessage(state, payload) {
        state.type = payload.type
        state.message = payload.message
    }
}