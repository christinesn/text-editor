import React from 'react'
import {ThemeProvider} from 'emotion-theming'
import {render} from '@testing-library/react'
import {LightTheme} from './LightTheme'

export function renderWithTheme (component) {
  return {
    ...render(<ThemeProvider theme={LightTheme}>{component}</ThemeProvider>)
  }
}
