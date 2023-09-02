import { Box, Grid, Flex } from "@chakra-ui/react";
import { useState } from "react";
import styled from "styled-components";

import { Turn } from "./Turn";

export const Board = () => {
  const [eachBox, setEachBox] = useState(Array(9).fill(null));


  const [isXTurn, setIsXTurn] = useState(true)

  const handleClick = (index) => {

    const copyState = [...eachBox]
    copyState[index] = isXTurn ? "X" : "0"
    setEachBox(copyState)
    setIsXTurn(!isXTurn)

  };

  return (
    <Flex height="100vh" justify="center" align="center">
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
    </Flex>
  );
};

const InnerBox = styled.div`
  border: 1px solid red;

  &:hover {
    /* background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVf6Kja3k9ktWRCQcD29LPWz-ErnArr8p4Sw&usqp=CAU"); */
  }
`;
