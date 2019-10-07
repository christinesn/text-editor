import React from "react";
import {
  createBlockStyleButton,
  createInlineStyleButton
} from "draft-js-buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faList,
  faQuoteRight,
  faAlignCenter
} from "@fortawesome/free-solid-svg-icons";

export const BoldButton = createInlineStyleButton({
  style: "BOLD",
  children: <FontAwesomeIcon icon={faBold} title="Bold" />
});

export const UnderlineButton = createInlineStyleButton({
  style: "UNDERLINE",
  children: <FontAwesomeIcon icon={faUnderline} title="Underline" />
});

export const ItalicButton = createInlineStyleButton({
  style: "ITALIC",
  children: <FontAwesomeIcon icon={faItalic} title="Italic" />
});

export const UnorderedListButton = createBlockStyleButton({
  blockType: "unordered-list-item",
  children: <FontAwesomeIcon icon={faList} title="Bullet list" />
});

export const BlockquoteButton = createBlockStyleButton({
  blockType: "blockquote",
  children: <FontAwesomeIcon icon={faQuoteRight} title="Blockquote" />
});

export const CenterButton = createBlockStyleButton({
  blockType: "centered",
  children: <FontAwesomeIcon icon={faAlignCenter} title="Center" />
});
