import {createGlobalStyle, keyframes} from "styled-components"
import {isMobile} from "react-device-detect"
import {useEffect, useState} from "react"
import storage from "local-storage-fallback"


export const globalVar = {
  primaryColor: "#fff",
  secondaryColor: "#333",
  /* Styles--use hex value. i.e. visit https://www.color-hex.com/
   ========================================= */
  headerColorLight: "#eee",
  headerColorDark: "#232323",
  bgColorLight: "#fff",
  bgColorDark: "#26272e",
  /* background colors surrounding profile & posts in main page */
  bgSubColorLight: "#f7f7f7",
  bgSubColorDark: "#383a42",

  headerBgDark: "#3d3f48",
  headerBgLight: "white",

  /* Font Colors */
  fontColorLight: "#313131",
  fontSubColorLight: "#808080",
  fontColorDark: "#d3d3dc",
  fontSubColorDark: "#a1a1a5",
  /* Fonts */
  fontMain: `"Roboto"`,                       // Main Font
  fontPosts: `"Open Sans"`,                   // Font inside posts
  fontProfile: `'Oxanium'`,                   // Font inside profile & title in header
  fontCodeBlocks: `Menlo, Monaco, monospace`, // Font for code blocks
  darkColor: "#333",
  midColor: "#444",
  darkerColor: "#313143",
  subColor: "grey",
  lightGreyColor: "#eee",
  midGreyColor: "#ccc",
  mintColor: "#bfe2ca",

  // @mixin disable-selection()
  disableSelection: `-webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;`,
  curTheme: "dark",

  breakCodeLines: true,
}

// global variables are passed down to themes to be used in other styled components
export const theme = {
  ...globalVar,
}

// Sets variables for light and dark theme
export const setThemeVars = (lightVar, darkVar) => {
  return theme.curTheme === "light" ? lightVar : darkVar
}

let profileHomeBorder = () => setThemeVars("#ddd", "#333")
if (isMobile) profileHomeBorder = "transparent"

const glowing = keyframes`
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
`

export const foregroundColor = () =>
  setThemeVars(theme.fontColorLight, theme.fontColorDark)

export const backgroundColor = () => setThemeVars(theme.bgColorLight, theme.bgColorDark);

