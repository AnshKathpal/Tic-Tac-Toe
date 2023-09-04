import { useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";

import { Link } from "react-router-dom";



export const Home = () => {  
  

const [selected,setSelected] = useState(false)

  return (
    <>
      <Flex gap = "20" justify={"center"} direction = "column" align="center" bg="#1D2D50" h="100vh">

<Box border="1px solid red" w = "5%">
<img  style={{filter:" brightness(0) invert(1)"}} src="https://s3.topgolf.com/uploads/icons/x.svg?resize.width=400&resize.height=400&resize.method=cover" alt="" />
</Box>
<Box border="1px solid red" w = "5%">
<img style={{filter:" brightness(0) invert(1)"}} src="https://uxwing.com/wp-content/themes/uxwing/download/controller-and-music/number-zero-icon.png" alt="" />
</Box>

        <Flex borderRadius="20px" shadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;" justify={"center"} align="center" w="30%" h="200px" bg="#133B5C">
          <Button p = "7" width="30%" bg="#041C32">
            <Text fontSize={"30px"} color="white">
              X
            </Text>
          </Button>
          <Button p = "7" width="30%" bg="#041C32">
            <Text fontSize={"30px"} color="white">
              0
            </Text>
          </Button>
        </Flex>


<Link to = "/game">
        <Button bg = "#FCDAB7" w = "250px" p = "7" fontSize={"24px"} >New Game</Button>
</Link>


      </Flex>



    </>
  );
};
