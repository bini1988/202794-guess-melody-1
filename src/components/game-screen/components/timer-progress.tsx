import React from "react";
import {css} from "@emotion/core";

const wrapperCss = css`
  position: absolute;
  left: 8px;
  top: 56px;
  width: 665px;
  height: 665px;
  z-index: 0;
`;

export interface TimerProgressProps {
  /** Прогресс в процентах */
  progress?: number;
}

function TimerProgress({progress = 0}: TimerProgressProps) {
  const radius = 370;
  const strokeDasharray = 2 * Math.PI * radius;
  const strokeDashoffset = progress * strokeDasharray / 100;

  return (
    <svg css={wrapperCss} viewBox="0 0 780 780">
      <circle cx="390" cy="390" r={radius}
        style={{
          stroke: `#ff9749`,
          strokeWidth: `15px`,
          fill: `transparent`,
          filter: `url(#blur)`,
          strokeDasharray,
          strokeDashoffset,
          strokeLinecap: `round`,
          transform: `rotate(-90deg)`,
          transformOrigin: `center`
        }}/>
    </svg>
  );
}

export default TimerProgress;
