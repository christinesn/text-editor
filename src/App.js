/** @jsx jsx */
import React from 'react';
import {Editor} from './Editor'
import {jsx, Global, css} from '@emotion/core'
import {ThemeProvider} from 'emotion-theming'
import {LightTheme} from './LightTheme'

function App() {
  const [theme, setTheme] = React.useState(LightTheme)
  
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          body {
            background: ${theme.background}
          }
        `}
      />
      <div css={{
        color: theme.color
      }}>
        <Editor />
      </div>
    </ThemeProvider>
  );
}

export default App;
