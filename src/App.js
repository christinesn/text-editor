/** @jsx jsx */
import React from 'react';
import {Editor} from './Editor'
import {jsx, Global} from '@emotion/core'
import {ThemeProvider} from 'emotion-theming'
import {LightTheme} from './LightTheme'
import {DarkTheme} from './DarkTheme'
import {Menu} from './Menu'
import {DocumentsDrawer} from './DocumentsDrawer'
import {EditorState, convertFromRaw} from 'draft-js'
import {newDocument} from './newDocument'

function App() {
  const [themeName, setThemeName] = React.useState('dark')
  const [title, setTitle] = React.useState(newDocument.title)
  const [saves, setSaves] = React.useState([])
  const [editorState, setEditorState] = React.useState(newDocument.editorState)
  const [keepIconsVisible, setKeepIconsVisible] = React.useState(false)
  const [drawerOpen, setDrawerOpen] = React.useState()
  const theme = themeName === 'light' ? LightTheme : DarkTheme

  /** Load documents */
  React.useEffect(() => {
    const localStorage = window.localStorage.getItem('saves')
    
    if (localStorage) {
      const parsed = JSON.parse(localStorage)
      setSaves(parsed)

      const open = parsed.filter(i => i.open)[0]
      if (open) {
        setTitle(open.title)
        setEditorState(EditorState.createWithContent(convertFromRaw(open.content)))
        setEditorState(e => EditorState.moveFocusToEnd(e))
      }
    }
  }, [])

  /** Save documents */
  React.useEffect(() => {
    window.localStorage.setItem('saves', JSON.stringify(saves))
  }, [saves])

  /** Load settings */
  React.useEffect(() => {
    let settings = window.localStorage.getItem('settings')

    if (settings) {
      settings = JSON.parse(settings)
      setThemeName(settings.themeName)
      setDrawerOpen(settings.drawerOpen)
      setKeepIconsVisible(settings.keepIconsVisible)
    }
  }, [])

  /** Save settings */
  React.useEffect(() => {
    window.localStorage.setItem('settings', JSON.stringify({
      themeName,
      keepIconsVisible,
      drawerOpen
    }))
  }, [themeName, keepIconsVisible, drawerOpen])
  
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={{
          '::selection': {
            background: theme.highlight
          },
          body: {
            background: theme.background,
            color: theme.color,
            transition: 'background cubic-bezier(0.4, 0, 0.6, 1) 200ms, color cubic-bezier(0.4, 0, 0.6, 1) 200ms'
          },
          '.MuiTooltip-tooltip': {
            backgroundColor: `${theme.tooltip.background} !important`,
            color: `${theme.tooltip.color} !important`,
            border: `1px solid ${theme.tooltip.border} !important`,
            fontSize: '0.8em !important'
          }
        }}
      />
      <DocumentsDrawer
        saves={saves}
        setSaves={setSaves}
        keepIconsVisible={keepIconsVisible}
        setTitle={setTitle}
        setEditorState={setEditorState}
        open={drawerOpen}
        setOpen={setDrawerOpen}
      />
      <Menu
        setThemeName={setThemeName}
        themeName={themeName}
        editorState={editorState}
        setEditorState={setEditorState}
        title={title}
        setTitle={setTitle}
        saves={saves}
        setSaves={setSaves}
        keepIconsVisible={keepIconsVisible}
        setKeepIconsVisible={setKeepIconsVisible}
      />
      <Editor
        editorState={editorState}
        setEditorState={setEditorState}
        title={title}
        setTitle={setTitle}
        saves={saves}
        setSaves={setSaves}
      />
    </ThemeProvider>
  );
}

export default App;
