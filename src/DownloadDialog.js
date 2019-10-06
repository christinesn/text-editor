/** @jsx jsx */
import React from 'react'
import {jsx} from '@emotion/core'
import {useTheme} from 'emotion-theming'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCode, faTextHeight} from '@fortawesome/free-solid-svg-icons'
import {faMarkdown} from '@fortawesome/free-brands-svg-icons'
import {
  Dialog, 
  DialogTitle, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar
} from '@material-ui/core'
import {useDownload} from './useDownload'

export function DownloadDialog ({ 
  open,
  setOpen, 
  editorState, 
  title,
  all = false,
  saves
}) {
  const {
    downloadDocAsHTML, 
    downloadDocAsMarkdown,
    downloadDocAsPlaintext,
    downloadAll
  } = useDownload()
  const theme = useTheme()
  
  function handleClose () {
    setOpen(false)
  }

  async function handleMarkdownDownload () {
    if (all) {
      await downloadAll({
        saves: saves,
        format: 'markdown'
      })
      return
    }

    downloadDocAsMarkdown({
      editorState,
      title
    })
  }

  async function handleHTMLDownload (style = 'light') {
    if (all) {
      await downloadAll({
        saves: saves,
        format: 'html',
        style: style
      })
      return
    }

    downloadDocAsHTML({
      title,
      editorState,
      style
    })
  }

  async function handlePlaintextDownload () {
    if (all) {
      await downloadAll({
        saves: saves,
        format: 'plaintext'
      })
      return
    }

    downloadDocAsPlaintext({
      title,
      editorState
    })
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="download-options-title"
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
        }
      }}
    >
      <DialogTitle
        id="download-options-title"
        css={{
          paddingBottom: '0.3em !important'
        }}
      >
        {all ? 'Download all' : 'Download'}
      </DialogTitle>
      <List>
        <ListItem button onClick={() => handleHTMLDownload('light')}>
          <ListItemAvatar aria-hidden="true">
            <Avatar>
              <FontAwesomeIcon icon={faCode} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="HTML - Light" />
        </ListItem>
        <ListItem button onClick={() => handleHTMLDownload('dark')}>
          <ListItemAvatar aria-hidden="true">
            <Avatar>
              <FontAwesomeIcon icon={faCode} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="HTML - Dark" />
        </ListItem>
        <ListItem button onClick={handleMarkdownDownload}>
          <ListItemAvatar aria-hidden="true">
            <Avatar>
              <FontAwesomeIcon icon={faMarkdown} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Markdown" />
        </ListItem>
        <ListItem button onClick={handlePlaintextDownload}>
          <ListItemAvatar aria-hidden="true">
            <Avatar>
              <FontAwesomeIcon icon={faTextHeight} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Plain text" />
        </ListItem>
      </List>
    </Dialog>
  )
}