export const secondaryBackgroundColor = () =>
  setThemeVars(theme.bgSubColorLight, theme.bgSubColorDark);

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: background 250ms ease-in, border 250ms ease-in;
  }

  body {
    align-items: center;
    background: ${backgroundColor};
    color: ${foregroundColor};
    font-family: ${theme.fontMain + theme.fontsBackUp};

    --background-color: ${backgroundColor};
  }

  .themed-bg-color {
    background: ${backgroundColor};
  }

  header,
  footer {
    color: ${foregroundColor};
  }

  h1,
  h2,
  h3,
  h4,
  a {
    color: ${foregroundColor};
  }

  a {
    text-decoration: none;
  }


  .main-header {
    border-bottom: 1px solid ${() => setThemeVars("#dbdbdb", "#2d2d2d")};
    background: ${() =>
    setThemeVars(theme.headerColorLight, theme.headerColorDark)};
  }

  .sub-main {
    -webkit-box-shadow: 0px 0px 8px -5px ${() =>
    setThemeVars("#000000bf", "#000000bf")};
    -moz-box-shadow: 0px 0px 8px -5px ${() =>
    setThemeVars("#000000bf", "#000000bf")};
    box-shadow: 0px 0px 8px -5px ${() =>
    setThemeVars("#000000bf", "#000000bf")};

    background: ${secondaryBackgroundColor}
    
  }

  .profile-home {
    border-bottom: 1px solid ${profileHomeBorder};
  }

  .profile-image-inner-inner{
    background: ${secondaryBackgroundColor}
  }

  .profile-texts {
    h4, p, p > a {
      color: ${() =>
    setThemeVars(theme.fontSubColorLight, theme.fontSubColorDark)};
    }
  }

  .icon-fa {
    margin: 0 0.3rem;
    &-link {
      opacity: 0.8;
      :hover {
        opacity: 1;
      }
    }
  }

  .post-bg-color {
    background: ${secondaryBackgroundColor}
  }

  .img-not-gatsby-remark {
    max-width: 100%;
    display:block;
    margin: 0.35rem auto !important;
  }


  .main-card-name {
    h2 {
      border: none;
      outline: none;
      cursor: pointer;
      position: relative;
      z-index: 0;
      border-radius: 10px;

      :before {
        content: '';
        background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
        position: absolute;
        top: -2px;
        left:-2px;
        background-size: 400%;
        z-index: -1;
        filter: blur(1px);
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        animation: ${glowing} 28s linear infinite;
        opacity: ${() => setThemeVars("0.2", "0.12")};
        transition: opacity .3s ease-in-out;
        border-radius: 10px;
      }
      :active {
        color: #000
      }
      :active:after {
        background: transparent;
      }
      :hover:before {
        opacity: 0.6;
      }
      :after {
        z-index: -1;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border-radius: 10px;
      }
    }
  }

  .main-footer {
    color: ${() => setThemeVars("#ccc", theme.subColor)};
    border-top: 1px solid ${() =>
    setThemeVars(theme.lightGreyColor, theme.darkColor)};
    a {
      ${() => setThemeVars(theme.darkColor, theme.primaryColor)};
    }
  }

  .post-main {
    blockquote {
      color: ${() =>
    setThemeVars(theme.fontSubColorLight, theme.fontSubColorDark)};
      border-left: 3px solid ${() =>
    setThemeVars(theme.midGreyColor, theme.midColor)};
    }
  }

    /* Anchor next to headings */
  a.anchor-heading {
    svg {
      fill: ${() => setThemeVars(theme.darkColor, theme.primaryColor)};
    }
  }

  .tags {
    &-horizontal {
      -webkit-box-shadow: 0px 0px 7px -5px ${() =>
    setThemeVars("#000000bf", "#000000bf")};
      -moz-box-shadow: 0px 0px 7px -5px ${() =>
    setThemeVars("#000000bf", "#000000bf")};
      box-shadow: 0px 0px 7px -5px ${() =>
    setThemeVars("#000000bf", "#000000bf")};

      background: ${() => setThemeVars("#f5f5f5", theme.headerColorDark)};
      border-left: 3px solid ${() => setThemeVars("#bbb", "#444")};
      border-right: 3px solid ${() => setThemeVars("#bbb", "#444")};
      border-top: 1px solid ${() => setThemeVars("#eee", "#333")};
      border-bottom: 1px solid ${() => setThemeVars("#eee", "#333")};
      color: ${() => setThemeVars("#888", "#c9c9c9")}
    }
  }
  
  .custom-hr {
    border-top-color: ${() => setThemeVars("#ccc", "#555")};
  }

  .icon-hand-ptr {
    color: ${() => setThemeVars("#555", "#eee")}
  }

  .medium-zoom-overlay {
    z-index: 4;
  }
  .medium-zoom-image--opened {
    z-index: 5;
  }
  
  table {
    display: block;
    font-family: sans-serif;
    margin: 0.5rem 0;
    width: 100%;
    border-collapse: collapse;
    overflow-x: auto;
    & + table {
      margin-top: 1rem;
    }
  }
  
  thead {
    background: ${() => setThemeVars("#eee", "#343434")};
    border-bottom: 2px solid ${() => setThemeVars("#ddd", "#444")};
  }

  th {
    padding: 0.5rem;
    font-weight: bold;
    text-align: left;
  }

  td {
    padding: 0.5rem;
    border-bottom: 1px solid ${() => setThemeVars("#ddd", "#444")};
  }

  tr,
  td,
  th {
    vertical-align: middle;
  }
