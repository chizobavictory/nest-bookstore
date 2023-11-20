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
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: {
    id: number;
    title: string;
    description: string;
    author: string;
    link: string;
  };
  onBookCreate: (newBook: { id: number; title: string; description: string; author: string; link: string }) => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, book, onBookCreate }) => {
  const toast = useToast(); // Toast hook
  const location = useLocation();
  const navigate = useNavigate();

  const [dto, setDto] = useState({
    title: book.title,
    author: book.author,
    description: book.description,
    link: book.link,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateBookmark = async () => {
    try {
      setIsLoading(true);

      // Retrieve the token from local storage
      const token = localStorage.getItem("token");

      // Check if the token exists
      if (!token) {
        console.error("Token not found. User may not be authenticated.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "https://nest-bookmarks-api.onrender.com/bookmarks",
        dto, // Send only the bookmark information
        config
      );
      onBookCreate({
        id: response.data.id,
        title: dto?.title,
        description: dto.description,
        author: dto.author,
        link: dto.link,
      });
      toast({
        title: "Bookmark Created",
        description: response.data.message || "Bookmark created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      if (location.pathname !== "/books") {
        navigate("/books");
      }
    } catch (error) {
      console.error("Error creating bookmark:", error);
    } finally {
      setIsLoading(false);
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
          <Button colorScheme="blue" mr={3} onClick={handleCreateBookmark} isLoading={isLoading}>
            {isLoading ? <Spinner size="sm" /> : "Create Bookmark"}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBookModal;
