import { Box, Grid, Flex } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";

export const Board = () => {
  return (
    <Flex height="100vh" justify="center" align="center">
      <Grid
        border="1px solid black"
        gridTemplateColumns="repeat(3,1fr)"
        width="600px"
        height="600px"
      >
        <InnerBox></InnerBox>
        <InnerBox></InnerBox>
        <InnerBox></InnerBox>
        <InnerBox></InnerBox>
        <InnerBox></InnerBox>
        <InnerBox></InnerBox>
        <InnerBox></InnerBox>
        <InnerBox></InnerBox>
        <InnerBox></InnerBox>
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
