import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../App.css"

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
    Box
  } from '@chakra-ui/react'

export const Result = ({text}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()


    useEffect(() => {
      onOpen()
    },[onOpen])

  return (
<Box w = "100%" h = "100vh">


      <Modal  onClose={onClose} isOpen={isOpen} isCentered>
        {/* <ModalOverlay /> */}
        <ModalContent maxWidth="70%" h = "200px" bg = "#1E5F74" >
          <ModalBody display={"flex"} justifyContent = "center" alignItems="center" >
           <Text color = "#FCDAB7" fontSize="48px" fontFamily="'Permanent Marker', cursive" >
            {text}
           </Text>
          </ModalBody>
          {/* <ModalFooter>
            <Link to = "/game">
            <Button onClick={onClose}>Close</Button>
            </Link>
          </ModalFooter> */}
        </ModalContent>
      </Modal>

</Box>
  )
}
