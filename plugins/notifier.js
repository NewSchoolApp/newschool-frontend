export default ({ app, store }, inject) => {
  inject('notifier', {
    /**
     * 
     * @param {*} {type = Tipo de alert a ser exibido na tela - consulstar na issue do github }
     * @oaram {*} { message - mensagem a ser exibida no alert }
     */
    showMessage({ type = '', message = '' }) {
      store.commit('snackbar/showMessage', { type, message })
    }
  })
}