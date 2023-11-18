import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: {
    id: number;
    name: string;
    description: string;
    author: string;
    link: string;
  };
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, book }) => {
  const [dto, setDto] = useState({
    title: book.name,
    author: book.author,
    description: book.description,
    link: book.link,
  });

  const handleCreateBookmark = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");

      // Check if the token exists
      if (!token) {
        console.error("Token not found. User may not be authenticated.");
        return;
      }

      // Include the token in the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the API request with the token
      const response = await axios.post(
        "https://nest-bookmarks-api.onrender.com/bookmarks",
        dto, // Send only the bookmark information
        config
      );

      console.log(response.data.message);
    } catch (error) {
      console.error("Error creating bookmark:", error);
    }

    // Clear the input fields and close the modal
    setDto({
      title: "",
      author: "",
      description: "",
      link: "",
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Bookmark</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Bookmark Title</FormLabel>
            <Input value={dto.title} onChange={(e) => setDto({ ...dto, title: e.target.value })} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Author</FormLabel>
            <Input value={dto.author} onChange={(e) => setDto({ ...dto, author: e.target.value })} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input value={dto.description} onChange={(e) => setDto({ ...dto, description: e.target.value })} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Link</FormLabel>
            <Input value={dto.link} onChange={(e) => setDto({ ...dto, link: e.target.value })} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreateBookmark}>
            Create Bookmark
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBookModal;
