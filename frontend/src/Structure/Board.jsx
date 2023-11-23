//! Imports
import { Box, Grid, Flex, Button, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Result } from "./Result";
import { Link } from "react-router-dom";
// import io from "socket.io-client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FiRotateCw } from "react-icons/fi";
import { Turn } from "./Turn";
//! Imports

// const socket = io.connect("http://localhost:8080");

export const Board = ({ room, socket }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //! States

  const [eachBox, setEachBox] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [playerTurn, setPlayerTurn] = useState("X");
  console.log(playerTurn, "Turn");

  const [countXWinner, setCountXWinner] = useState(0);
  const [count0Winner, setCount0Winner] = useState(0);
  const [countDraw, setCountDraw] = useState(0);

  const [isActivePlayer, setIsActivePlayer] = useState(true);

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  //! States

  //! Winner Logic
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
  //! Winner Logic

  //! Update Score
  const isWinner = winner();
  console.log(countXWinner, "X");
  console.log(count0Winner, "0");
  console.log(countDraw, "Draw");

  useEffect(() => {
    if (isWinner === "X") {
      setCountXWinner((prevCount) => prevCount + 1);
    } else if (isWinner === "0") {
      setCount0Winner((prevCount) => prevCount + 1);
    } else if (isWinner === "draw") {
      setCountDraw((prevCount) => prevCount + 1);
    }
  }, [isWinner]);
  //! Update Score

  const handleClick = (index) => {
    if (eachBox[index] != null || !isActivePlayer) {
      return;
    }

    const copyState = [...eachBox];
    copyState[index] = isXTurn ? "X" : "0"; 
    setEachBox(copyState);
    setIsXTurn(!isXTurn);

    console.log("Turnnn", copyState);

    let turn = isXTurn ? "X" : "0"; 
    setPlayerTurn(turn);

    setIsActivePlayer(false);
  
    socket.emit("make_move", { index, symbol: turn, room });
  };

  useEffect(() => {
    // ... (existing code)
  
    socket.on("move_made", ({ index, symbol }) => {
      const copyState = [...eachBox];
      copyState[index] = symbol;
      setEachBox(copyState);
      setIsXTurn(symbol === "0");
      setPlayerTurn(symbol === "0" ? "X" : "0");
      setIsActivePlayer(true);
    });
  
    // ... (existing code)
  
  }, [eachBox]);

  const handleRestart = () => {
    onOpen();
  };

  const handleReset = () => {
    onClose();
    setEachBox(Array(9).fill(null));
    setIsXTurn(true);
    setPlayerTurn("X");
    setCountXWinner(0);
    setCountDraw(0);
    setCount0Winner(0);


    socket.emit("restart_game", { room });
  };

  const handleRound = () => {
    setEachBox(Array(9).fill(null));
    setPlayerTurn("X");
    setIsXTurn(true);
  };


  useEffect(() => {
    // ... (existing code)
  
    socket.on("game_won", (winnerSymbol) => {
      if (winnerSymbol === "X") {
        setCountXWinner(countXWinner + 1);
      } else if (winnerSymbol === "0") {
        setCount0Winner(count0Winner + 1);
      }
    });
  
    socket.on("game_draw", () => {
      setCountDraw((prevCount) => prevCount + 1);
    });
  
    // ... (existing code)
  
  }, []);
  
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  console.log(room);

  return (
    <Flex
      height="100vh"
      justify="center"
      align="center"
      bg="#041C32"
      pos="relative"
    >
      <Box
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <Button onClick={sendMessage}>Send Message</Button>

        <Text color="white" mt="20px">
          {messageReceived}
        </Text>
      </Box>

      {isWinner &&
        (isWinner === "draw" ? (
          <Result onClick={handleRound} text={"It's a Draw"} />
        ) : (
          <Result onClick={handleRound} text={`${isWinner} won the Game`} />
        ))}

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
            <Text color="#FCDAB7">{playerTurn}'s Turn</Text>
          </Flex>

          <Button
            color={"#FCDAB7"}
            bg="#133b5c"
            fontSize={"40px"}
            onClick={handleRestart}
            width="15%"
            h="100%"
            isDisabled = {!isActivePlayer}
          >
            <FiRotateCw />
          </Button>

          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent
              borderRadius={"20px"}
              maxWidth="85%"
              h="250px"
              bg="#1E5F74"
            >
              <ModalBody
                display={"flex"}
                justifyContent="center"
                alignItems="center"
              >
                <Text
                  color="#FCDAB7"
                  fontSize="48px"
                  fontFamily="'Permanent Marker', cursive"
                >
                  Do you really want to Restart?
                </Text>
              </ModalBody>
              <ModalFooter
                display={"flex"}
                justifyContent="center"
                alignItems={"center"}
                gap="100px"
              >
                <Button
                  _hover={{ backgroundColor: "#9bc8ca" }}
                  bg="#A5C9CA"
                  fontSize={"35px"}
                  onClick={onClose}
                >
                  No, Resume.
                </Button>
                <Button
                  _hover={{ backgroundColor: "#c08b36" }}
                  bg="#C69749"
                  fontSize={"35px"}
                  onClick={handleReset}
                >
                  Yes, Restart
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
            <Text color={"#FCDAB7"}>
              {" "}
              <div style={{ fontSize: "28px" }}>X Won</div>
              {countXWinner}
            </Text>
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
            <Text color={"#FCDAB7"}>
              <div style={{ fontSize: "28px" }}>Draws</div> {countDraw}{" "}
            </Text>
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
            <Text color={"#FCDAB7"}>
              <div style={{ fontSize: "28px" }}>0 Won</div> {count0Winner}{" "}
            </Text>
          </Flex>
        </Flex>
      </Flex>
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
`
;
