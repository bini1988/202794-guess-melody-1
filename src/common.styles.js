import {css, keyframes} from "@emotion/core";

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
  *, *::before, *::after {
    box-sizing: inherit;
  }
  html {
    line-height: inherit;
  }
  body {
    font-family: "Fira Sans", "Arial", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    color: #230d1a;
    margin: 0;
    padding: 0;
    width: 100%;
    background: #1d121f linear-gradient(90deg, #1d121f, #270a17);
  }
  .app {
    width: 100vw;
    height: 100vh;
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

export const container = css`
  width: 680px;
  margin: 0 auto;
`;

export const button = css`
  display: block;
  padding: 5px 20px;
  font-size: 24px;
  font-weight: 300;
  color: #230d1a;
  background-color: #f0eed5;
  border: 3px solid #000;
  border-radius: 15px;
  box-shadow: 5px 5px 15px -5px #000;
  cursor: pointer;

  transition: ease-in-out 350ms;

  &:disabled {
    color: #808080;
    border: 4px solid #ffc396;
    cursor: default;
  }
  &:hover, &:focus, &:active {
    color: #ff9749;
    border-color: #ff9749;
  }
`;

export const bounce = keyframes`
  0% { transform: translateY(-2000px); }
  70% { transform: translateY(30px); }
  90% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

export const waiting = keyframes`
  0% { transform: scale(0.95); }
  100% { transform: scale(1.05); }
`;

export const blink = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
`;

export const shrink = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;
