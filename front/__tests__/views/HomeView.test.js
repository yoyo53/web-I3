import { expect, test } from 'vitest'
import { render } from '@testing-library/vue'
import HomeView from '../../src/views/HomeView.vue'

test('Page', () => {
  const page = render(HomeView, {
    props: {
    }
  })
  page.getByText('official documentation')
})
