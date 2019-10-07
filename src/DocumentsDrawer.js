/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";
import {
  Drawer,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import {
  faFolderOpen,
  faCaretRight,
  faCaretLeft,
  faTrashAlt,
  faDownload
} from "@fortawesome/free-solid-svg-icons";
import { useDocumentActions } from "./useDocumentActions";
import { DownloadDialog } from "./DownloadDialog";

export function DocumentsDrawer({
  saves,
  setSaves,
  setTitle,
  setEditorState,
  keepIconsVisible,
  open,
  setOpen
}) {
  const [showButton, setShowButton] = React.useState(true);
  const [timer, setTimer] = React.useState(null);
  const [downloadDialogOpen, setDownloadDialogOpen] = React.useState(false);
  const theme = useTheme();
  const drawerWidth = 275;
  const { switchToDocument, deleteDocument } = useDocumentActions({
    saves,
    setSaves,
    setTitle,
    setEditorState
  });
  const closeButton = React.useRef(null);

  React.useEffect(() => {
    function handleMousemove() {
      clearInterval(timer);
      setShowButton(true);
    }

    window.addEventListener("mousemove", handleMousemove);

    return () => {
      window.removeEventListener("mousemove", handleMousemove);
    };
  }, []);

  React.useEffect(() => {
    if (!timer) {
      setTimer(setInterval(() => setShowButton(false), 10000));
    }

    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  React.useEffect(() => {
    if (open) {
      closeButton.current.focus();
    }
  }, [open]);

  function formatDocumentTitle(title, content) {
    if (title) {
      return title;
    }

    const text = content.blocks[0].text;
    if (text) {
      return text.substring(0, 50);
    }

    return "Untitled";
  }

  return (
    <div
      css={{
        "& .MuiIconButton-root": {
          color: `${theme.button.color} !important`,
          "&:active, &:hover": {
            backgroundColor: `${theme.button.hoverBackground} !important`,
            color: `${theme.button.hoverColor} !important`
          },
          "&:focus": {
            backgroundColor: `${theme.button.focusBackground} !important`
          }
        }
      }}
    >
      {!open && (
        <div
          css={{
            position: "fixed",
            top: "0.5em",
            left: 0,
            marginLeft: 0,
            transition: "opacity ease 1s",
            opacity: keepIconsVisible || showButton ? 1 : 0
          }}
        >
          <Tooltip placement="right" title="View documents">
            <IconButton
              disableFocusRipple
              onClick={() => setOpen(!open)}
              onFocus={() => setShowButton(true)}
              aria-label="View documents"
              css={{
                fontSize: "1.3em !important",
                minWidth: "0px !important",
                padding: "0.5em !important",
                borderRadius: "0px 4px 4px 0px !important"
              }}
            >
              <FontAwesomeIcon icon={faFolderOpen} />
              <FontAwesomeIcon
                icon={faCaretRight}
                css={{
                  marginLeft: "0.5em"
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
      )}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        variant="persistent"
        anchor="left"
        SlideProps={{
          timeout: 200
        }}
        css={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: theme.drawer.background,
            borderRight: `1px solid ${theme.drawer.borderColor} !important`,
            boxShadow: theme.drawer.shadow,
            color: theme.color
          }
        }}
      >
        <React.Fragment>
          <div
            css={{
              height: 42,
              padding: "0.5em",
              borderBottom: `1px solid ${theme.drawer.open.border}`,
              boxShadow: `0 0 7px 0 ${theme.drawer.open.border}`,
              "& .MuiIconButton-root": {
                fontSize: "1.3em !important",
                minWidth: "0px !important",
                padding: "0.5em !important",
                borderRadius: "4px !important"
              }
            }}
          >
            <Tooltip placement="right" title="Download all">
              <IconButton
                disableFocusRipple
                onClick={() => setDownloadDialogOpen(true)}
                aria-label="Download all"
              >
                <FontAwesomeIcon icon={faDownload} />
              </IconButton>
            </Tooltip>
            <Tooltip placement="left" title="Close drawer">
              <IconButton
                ref={closeButton}
                disableFocusRipple
                onClick={() => setOpen(false)}
                aria-label="Close drawer"
                css={{
                  float: "right"
                }}
              >
                <FontAwesomeIcon
                  icon={faCaretLeft}
                  css={{
                    marginRight: "0.5em"
                  }}
                />
                <FontAwesomeIcon icon={faFolderOpen} />
              </IconButton>
            </Tooltip>
          </div>
          <div
            css={{
              height: "calc(100% - 42px)",
              overflow: "auto"
            }}
          >
            <List>
              {saves
                .sort((a, b) => (a.date < b.date ? 1 : -1))
                .map(save => (
                  <ListItem
                    key={save.id}
                    button
                    dense
                    onClick={() => switchToDocument(save)}
                    data-testid={`switch_to_${save.id}`}
                    css={{
                      background: save.open
                        ? `${theme.drawer.open.background} !important`
                        : "transparent",
                      borderTop: save.open
                        ? `1px solid ${theme.drawer.open.border} !important`
                        : "1px solid transparent !important",
                      borderBottom: save.open
                        ? `1px solid ${theme.drawer.open.border} !important`
                        : "1px solid transparent !important",
                      "&:hover, &:active": {
                        background: `${theme.button.hoverBackground} !important`
                      },
                      "&:focus": {
                        background: `${theme.button.focusBackground} !important`
                      }
                    }}
                  >
                    <ListItemText
                      primary={formatDocumentTitle(save.title, save.content)}
                      secondary={format(save.date, "MM/dd/yyyy - h:mmaaaaa'm'")}
                      css={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        paddingRight: "1em",
                        whiteSpace: "nowrap",
                        "& .MuiListItemText-secondary": {
                          fontSize: "0.75em",
                          color: `${theme.drawer.dateColor} !important`
                        }
                      }}
                    />
                    <ListItemSecondaryAction>
                      <Tooltip placement="bottom" title="Delete">
                        <IconButton
                          disableFocusRipple
                          onClick={() => deleteDocument(save)}
                          css={{
                            fontSize: "1.1em !important"
                          }}
                          data-testid={`delete_${save.id}`}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          </div>
        </React.Fragment>
      </Drawer>
      <DownloadDialog
        open={downloadDialogOpen}
        setOpen={setDownloadDialogOpen}
        all={true}
        saves={saves}
      />
    </div>
  );
}
