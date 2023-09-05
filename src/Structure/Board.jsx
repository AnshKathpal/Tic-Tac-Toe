import { Box, Grid, Flex, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import styled from "styled-components";
import { Result } from "./Result";
import { Link } from "react-router-dom";

import { Turn } from "./Turn";

export const Board = () => {
  const [eachBox, setEachBox] = useState(Array(9).fill(null));

  const [isXTurn, setIsXTurn] = useState(true);

  const [playerTurn, setPlayerTurn] = useState("X");

  console.log(playerTurn, "Turn");

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

    let turn = isXTurn ? "0" : "X";
    setPlayerTurn(turn);
  };

  const handleRestart = () => {
    setEachBox(Array(9).fill(null));
    setIsXTurn(true);
    setPlayerTurn("X");
  };

  return (
    <Flex height="100vh" justify="center" align="center" bg="#041C32">
      {isWinner ? (
        isWinner === "draw" ? (
          <Result text={"It's a Draw"} />
        ) : (
          <Result text={`${isWinner} won the Game`} />
        )
      ) : (
        <Flex justify={"center"} align="center" direction={"column"} gap="45px">
          <Flex width="100%" h="70px" justify={"space-between"}>
            <Flex
              width="170px"
              shadow=" rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
              bg="#133b5c"
              color="white"
              borderRadius={"15px"}
              justify="center"
              align={"center"}
              fontSize="40px"
            >
              <Text>{playerTurn}'s Turn</Text>
            </Flex>

            <Button onClick={handleRestart} width="15%" h="100%"></Button>
          </Flex>

          <Grid gridTemplateColumns="repeat(3,1fr)" gap="15px">
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

          <Flex width="100%" h="100px" justify={"space-between"}>
            <Flex
              width="170px"
              shadow=" rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
              bg="#133b5c"
              color="white"
              borderRadius={"15px"}
              justify="center"
              align={"center"}
              fontSize="40px"
            >
              <Text>X Won : </Text>
            </Flex>
            <Flex
              width="170px"
              shadow=" rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
              bg="#133b5c"
              color="white"
              borderRadius={"15px"}
              justify="center"
              align={"center"}
              fontSize="40px"
            >
              <Text>Draws : </Text>
            </Flex>
            <Flex
              width="170px"
              shadow=" rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
              bg="#133b5c"
              color="white"
              borderRadius={"15px"}
              justify="center"
              align={"center"}
              fontSize="40px"
            >
              <Text>0 Won : </Text>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

const InnerBox = styled.div`
  display: flex;
  width: 170px;
  height: 170px;
  justify-content: center;
  align-items: center;
  background-color: #133b5c;
  border-radius: 15px;
  font-family: "Permanent Marker", cursive;
  font-size: 55px;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;
