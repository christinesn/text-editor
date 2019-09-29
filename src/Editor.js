/** @jsx jsx */
import React from 'react'
import {EditorState, RichUtils, DefaultDraftBlockRenderMap} from 'draft-js'
import {default as Draft} from 'draft-js-plugins-editor'
import createInlineToolbarPlugin, {Separator} from 'draft-js-inline-toolbar-plugin'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import {jsx} from '@emotion/core'
import {
  BoldButton,
  ItalicButton,
  UnderlineButton,
  UnorderedListButton,
  BlockquoteButton,
  CenterButton
} from './ToolbarButtons'

const inlineToolbarPlugin = createInlineToolbarPlugin()
const {InlineToolbar} = inlineToolbarPlugin

DefaultDraftBlockRenderMap.merge({
  'centered': {
    element: 'div'
  }
})

export function Editor () {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const editor = React.useRef(null)

  React.useEffect(() => {
    editor.current.focus()
  }, [])

  function handleChange (newState) {
    setEditorState(newState)
  }

  function handleKeyCommand (command, state) {
    const newState = RichUtils.handleKeyCommand(state, command)

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
    <div css={{
      fontFamily: 'PT Serif',
      padding: '1em',
      margin: 'auto',
      fontSize: '1.4em',
      width: '50%',
      border: '1px solid #eee',
      '& .centered': {
        textAlign: 'center'
      },
      '& blockquote': {
        borderLeft: '1px solid rgba(0, 0, 0, 0.25)',
        marginLeft: '0.5em',
        paddingLeft: '0.5em',
        fontStyle: 'italic',
        color: 'rgba(0, 0, 0, 0.65)'
      },
      '& button': {
        cursor: 'pointer'
      }
    }}>
      <Draft
        ref={editor}
        editorState={editorState}
        onChange={handleChange}
        handleKeyCommand={handleKeyCommand}
        plugins={[inlineToolbarPlugin]}
        blockStyleFn={blockStyleFn}
      />
      <InlineToolbar>
        {
          (externalProps) => (
            <React.Fragment>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <Separator {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <BlockquoteButton {...externalProps} />
              <CenterButton {...externalProps} />
            </React.Fragment>
          )
        }
      </InlineToolbar>
    </div>
  )
}
