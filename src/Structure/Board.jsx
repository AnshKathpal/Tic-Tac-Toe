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
    <Flex height="100vh" justify="center" align="center" bg = "#041C32" >
      {isWinner ? (
        isWinner === "draw" ? (
          <>It's a draw</>
        ) : (
          <> {isWinner} won the Game</>
        )
      ) : (
        <>
          <Grid
            gridTemplateColumns="repeat(3,1fr)"
            gap = "10px"
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
  display: flex;
  width : 200px;
  height : 200px;
  justify-content: center;
  align-items: center;
  background-color : #133B5C;
  border-radius : 15px;
font-family: 'Permanent Marker', cursive;
font-size : 48px;
color : white;
box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
`;
