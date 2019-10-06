import {stateToHTML} from 'draft-js-export-html'
import {saveAs} from 'file-saver'
import {LightTheme} from './LightTheme'
import {DarkTheme} from './DarkTheme'
import {format} from 'date-fns'
import {stateToMarkdown} from 'draft-js-export-markdown'
import {EditorState, convertFromRaw} from 'draft-js'
import JSZip from 'jszip'

export function useDownload () {
  function htmlStart ({ theme, title }) {
    return `
      <!doctype html>
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css?family=PT+Serif:400,700,400i,700i&display=swap" rel="stylesheet">
          <style type="text/css">
            body {
              font-family: ${theme.fontFamily};
              color: ${theme.color};
              background: ${theme.background};
              word-wrap: break-word;
              font-size: 1.2em;
              line-height: 140%;
            }
            .container {
              margin: auto;
              width: 80%;
              margin-bottom: 10em;
              margin-top: 2em;
            }
            ${theme.breakpoints.sm} {
              .container {
                width: 70%;
              }
            }
            ${theme.breakpoints.md} {
              .container {
                width: 50%;
              }
            }
            ${theme.breakpoints.lg} {
              .container {
                width: 45%;
              }
            }
            ${theme.breakpoints.xl} {
              .container {
                width: 35%;
              }
            }
            .spacer {
              width: 100%;
              margin-top: 3em;
            }
            .title {
              font-size: 1.5em;
              margin-bottom: 1em;
            }
            blockquote {
              border-left: 5px solid ${theme.blockquote.borderColor};
              margin: 0;
              margin-left: -0.5em;
              padding-left: 0.5em;
            }
            .centered {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            ${title ? `<h1 class="title">${title}</h1>` : '<div class="spacer"></div>'}
            <div class="text">
    `
  }

  const htmlEnd = `
          </div>
        </div>
      </body>
    </html>
  `

  function formatDate (date) {
    if (!date) return null
    return format(date, "yyyyMMddHHmmss")
  }

  function formatFilename (title) {
    return (title && title.substring(0, 20)) || 'Untitled'
  }

  function docAsHTML ({ title, editorState, style = 'light', date }) {
    const options = {
      defaultBlockTag: 'div',
      blockRenderers: {
        centered: (block) => {
          if (block.getType() === 'centered') {
            return `
            <div style="text-align: center;" class="centered">
              ${stateToHTML(
                  { getBlocksAsArray: () => [block] },
                  { defaultBlockTag: 'span' }
                )}
            </div>`
          }
        }
      }
    }

    const theme = style === 'light' ? LightTheme : DarkTheme
    const blob = new Blob(
      [
        htmlStart({ theme, title }),
        stateToHTML(editorState.getCurrentContent(), options),
        htmlEnd
      ],
      { type: 'text/html;charset=utf-8' }
    )

    const filename = formatFilename(title)

    return {
      blob: blob,
      filename: `${filename}.html`,
      dateFilename: `${formatDate(date)} ${filename}.html`
    }
  }

  function downloadDocAsHTML ({ title, editorState, style = 'light', date }) {
    const doc = docAsHTML({
      title,
      editorState,
      style,
      date
    })

    saveAs(doc.blob, doc.filename, {autobom: true})
  }

  function docAsMarkdown ({ title, editorState, date }) {
    let markdown = stateToMarkdown(editorState.getCurrentContent())
    markdown = markdown.replace(/(\n\s*){2,}/gi, "\n")

    const titleMarkdown = title ? `# ${title}\n\n` : ''

    const blob = new Blob([
      titleMarkdown,
      markdown
    ], {
      type: 'text/plain;charset=utf-8'
    })

    const filename = formatFilename(title)

    return {
      blob: blob,
      filename: `${filename}.md`,
      dateFilename: `${formatDate(date)} ${filename}.md`
    }
  }

  function downloadDocAsMarkdown ({ title, editorState, date }) {
    const doc = docAsMarkdown({
      title,
      editorState,
      date
    })

    saveAs(doc.blob, doc.filename, {autobom: true})
  }

  function docAsPlaintext ({ title, editorState, date }) {
    const blob = new Blob([
      `${title}\n\n`,
      editorState.getCurrentContent().getPlainText()
    ])

    const filename = formatFilename(title)

    return {
      blob: blob,
      filename: `${filename}.txt`,
      dateFilename: `${formatDate(date)} ${filename}.txt`
    }
  }

  function downloadDocAsPlaintext ({ title, editorState, date }) {
    const doc = docAsPlaintext({
      title,
      editorState,
      date
    })

    saveAs(doc.blob, doc.filename, {autobom: true})
  }

  async function downloadAll ({ saves, format = 'plaintext', style = 'light' }) {
    const docs = saves.map(save => ({
      ...save,
      editorState: EditorState.createWithContent(convertFromRaw(save.content)),
      style: style
    }))

    let formattedDocs

    if (format === 'html') {
      formattedDocs = docs.map(doc => docAsHTML(doc))
    } else if (format === 'markdown') {
      formattedDocs = docs.map(doc => docAsMarkdown(doc))
    } else {
      formattedDocs = docs.map(doc => docAsPlaintext(doc))
    }

    const zip = new JSZip()
    formattedDocs.forEach(doc => zip.file(doc.dateFilename, doc.blob))

    const zipBlob = await zip.generateAsync({ type: 'blob' })
    saveAs(zipBlob, `${formatDate(Date.now())} Files.zip`)
  }

  return {
    docAsHTML,
    downloadDocAsHTML,
    docAsMarkdown,
    downloadDocAsMarkdown,
    docAsPlaintext,
    downloadDocAsPlaintext,
    downloadAll
  }
}
