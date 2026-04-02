import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

import App from '../App.vue'
import { store } from '../store'

describe('App', () => {
  it('renders shell copy', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    })
    const text = wrapper.text()
    expect(text).toContain('Horse Racing')
    expect(text).toContain('Horse List (1 - 20)')
  })
})
