export const state = () => ({
  list: []
})

export const mutations = {
  set (state, courses) {
    state.list.push(...courses)
  }
}
