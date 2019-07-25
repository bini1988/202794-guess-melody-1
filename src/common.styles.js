import {css} from "@emotion/core";

export const fontFaces = css`
  @font-face {
    font-family: "Fira Sans";
    font-weight: 300;
    font-style: normal;
    font-display: swap;
    src:
      url("../fonts/FiraSans-Light.woff2") format("woff2"),
      url("../fonts/FiraSans-Light.woff") format("woff");
  }
  @font-face {
    font-family: "Fira Sans";
    font-weight: 300;
    font-style: italic;
    font-display: swap;
    src:
      url("../fonts/FiraSans-LightItalic.woff2") format("woff2"),
      url("../fonts/FiraSans-LightItalic.woff") format("woff");
  }
  @font-face {
    font-family: "Fira Sans";
    font-weight: 500;
    font-style: normal;
    font-display: swap;
    src:
      url("../fonts/FiraSans-Medium.woff2") format("woff2"),
      url("../fonts/FiraSans-Medium.woff") format("woff");
  }
  @font-face {
    font-family: "Fira Sans";
    font-weight: 500;
    font-style: italic;
    font-display: swap;
    src:
      url("../fonts/FiraSans-MediumItalic.woff2") format("woff2"),
      url("../fonts/FiraSans-MediumItalic.woff") format("woff");
  }
`;

export const body = css`
  html {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    background: #1d121f linear-gradient(90deg, #1d121f, #270a17);
  }
  body {
    font-family: "Fira Sans", "Arial", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    color: #230d1a;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    min-height: 1000px;
    background: url("../img/vinyl.png") center no-repeat;
  }
`;

export const img = css`
  img {
    max-width: 100%;
    height: auto;
  }
`;

export const hidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
`;
