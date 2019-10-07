import { EditorState, ContentState } from "draft-js";

export const newDocument = {
  title: "Title",
  editorState: EditorState.createWithContent(
    ContentState.createFromText(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut facilisis lectus at maximus cursus. Vestibulum blandit tellus vel nulla pharetra, eget pellentesque justo facilisis. \n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam pellentesque dolor dolor, eu suscipit risus rutrum sed. Donec porta nisl quam, et venenatis quam dignissim at. Curabitur eget risus ex."
    )
  )
};
