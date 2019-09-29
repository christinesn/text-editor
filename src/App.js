/** @jsx jsx */
import React from 'react';
import {Editor} from './Editor'
import {jsx} from '@emotion/core'

function App() {
  return (
    <div css={{
      fontFamily: `-apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Helvetica,
        Arial,
        sans-serif,
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol"`,
      color: 'rgba(0, 0, 0, 0.85)'
    }}>
      <Editor />
    </div>
  );
}

export default App;
