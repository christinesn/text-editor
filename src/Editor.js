/** @jsx jsx */
import React from 'react'
import {
  RichUtils,
  DefaultDraftBlockRenderMap,
  getDefaultKeyBinding,
  KeyBindingUtil
} from 'draft-js'
import {default as Draft} from 'draft-js-plugins-editor'
import createInlineToolbarPlugin, {Separator} from 'draft-js-inline-toolbar-plugin'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import {jsx} from '@emotion/core'
import {useTheme} from 'emotion-theming'
import {
  BoldButton,
  ItalicButton,
  UnderlineButton,
  BlockquoteButton,
  CenterButton
} from './ToolbarButtons'
import {useFullscreen} from './useFullscreen'
import TextareaAutosize from 'react-autosize-textarea'
import {useDocumentActions} from './useDocumentActions'

DefaultDraftBlockRenderMap.merge({
  'centered': {
    element: 'div'
  }
})

const inlineToolbarPlugin = createInlineToolbarPlugin()
const {InlineToolbar} = inlineToolbarPlugin

export function Editor ({ 
  editorState, 
  setEditorState, 
  title, 
  setTitle, 
  saves, 
  setSaves
}) {
  const scrollControl = React.useRef(null)
  const theme = useTheme()
  const {fullscreen} = useFullscreen()
  const {saveDocument} = useDocumentActions({
    saves,
    setSaves,
    setTitle,
    setEditorState
  })

  function inLastBlock () {
    const currentBlockKey = editorState.getSelection().getStartKey()
    const blockMap = editorState.getCurrentContent().getBlockMap().keySeq()
    const currentBlock = blockMap.findIndex(k => k === currentBlockKey) + 1
    const lastBlock = blockMap.size

    return currentBlock === lastBlock
  }

  /** Scroll with text as new lines are added */
  function scrollWithInput (newState) {
    if (newState.getLastChangeType() !== 'split-block') return
    if (!inLastBlock()) return

    scrollControl.current.scrollIntoView()
  }

  function handleChange (newState) {
    setEditorState(newState)
    scrollWithInput(newState)

    if (newState.getLastChangeType()) {
      saveDocument({ editorState: newState, title: title })
    }
  }

  function handleTitleChange (e) {
    setTitle(e.target.value)
    saveDocument({ editorState: editorState, title: e.target.value })
  }

  function keyBindingFn (e) {
    if (KeyBindingUtil.hasCommandModifier(e)) {
      if (e.keyCode === 74 /** j */) {
        return 'blockquote'
      }

      if (e.keyCode === 75 /** k */) {
        return 'centered'
      }
    }

    return getDefaultKeyBinding(e)
  }

  function handleKeyCommand (command, state) {
    let newState

    if (command === 'blockquote' || command === 'centered') {
      newState = RichUtils.toggleBlockType(state, command)
    } else {
      newState = RichUtils.handleKeyCommand(state, command)
    }

    if (newState) {
      setEditorState(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  function blockStyleFn (contentBlock) {
    const type = contentBlock.getType()
    if (type === 'centered') {
      return 'centered';
    }
  }

  return (
    <div
      css={{
        fontFamily: theme.fontFamily,
        margin: 'auto',
        marginTop: fullscreen ? '2.5em' : '1em',
        fontSize: '1.2em',
        lineHeight: '140%',
        transition: 'width cubic-bezier(0.4, 0, 0.6, 1) 200ms',
        width: '80%',
        [theme.breakpoints.sm]: {
          width: '70%'
        },
        [theme.breakpoints.md]: {
          width: '50%'
        },
        [theme.breakpoints.lg]: {
          width: '45%'
        },
        [theme.breakpoints.xl]: {
          width: '35%'
        },
        '& .centered': {
          textAlign: 'center'
        },
        '& blockquote': {
          borderLeft: `5px solid ${theme.blockquote.borderColor}`,
          margin: 0,
          marginLeft: '-0.5em',
          paddingLeft: '0.5em',
        },

        /** Toolbar styling */
        '& .draftJsToolbar__toolbar__dNtBH': {
          background: theme.toolbar.background,
          border: `1px solid ${theme.toolbar.border}`,
          boxShadow: theme.toolbar.boxShadow,
          '&:after': {
            borderTopColor: theme.toolbar.background
          },
          '&:before': {
            borderTopColor: theme.toolbar.border
          }
        },
        '& .draftJsToolbar__button__qi1gf': {
          cursor: 'pointer',
          background: theme.toolbar.background,
          color: theme.toolbar.color,
          transition: 'color ease 0.1s',
          '&:hover': {
            background: theme.toolbar.hover.background
          }
        },
        '& .draftJsToolbar__active__3qcpF': {
          color: theme.toolbar.active.color
        },
        '& .draftJsToolbar__separator__3U7qt': {
          borderColor: theme.toolbar.separator,
          height: 20
        }
      }}
    >
      <TextareaAutosize
        rows={1}
        value={title}
        onChange={handleTitleChange}
        aria-label="Title"
        css={{
          color: theme.color,
          fontSize: '1.5em',
          width: '100%',
          padding: '0.25em 0',
          resize: 'none',
          border: 'none',
          fontFamily: 'inherit',
          fontWeight: 'bold',
          marginBottom: '0.25em',
          background: 'transparent',
          '&:focus': {
            outline: 'none',
            boxShadow: 'none'
          }
        }}
      />
      <Draft
        editorState={editorState}
        onChange={handleChange}
        keyBindingFn={keyBindingFn}
        handleKeyCommand={handleKeyCommand}
        plugins={[inlineToolbarPlugin]}
        blockStyleFn={blockStyleFn}
        ariaLabel="Main text"
      />
      <InlineToolbar theme={{
        toolbarStyles: theme.toolbar,
        buttonStyles: theme.toolbar.buttons
      }}>
        {
          (externalProps) => (
            <React.Fragment>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <Separator {...externalProps} />
              <BlockquoteButton {...externalProps} />
              <CenterButton {...externalProps} />
            </React.Fragment>
          )
        }
      </InlineToolbar>
      <div
        ref={scrollControl}
        css={{
          marginTop: '45vh',
          display: 'block',
          width: '100%',
          height: 1
        }}
      />
    </div>
  )
}
