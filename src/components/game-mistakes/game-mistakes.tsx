import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 225px;

  svg {
    margin: 0 2px;
  }
`;

export interface GameMistakesProps {
  /** Количество совершенных ошибок */
  mistakes: number;
}

function GameMistakes({mistakes}: GameMistakesProps) {
  return (
    <Wrapper>
      {Array
        .from({length: mistakes})
        .map((it, index) => (
          <svg key={index} width="35" height="49" fill="#cc2c2c">
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#note"/>
          </svg>
        ))}
    </Wrapper>
  );
}

export default GameMistakes;
