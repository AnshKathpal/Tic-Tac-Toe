import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";

export const Result = ({ text, onClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"} maxWidth="80%" h="250px" bg="#1E5F74">
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
              {text}
            </Text>
          </ModalBody>
          <ModalFooter
            border="1px solid red"
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            gap = "100px"
          >
            <Link to="/">
              <Button onClick={onClose}>Quit</Button>
            </Link>
            <Button onClick={onClick}>Next Round</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
