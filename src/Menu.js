/** @jsx jsx */
import React from 'react'
import {jsx} from '@emotion/core'
import {useFullscreen} from './useFullscreen'
import {useTheme} from 'emotion-theming'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faExpandArrowsAlt,
  faAdjust,
  faDownload,
  faSave,
  faPlusCircle,
  faEye,
  faCalculator,
  faKeyboard
} from '@fortawesome/free-solid-svg-icons'
import {IconButton, Tooltip} from '@material-ui/core'
import {DownloadDialog} from './DownloadDialog'
import {useDocumentActions} from './useDocumentActions'
import {KeyboardShortcuts} from './KeyboardShortcuts'

export function Menu ({
  themeName,
  setThemeName,
  editorState,
  title,
  saves,
  setSaves,
  setTitle,
  setEditorState,
  keepIconsVisible,
  setKeepIconsVisible
}) {
  const theme = useTheme()
  const [downloadDialogOpen, setDownloadDialogOpen] = React.useState(false)
  const [keyboardShortcutsOpen, setKeyboardShortcutsOpen] = React.useState(false)
  const [shown, setShown] = React.useState(true)
  const [timer, setTimer] = React.useState(null)
  const [wordCount, setWordCount] = React.useState(0)
  const {toggleFullscreen, fullscreenPossible, fullscreen} = useFullscreen()
  const {createNewDocument} = useDocumentActions({
    saves,
    setSaves,
    setTitle,
    setEditorState
  })

  const fullscreenTitle = fullscreen ? 'Exit fullscreen' : 'Fullscreen'
  const themeTitle = themeName === 'light' ? 'Dark mode' : 'Light mode'

  function calculateWordCount () {
    setWordCount(editorState.getCurrentContent().getPlainText().split(/\s+/).length)
  }

  function toggleTheme () {
    if (themeName === 'light') {
      setThemeName('dark')
    } else {
      setThemeName('light')
    }
  }

  React.useEffect(() => {
    function handleMousemove () {
      clearInterval(timer)
      setShown(true)
    }

    window.addEventListener('mousemove', handleMousemove)

    return () => {
      window.removeEventListener('mousemove', handleMousemove)
    }
  }, [])

  React.useEffect(() => {
    if (!timer) {
      setTimer(setInterval(() => setShown(false), 10000))
    }

    return (() => {
      clearInterval(timer)
    })
  }, [timer])

  return (
    <React.Fragment>
      <div
        css={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 50,
          textAlign: 'center',
          padding: '0.25em 0.5em',
          opacity: (shown || keepIconsVisible) ? 1 : 0,
          transition: 'opacity ease 1s',
          '&:hover': {
            opacity: '1 !important'
          },
          '& .MuiIconButton-root': {
            color: theme.button.color,
            fontSize: '1.3em !important',
            '&:hover, &:active': {
              background: theme.button.hoverBackground,
              color: theme.button.hoverColor
            },
            '&:focus': {
              background: theme.button.focusBackground
            }
          }
        }}
      >
        {fullscreenPossible() && (
          <Tooltip title={fullscreenTitle} placement="left">
            <IconButton
              disableFocusRipple
              onClick={toggleFullscreen}
              onFocus={() => setShown(true)}
              aria-label={fullscreenTitle}
            >
              <FontAwesomeIcon icon={faExpandArrowsAlt} />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="New document" placement="left">
          <IconButton
            disableFocusRipple
            onClick={createNewDocument}
            onFocus={() => setShown(true)}
            aria-label="New document"
          >
            <FontAwesomeIcon icon={faPlusCircle} />
          </IconButton>
        </Tooltip>
        <Tooltip title={themeTitle} placement="left">
          <IconButton
            disableFocusRipple
            onClick={toggleTheme}
            onFocus={() => setShown(true)}
            aria-label={themeTitle}
          >
            <FontAwesomeIcon icon={faAdjust} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download this document" placement="left">
          <IconButton
            disableFocusRipple
            onClick={() => setDownloadDialogOpen(true)}
            onFocus={() => setShown(true)}
            aria-label="Download this document"
          >
            <FontAwesomeIcon icon={faDownload} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Keyboard shortcuts" placement="left">
          <IconButton
            disableFocusRipple
            onClick={() => setKeyboardShortcutsOpen(true)}
            onFocus={() => setShown(true)}
            aria-label="Keyboard shortcuts"
          >
            <FontAwesomeIcon icon={faKeyboard} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Keep icons visible" placement="left">
          <IconButton
            disableFocusRipple
            onClick={() => setKeepIconsVisible(!keepIconsVisible)}
            onFocus={() => setShown(true)}
            aria-label="Keep icons visible"
            css={{
              color: keepIconsVisible 
                ? theme.button.color 
                : `${theme.button.disabledColor} !important`
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </IconButton>
        </Tooltip>
        <Tooltip title={`Word count: ${wordCount.toLocaleString()}`} placement="left">
          <IconButton
            onMouseOver={calculateWordCount}
            onFocus={calculateWordCount}
            disableRipple
            aria-label={`Word count: ${wordCount.toLocaleString()}`}
            css={{
              color: `${theme.button.disabledColor} !important`,
              '&:hover, &:active, &:focus': {
                backgroundColor: `${theme.button.disabledBackground} !important`
              }
            }}
          >
            <FontAwesomeIcon icon={faCalculator} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Your work autosaves" placement="left">
          <IconButton
            aria-label="Your work autosaves"
            disableRipple
            css={{
              color: `${theme.button.disabledColor} !important`,
              '&:hover, &:active, &:focus': {
                backgroundColor: `${theme.button.disabledBackground} !important`
              }
            }}
          >
            <FontAwesomeIcon icon={faSave} />
          </IconButton>
        </Tooltip>
        <DownloadDialog
          open={downloadDialogOpen}
          setOpen={setDownloadDialogOpen}
          editorState={editorState}
          title={title}
        />
        <KeyboardShortcuts
          open={keyboardShortcutsOpen}
          setOpen={setKeyboardShortcutsOpen}
        />
      </div>
    </React.Fragment>
  )
}
