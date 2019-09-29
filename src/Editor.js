/** @jsx jsx */
import React from 'react'
import {EditorState, ContentState, RichUtils, DefaultDraftBlockRenderMap} from 'draft-js'
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

DefaultDraftBlockRenderMap.merge({
  'centered': {
    element: 'div'
  }
})

const inlineToolbarPlugin = createInlineToolbarPlugin()
const {InlineToolbar} = inlineToolbarPlugin

export function Editor () {
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(
      ContentState.createFromText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut facilisis lectus at maximus cursus. Vestibulum blandit tellus vel nulla pharetra, eget pellentesque justo facilisis. \n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam pellentesque dolor dolor, eu suscipit risus rutrum sed. Donec porta nisl quam, et venenatis quam dignissim at. Curabitur eget risus ex. \n\nIn sollicitudin nibh quis orci feugiat aliquam eu sit amet magna. Duis scelerisque cursus libero, in fringilla ligula porta ac. Maecenas massa tortor, commodo id sem vitae, bibendum ultricies magna. Pellentesque vehicula sapien vitae est commodo imperdiet. Aliquam nec urna ante. Nullam porttitor at dolor a tempus. Sed laoreet urna sed facilisis efficitur.')
    )
  )
  const [title, setTitle] = React.useState('Title')
  const editor = React.useRef(null)
  const theme = useTheme()

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
      margin: 'auto',
      fontSize: '1.3em',
      lineHeight: '140%',
      width: '80%',
      paddingBottom: 100,
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
        border: 'none',
        boxShadow: theme.toolbar.boxShadow,
        '&:before, &:after': {
          borderTopColor: theme.toolbar.background
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
    }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        css={{
          fontSize: '1.5em',
          width: '100%',
          padding: '0.25em 0',
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
        ref={editor}
        editorState={editorState}
        onChange={handleChange}
        handleKeyCommand={handleKeyCommand}
        plugins={[inlineToolbarPlugin]}
        blockStyleFn={blockStyleFn}
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
    </div>
  )
}