`

// Code block stylings based on main theme
const bgColor = () => setThemeVars("#f6f8fa", "#2d323e")
const bgColorBorder = () => setThemeVars("#e8e6ef", "#43485f")
const base0 = () => setThemeVars("#000", "#ddd")
const base1 = () => setThemeVars("#d73a49", "#fa69e5")
const base2 = () => setThemeVars("#032f62", "#63fa83")
const base3 = () => setThemeVars("#6f42c0", "#f5ff98")
const base4 = () => setThemeVars("#005cc5", "#6ad7f9")
const base5 = () => setThemeVars("#5b581a", "#d2ceab")
const base6 = () => setThemeVars("#22863a", "#e48080")
const base99 = () => setThemeVars("#248537", "#63fa83") // Token inserted
const base98 = () => setThemeVars("#8e3232", "#e48080") // Token deleted
const inlineBg = () => setThemeVars("#f1f1f1", "#3b3948")
const inlineColor = () => setThemeVars("#de498d", "#ca6c9a")
const highlight = () => setThemeVars("#e7e8ec", "#353e50")
const selectionColor = () => setThemeVars("#ccf1fb", "#888598")
// Copy Button Colors
const copyBtnBg = () => setThemeVars("#efefef", "#3b3d46")
const copyBtnColor = () => setThemeVars("#9c9c9c", "#888598")
const copyBtnColorHover = () => setThemeVars("#111", "#b7b5bf")

export const CodeBlockStyles =
  // Light theme code blocks
  createGlobalStyle`
    .gatsby-highlight {
      background: ${bgColor};
      border: 1px solid ${bgColorBorder};
    }
    
    .gatsby-highlight-code-line {
      background-color: ${highlight};
    }

    code[class*="language-"],
    pre[class*="language-"],
    .code-title-custom {
      font-family: ${theme.fontCodeBlocks + theme.fontsBackUp};
      color: ${base0};
      white-space: ${theme.breakCodeLines ? "pre-wrap" : "pre"}
    }
    .token.class-name {
      color: ${base0};
    }

    .token.atrule,
    .token.keyword {
      color: ${base1};
    }

    .token.selector,
    .token.string,
    .token.char,
    .token.builtin,
    .token.url,
    .token.number,
    .token.attr-value {
      color: ${base2};
    }

    .token.inserted {
      color: ${base99};
    }
    .token.deleted {
      color: ${base98};
    }
    .token.attr-name {
      color: ${base3};
    }
    .token.function {
      color: ${base4};
    }
    .token.punctuation {
      color: ${base5};
    }
    .token.tag,
    .token.boolean,
    .token.constant,
    .token.symbol {
      color: ${base6};
    }

    /* Inline code block */
    :not(pre) > code[class*="language-"] {
      background: ${inlineBg};
      color: ${inlineColor};
    }

    pre[class*="language-"]::before {
      font-family: ${theme.fontCodeBlocks}
    }

    pre[class*="language-"]::-moz-selection,
    pre[class*="language-"] ::-moz-selection,
    code[class*="language-"]::-moz-selection,
    code[class*="language-"] ::-moz-selection {
      // background: ${selectionColor};
    }

    pre[class*="language-"]::selection,
    pre[class*="language-"] ::selection,
    code[class*="language-"]::selection,
    code[class*="language-"] ::selection {
      // background: ${selectionColor};
    }

    .btn-copy {
      background: ${copyBtnBg};
      color: ${copyBtnColor};
      &:hover {
        color: ${copyBtnColorHover}
      }
    }

    .code-title-custom {
      background: ${bgColor};
      border-top: 1px solid ${bgColorBorder};
      border-right: 1px solid ${bgColorBorder};
      border-left: 1px solid ${bgColorBorder};
      border-bottom: none;
    }
  `

export function UseTheme(defaultTheme = { mode: "dark" }) {
  const [themeState, _setTheme] = useState(getInitialTheme)

  // Get theme from local storage
  function getInitialTheme() {
    const savedTheme = storage.getItem("theme")
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme
  }

  // Store theme in local storage
  useEffect(() => {

  // Save to theme global variable
  theme.curTheme = themeState.mode;

    storage.setItem("theme", JSON.stringify(themeState));

  }, [themeState])


  // Save to theme global variable
  theme.curTheme = themeState.mode;

  return {
    ...themeState,
    setTheme: ({ setTheme, ...newTheme }) => _setTheme(newTheme),
  }
}
