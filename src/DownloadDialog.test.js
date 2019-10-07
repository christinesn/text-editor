import React from "react";
import { DownloadDialog } from "./DownloadDialog";
import { renderWithTheme } from "./renderWithTheme";
import { fireEvent } from "@testing-library/react";
import { newDocument } from "./newDocument";
import sinon from "sinon";
import FileSaver from "file-saver";

const fileSaverStub = sinon.stub(FileSaver, "saveAs");

afterEach(() => {
  fileSaverStub.resetHistory();
});

afterAll(() => {
  fileSaverStub.restore();
});

it("Downloads a single file as HTML", () => {
  const { getByText } = renderWithTheme(
    <DownloadDialog
      title={newDocument.title}
      editorState={newDocument.editorState}
      open={true}
      setOpen={() => {}}
      all={false}
    />
  );

  fireEvent.click(getByText("HTML - Light"));

  expect(FileSaver.saveAs.called).toBe(true);
  expect(FileSaver.saveAs.getCall(0).args[1]).toBe("Title.html");
});

it("Downloads a single file as markdown", () => {
  const { getByText } = renderWithTheme(
    <DownloadDialog
      title={newDocument.title}
      editorState={newDocument.editorState}
      open={true}
      setOpen={() => {}}
      all={false}
    />
  );

  fireEvent.click(getByText("Markdown"));

  expect(FileSaver.saveAs.called).toBe(true);
  expect(FileSaver.saveAs.getCall(0).args[1]).toBe("Title.md");
});

it("Downloads a single file as plaintext", () => {
  const { getByText } = renderWithTheme(
    <DownloadDialog
      title={newDocument.title}
      editorState={newDocument.editorState}
      open={true}
      setOpen={() => {}}
      all={false}
    />
  );

  fireEvent.click(getByText("Plain text"));

  expect(FileSaver.saveAs.called).toBe(true);
  expect(FileSaver.saveAs.getCall(0).args[1]).toBe("Title.txt");
});
