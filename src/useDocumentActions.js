import {convertFromRaw, convertToRaw, EditorState} from 'draft-js'
import {newDocument} from './newDocument'

export function useDocumentActions ({
  saves,
  setSaves,
  setTitle,
  setEditorState
}) {
  function switchToDocument (document) {
    const newSaves = saves.map(save => {
      if (save.id === document.id) {
        return {
          ...save,
          open: true
        }
      }

      return {
        ...save,
        open: false
      }
    })

    setSaves(newSaves)
    setTitle(document.title)
    setEditorState(EditorState.createWithContent(convertFromRaw(document.content)))
  }

  function deleteDocument (document) {
    /** Delete chosen document */
    let newSaves = saves.filter(i => i.id !== document.id)
    
    /** If there are now no documents, start a new one */
    if (newSaves.length === 0) {
      newSaves = [{
        id: 1,
        content: convertToRaw(newDocument.editorState.getCurrentContent()),
        title: newDocument.title,
        date: Date.now(),
        open: true
      }]

      setEditorState(newDocument.editorState)
      setTitle(newDocument.title)
    }

    const open = newSaves.filter(i => i.open)[0]

    /**
     * If there are other documents but none are open,
     * open the most recently changed one
     */
    if (!open) {
      const latest = newSaves.sort((a, b) => (a.date < b.date ? 1 : -1 ))[0]

      newSaves = newSaves.map(save => {
        if (save.id === latest.id) {
          return {
            ...save,
            open: true
          }
        }

        return save
      })

      setTitle(latest.title)
      setEditorState(EditorState.createWithContent(convertFromRaw(latest.content)))
    }

    /** Save */
    setSaves(newSaves)
  }

  function createNewDocument () {
    let newSaves = saves.map(save => ({...save, open: false}))
    
    const newID = saves.length === 0
      ? 1
      : saves.sort((a, b) => (a.id < b.id ? 1 : -1))[0].id + 1

    const newSave = {
      id: newID,
      content: convertToRaw(newDocument.editorState.getCurrentContent()),
      title: newDocument.title,
      date: Date.now(),
      open: true
    }

    newSaves = newSaves.concat(newSave)

    setSaves(newSaves)
    setTitle(newDocument.title)
    setEditorState(newDocument.editorState)
  }

  function saveDocument ({ title, editorState }) {
    const newSaves = saves.map(save => {
      if (save.open) {
        return {
          ...save,
          title: title,
          content: convertToRaw(editorState.getCurrentContent()),
          date: Date.now()
        }
      }

      return save
    })

    setSaves(newSaves)
  }

  return {
    switchToDocument,
    deleteDocument,
    createNewDocument,
    saveDocument
  }
}
