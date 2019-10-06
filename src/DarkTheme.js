export const DarkTheme = {
  name: 'dark',
  fontFamily: 'PT Serif, serif',
  breakpoints: {
    smpx: 600,
    sm: '@media (min-width: 600px)',
    mdpx: 960,
    md: '@media (min-width: 960px)',
    lgpx: 1280,
    lg: '@media (min-width: 1280px)',
    xlpx: 1920,
    xl: '@media (min-width: 1920px)'
  },
  background: '#1e1e1e',
  color: '#d8d8d8',
  highlight: 'rgba(255, 255, 255, 0.1)',
  blockquote: {
    borderColor: '#72cfab'
  },
  toolbar: {
    background: '#383838',
    boxShadow: '2px 2px 3px 0 rgba(0, 0, 0, 0.5)',
    color: '#c4c4c4',
    border: '#383838',
    hover: {
      background: 'rgba(255, 255, 255, 0.1)'
    },
    active: {
      color: '#72cfab'
    },
    separator: 'rgba(255, 255, 255, 0.25)'
  },
  button: {
    background: '#1e1e1e',
    color: '#c4c4c4',
    disabledColor: '#565656',
    disabledBackground: 'rgba(255, 255, 255, 0.05)',
    hoverColor: '#d8d8d8',
    hoverBackground: 'rgba(255, 255, 255, 0.1)',
    focusBackground: 'rgba(255, 255, 255, 0.1)'
  },
  tooltip: {
    background: '#383838',
    color: '#c4c4c4',
    border: 'transparent'
  },
  dialog: {
    avatarColor: '#c4c4c4',
    avatarBackground: 'rgba(255, 255, 255, 0.05)',
    itemHover: 'rgba(255, 255, 255, 0.05)',
    itemFocus: 'rgba(255, 255, 255, 0.05)'
  },
  drawer: {
    background: '#1e1e1e',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadow: '0 0 7px 0 rgba(0, 0, 0, 0.8)',
    dateColor: '#a3a3a3',
    open: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(255, 255, 255, 0.075)'
    }
  },
  pre: {
    background: 'rgba(255, 255, 255, 0.1)'
  }
}
