import { Box, Grid, Flex } from "@chakra-ui/react";
import { useState } from "react";
import styled from "styled-components";

import { Turn } from "./Turn";

export const Board = () => {
  const [eachBox, setEachBox] = useState(Array(9).fill(null));

  const [isXTurn, setIsXTurn] = useState(true);

  const winner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (
        eachBox[a] != null &&
        eachBox[a] === eachBox[b] &&
        eachBox[b] === eachBox[c]
      ) {
        return eachBox[a];
      }
    }

    if (eachBox.every((square) => square !== null)) {
      return "draw";
    }

    return false;
  };

  const isWinner = winner();

  const handleClick = (index) => {
    if (eachBox[index] != null) {
      return;
    }

    const copyState = [...eachBox];
    copyState[index] = isXTurn ? "X" : "0";
    setEachBox(copyState);
    setIsXTurn(!isXTurn);
  };

  return (
    <Flex height="100vh" justify="center" align="center">
      {isWinner ? (
        isWinner === "draw" ? (
          <>It's a draw</>
        ) : (
          <> {isWinner} won the Game</>
        )
      ) : (
        <>
          <Grid
            border="1px solid black"
            gridTemplateColumns="repeat(3,1fr)"
            width="600px"
            height="600px"
          >
            <InnerBox onClick={() => handleClick(0)}>
              <Turn value={eachBox[0]} />
            </InnerBox>
            <InnerBox onClick={() => handleClick(1)}>
              <Turn value={eachBox[1]} />
            </InnerBox>
            <InnerBox onClick={() => handleClick(2)}>
              <Turn value={eachBox[2]} />
            </InnerBox>
            <InnerBox onClick={() => handleClick(3)}>
              <Turn value={eachBox[3]} />
            </InnerBox>
            <InnerBox onClick={() => handleClick(4)}>
              <Turn value={eachBox[4]} />
            </InnerBox>
            <InnerBox onClick={() => handleClick(5)}>
              <Turn value={eachBox[5]} />
            </InnerBox>
            <InnerBox onClick={() => handleClick(6)}>
              <Turn value={eachBox[6]} />
            </InnerBox>
            <InnerBox onClick={() => handleClick(7)}>
              <Turn value={eachBox[7]} />
            </InnerBox>
            <InnerBox onClick={() => handleClick(8)}>
              <Turn value={eachBox[8]} />
            </InnerBox>
          </Grid>
        </>
      )}
    </Flex>
  );
};

const InnerBox = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
