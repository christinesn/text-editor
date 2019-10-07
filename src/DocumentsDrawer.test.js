import React from 'react'
import {DocumentsDrawer} from './DocumentsDrawer'
import {renderWithTheme} from './renderWithTheme'
import {fireEvent} from '@testing-library/react'
import {newDocument} from './newDocument'
import sinon from 'sinon'
import {toBeVisible} from '@testing-library/jest-dom'
import {convertToRaw} from 'draft-js'

jest.useFakeTimers()
expect.extend({toBeVisible})

document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});

const saves = [{
  id: 1,
  date: new Date('2019-01-02'),
  title: '',
  content: convertToRaw(newDocument.editorState.getCurrentContent()),
  open: true
}, {
  id: 2,
  date: new Date('2019-01-01'),
  title: 'Title',
  content: convertToRaw(newDocument.editorState.getCurrentContent()),
  open: false
}]

it('Opens the drawer', () => {
  const setOpen = sinon.spy()

  const {getByLabelText} = renderWithTheme(
    <DocumentsDrawer 
      open={false} 
      setOpen={setOpen}
      saves={[]}
    />
  )
  fireEvent.click(getByLabelText('View documents'))

  expect(setOpen.calledWith(true)).toBe(true)
})

it('Closes the drawer', () => {
  const setOpen = sinon.spy()

  const {getByLabelText} = renderWithTheme(
    <DocumentsDrawer 
      open={true} 
      setOpen={setOpen}
      saves={[]}
    />
  )
  fireEvent.click(getByLabelText('Close drawer'))

  expect(setOpen.calledWith(false)).toBe(true)
})

it('Opens the download dialog', () => {
  const {getByLabelText, getByText} = renderWithTheme(
    <DocumentsDrawer
      open={true}
      saves={[]}
    />
  )

  fireEvent.click(getByLabelText('Download all'))

  getByText('Download all')
})

it('Lists all saved documents', () => {
  const {getByText} = renderWithTheme(
    <DocumentsDrawer
      open={true}
      saves={saves}
    />
  )

  getByText(newDocument.title)
  getByText(newDocument.editorState.getCurrentContent().getPlainText().substring(0, 50))
})

it('Deletes documents', () => {
  const setSaves = sinon.spy()

  const {getByTestId} = renderWithTheme(
    <DocumentsDrawer
      open={true}
      saves={saves}
      setSaves={setSaves}
    />
  )

  let newSaves = [saves[0]]

  fireEvent.click(getByTestId('delete_2'))

  expect(setSaves.calledWith(newSaves)).toBe(true)
})

it('Creates a new document when the last one is deleted', () => {
  const setSaves = sinon.spy()
  const setTitle = sinon.spy()
  const setEditorState = sinon.spy()

  const {getByTestId} = renderWithTheme(
    <DocumentsDrawer
      open={true}
      saves={[saves[0]]}
      setSaves={setSaves}
      setTitle={setTitle}
      setEditorState={setEditorState}
    />
  )

  fireEvent.click(getByTestId('delete_1'))

  const args = setSaves.getCall(0).args
  expect(args.length).toBe(1)
})

it('Switches between documents', () => {
  const setSaves = sinon.spy()
  const setTitle = sinon.spy()
  const setEditorState = sinon.spy()

  const {getByText} = renderWithTheme(
    <DocumentsDrawer
      open={true}
      saves={saves}
      setSaves={setSaves}
      setTitle={setTitle}
      setEditorState={setEditorState}
    />
  )

  const newSaves = saves
  newSaves[1].open = true
  newSaves[0].open = false

  fireEvent.click(getByText(saves[1].title))

  expect(setSaves.calledWith(newSaves)).toBe(true)
  expect(setTitle.calledWith(saves[1].title)).toBe(true)
  expect(setEditorState.called).toBe(true)
})
