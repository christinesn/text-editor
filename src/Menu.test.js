import React from "react";
import { Menu } from "./Menu";
import { renderWithTheme } from "./renderWithTheme";
import { fireEvent } from "@testing-library/react";
import { newDocument } from "./newDocument";
import sinon from "sinon";
import { toBeVisible } from "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

jest.useFakeTimers();
expect.extend({ toBeVisible });

document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: "BODY",
    ownerDocument: document
  }
});

it("Toggles fullscreen", () => {
  const requestFullscreen = sinon.spy();
  const exitFullscreen = sinon.spy();

  global.window.document.documentElement.msRequestFullscreen = requestFullscreen;
  global.window.document.msExitFullscreen = exitFullscreen;

  const { getByLabelText } = renderWithTheme(<Menu />);

  fireEvent.click(getByLabelText("Fullscreen"));

  expect(requestFullscreen.called).toBe(true);

  global.window.document.fullscreenElement = true;

  fireEvent.click(getByLabelText("Exit fullscreen"));

  expect(exitFullscreen.called).toBe(true);
});

it("Creates a new document", () => {
  const setSaves = sinon.spy();
  const setTitle = sinon.spy();
  const setEditorState = sinon.spy();

  const { getByLabelText } = renderWithTheme(
    <Menu
      saves={[]}
      setSaves={setSaves}
      setTitle={setTitle}
      setEditorState={setEditorState}
    />
  );

  fireEvent.click(getByLabelText("New document"));

  expect(setSaves.called).toBe(true);
  expect(setTitle.calledWith(newDocument.title)).toBe(true);
  expect(setEditorState.calledWith(newDocument.editorState)).toBe(true);
});

it("Switches to dark mode", () => {
  const setThemeName = sinon.spy();

  const { getByLabelText } = renderWithTheme(
    <Menu themeName="light" setThemeName={setThemeName} />
  );

  fireEvent.click(getByLabelText("Dark mode"));

  expect(setThemeName.calledWith("dark")).toBe(true);
});

it("Switches to light mode", () => {
  const setThemeName = sinon.spy();

  const { getByLabelText } = renderWithTheme(
    <Menu themeName="dark" setThemeName={setThemeName} />
  );

  fireEvent.click(getByLabelText("Light mode"));

  expect(setThemeName.calledWith("light")).toBe(true);
});

it("Opens the download menu", () => {
  const { getByLabelText, getByText } = renderWithTheme(<Menu />);

  fireEvent.click(getByLabelText("Download this document"));

  getByText("Download");
});

it("Opens the keyboard shortcuts menu", () => {
  const { getByLabelText, getByText } = renderWithTheme(<Menu />);

  fireEvent.click(getByLabelText("Keyboard shortcuts"));

  getByText("Keyboard Shortcuts");
});

it("Toggles the keep icons visible option", () => {
  const setKeepIconsVisible = sinon.spy();
  const { getByLabelText } = renderWithTheme(
    <Menu keepIconsVisible={false} setKeepIconsVisible={setKeepIconsVisible} />
  );
  fireEvent.click(getByLabelText("Keep icons visible"));

  expect(setKeepIconsVisible.calledWith(true)).toBe(true);
});

it("Calculates word count", () => {
  const { getByLabelText } = renderWithTheme(
    <Menu editorState={newDocument.editorState} />
  );

  /** Doesn't calculate until button is hovered or focused */
  fireEvent.focus(getByLabelText("Word count: 0"));

  getByLabelText("Word count: 59");
});

it("Hides the menu icons after 10 seconds of mouse inactivity", () => {
  const { getByLabelText } = renderWithTheme(<Menu />);

  expect(getByLabelText("New document")).toBeVisible();

  act(() => {
    jest.advanceTimersByTime(11000);
  });

  expect(getByLabelText("New document")).not.toBeVisible();

  fireEvent.mouseMove(getByLabelText("New document"));

  expect(getByLabelText("New document")).toBeVisible();
});

it('Never hides the menu icons when the "keep icons visible" option is selected', () => {
  const { getByLabelText } = renderWithTheme(<Menu keepIconsVisible={true} />);

  act(() => {
    jest.advanceTimersByTime(11000);
  });

  expect(getByLabelText("Keep icons visible")).toBeVisible();
});
