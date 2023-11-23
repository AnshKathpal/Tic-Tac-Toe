import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
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
              {text}
            </Text>
          </ModalBody>
          <ModalFooter
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            gap="100px"
          >
            <NavLink to="/">
              <Button
                _hover={{ backgroundColor: "#9bc8ca" }}
                bg="#A5C9CA"
                fontSize={"35px"}
                onClick={onClose}
              >
                Quit
              </Button>
            </NavLink>
            <Button
              _hover={{ backgroundColor: "#c08b36" }}
              bg="#C69749"
              fontSize={"35px"}
              onClick={onClick}
            >
              Next Round
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
