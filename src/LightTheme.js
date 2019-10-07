export const LightTheme = {
  name: "light",
  fontFamily: "PT Serif, serif",
  breakpoints: {
    smpx: 600,
    sm: "@media (min-width: 600px)",
    mdpx: 960,
    md: "@media (min-width: 960px)",
    lgpx: 1280,
    lg: "@media (min-width: 1280px)",
    xlpx: 1920,
    xl: "@media (min-width: 1920px)"
  },
  background: "#fff",
  color: "rgba(0, 0, 0, 0.85)",
  blockquote: {
    borderColor: "#64c6ed"
  },
  toolbar: {
    background: "#fff",
    boxShadow: "1px 1px 3px 0 rgba(0, 0, 0, 0.1)",
    color: "rgba(0, 0, 0, 0.65)",
    border: "#ddd",
    hover: {
      background: "#f3f3f3"
    },
    active: {
      color: "#64c6ed"
    },
    separator: "#ddd"
  },
  button: {
    background: "#fff",
    color: "rgba(0, 0, 0, 0.55)",
    disabledColor: "rgba(0, 0, 0, 0.3)",
    disabledBackground: "rgba(0, 0, 0, 0.05)",
    hoverColor: "rgba(0, 0, 0, 0.65)",
    hoverBackground: "rgba(0, 0, 0, 0.05)",
    focusBackground: "rgba(0, 0, 0, 0.1)"
  },
  tooltip: {
    background: "#707070",
    color: "rgba(255, 255, 255, 0.95)",
    border: "transparent"
  },
  dialog: {
    avatarColor: "#fff",
    avatarBackground: "rgba(0, 0, 0, 0.3)",
    itemHover: "rgba(0, 0, 0, 0.075)",
    itemFocus: "rgba(0, 0, 0, 0.075)"
  },
  drawer: {
    open: {
      background: "rgba(0, 0, 0, 0.03)",
      border: "rgba(0, 0, 0, 0.1)"
    },
    background: "#fcfcfc",
    borderColor: "#e3e3e3",
    shadow: "0 0 5px 0 rgba(0, 0, 0, 0.2)",
    dateColor: "rgba(0, 0, 0, 0.54)"
  },
  pre: {
    background: "rgba(0, 0, 0, 0.05)"
  }
};
