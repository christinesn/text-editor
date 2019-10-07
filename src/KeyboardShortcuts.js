/** @jsx jsx */
import React from 'react'
import {jsx} from '@emotion/core'
import {useTheme} from 'emotion-theming'
import {
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core'

export function KeyboardShortcuts ({ 
  open,
  setOpen,
}) {
  const theme = useTheme()
  
  function handleClose () {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="keyboard-shortcuts-title"
      aria-describedby="keyboard-shortcuts-content"
      css={{
        '& .MuiDialog-paper': {
          minWidth: 200,
          background: theme.background,
          color: theme.color
        },
        '& .MuiAvatar-root': {
          color: theme.dialog.avatarColor,
          backgroundColor: theme.dialog.avatarBackground
        },
        '& .MuiListItem-root:hover': {
          backgroundColor: theme.dialog.itemHover
        },
        '& .MuiListItem-root:focus': {
          backgroundColor: theme.dialog.itemFocus
        },
        '& #keyboard-shortcuts-content': {
          color: theme.color
        },
        '& .pre': {
          display: 'inline-block',
          background: theme.pre.background,
          padding: '0 0.5em',
          margin: '0.5em',
          marginRight: '1em',
          fontFamily: 'Roboto Mono'
        }
      }}
    >
      <DialogTitle
        id="keyboard-shortcuts-title"
        css={{
          paddingBottom: '0.3em !important'
        }}
      >
        Keyboard Shortcuts
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="keyboard-shortcuts-content">
          <span
            className="pre"
            aria-labelledby="shortcuts-bold-label"
          >
            Ctrl + B
          </span>
          <span
            id="shortcuts-bold-label"
          >
            Bold
          </span>
          <br />
          <span
            className="pre"
            aria-labelledby="shortcuts-italic-label"
          >
            Ctrl + I
          </span>
          <span
            id="shortcuts-italic-label"
          >
            Italics
          </span>
          <br />
          <span
            className="pre"
            aria-labelledby="shortcuts-underline-label"
          >
            Ctrl + U
          </span>
          <span
            id="shortcuts-underline-label"
          >
            Underline
          </span>
          <br />
          <span
            className="pre"
            aria-labelledby="shortcuts-blockquote-label"
          >
            Ctrl + J
          </span>
          <span
            id="shortcuts-blockquote-label"
          >
            Blockquote
          </span>
          <br />
          <span
            className="pre"
            aria-labelledby="shortcuts-center-label"
          >
            Ctrl + K
          </span>
          <span
            id="shortcuts-center-label"
          >
            Center
          </span>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
