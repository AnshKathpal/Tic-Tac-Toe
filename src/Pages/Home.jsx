import { useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import styled, { keyframes } from "styled-components";

import { Link } from "react-router-dom";

export const Home = () => {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);

  const handleClick1 = () => {
    setSelected1(!selected1);
    setSelected2(false);
  };

  const handleClick2 = () => {
    setSelected2(!selected2);
    setSelected1(false);
  };

  let initialColor = "white";

  return (
    <>
      <Flex
        gap="20"
        justify={"center"}
        direction="column"
        align="center"
        bg="#041C32"
        h="100vh"
      >
        <Flex gap="10" justifyContent={"center"}>
          <XImage
            src="https://s3.topgolf.com/uploads/icons/x.svg?resize.width=400&resize.height=400&resize.method=cover"
            alt=""
          />

          <OImage
            src="https://uxwing.com/wp-content/themes/uxwing/download/controller-and-music/number-zero-icon.png"
            alt=""
          />
        </Flex>

        <Flex
          borderRadius="20px"
          shadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"
          justify={"center"}
          align="center"
          w="35%"
          h="250px"
          bg="#133B5C"
          direction={"column"}
          gap="5"
        >
          <Text color="#FCDAB7" fontSize={"xl"} fontWeight="bold">
            Select Your's Mark
          </Text>

          <Box width="60%">
            <Button _hover={{ backgroundColor: "none" }} width = "50%" onClick={handleClick1} p = "8" bg= {selected1 ? initialColor : "#041C32"} >
              <Text
                fontFamily="'Permanent Marker', cursive"
                fontSize={"30px"}
                color={selected1 ? "#041C32" : initialColor}
              >
                X
              </Text>
            </Button>
            <Button
              _hover={{ backgroundColor: "none" }}
              p="8"
              width="50%"
              bg= {selected2 ? "white" : "#041C32"}
              onClick={handleClick2}
            >
              <Text
                fontFamily="'Permanent Marker', cursive"
                fontSize={"30px"}
                color={selected2 ? "#041C32" : initialColor}
              >
                0
              </Text>
            </Button>
          </Box>

          <Text color="#FCDAB7" fontSize={"l"}>
            Remember : X will play first
          </Text>
        </Flex>

        {selected1 || selected2 ? (
          <Link to="/game">
            <AnimatedButton bg="#FCDAB7" w="250px" p="7" fontSize={"24px"}>
              Start New Game
            </AnimatedButton>
          </Link>
        ) : null}
      </Flex>

      <Box>

      </Box>
    </>
  );
};

const xslide = keyframes`

0% {
      transform: translateX(-100px);
    }
    100% {
      transform: translateX(0px);
    }

`;

const oslide = keyframes`

0% {
      transform: translateX(100px);
    }
    100% {
      transform: translateX(0px);
    }

`;

const XImage = styled.img`
  filter: brightness(0) invert(1);
  width: 5%;
  animation: ${xslide} 2s ease-in-out;
`;

const OImage = styled.img`
  filter: brightness(0) invert(1);
  width: 5%;
  animation: ${oslide} 2s ease-in-out;
`;


const slideButton = keyframes`

`

const AnimatedButton  = styled(Button)`
  
animation : ${slideButton} 2s ease-in-out;



`