import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import About from './about.vue'

Vue.use(Vuetify)

describe('About', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(About)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
