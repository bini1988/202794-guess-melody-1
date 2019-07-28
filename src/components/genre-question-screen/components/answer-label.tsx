import React from "react";
import styled from "@emotion/styled";
import * as Styles from "../../../common.styles";

const Label = styled.label`
  width: 35px;
  height: 49px;
  cursor: pointer;
  fill: #666666;
  transition: fill ease-in-out 250ms;

  & > svg {
    filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.2));
  }
`;

export interface AnswerLabelProps {
  /** Текст лейбла */
  text?: string;
  /** id элемента к которому относится лейбл */
  htmlFor?: string;
}

function AnswerLabel({text, ...props}: AnswerLabelProps) {
  return (
    <Label {...props}>
      <span css={Styles.hidden}>
        {text}
      </span>
      <svg width="35" height="49">
        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#note"/>
      </svg>
    </Label>
  );
}

export {Label};
export default AnswerLabel;

