import React, { useState } from "react";
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
  Spinner,
  useToast, // Import Spinner component
} from "@chakra-ui/react";
import axios from "axios";

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: {
    id: number;
    title: string;
    author: string;
    description: string;
    link: string;
  };
  onEdit: () => void;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ isOpen, onClose, book, onEdit }) => {
  const [description, setDescription] = useState(book.description);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [link, setLink] = useState(book.link);
  const [loading, setLoading] = useState(false); 
  const toast = useToast(); 
  const handleEditBook = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found. User may not be authenticated.");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);

      const response = await axios.patch(
        `https://nest-bookmarks-api.onrender.com/bookmarks/${book.id}`,
        {
          title,
          author,
          description,
          link,
        },
        config
      );

      console.log("Book edited successfully:", response.data);

      // Trigger the onEdit callback to update the state or perform other actions
      onEdit();

      // Display success toast
      toast({
        title: "Book edited successfully!",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error editing book:", error);

      // Display error toast
      toast({
        title: "Error editing book",
        description: "An error occurred while editing the book. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mt={4}>
            <FormLabel>Book Title</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Book Author</FormLabel>
            <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Link</FormLabel>
            <Input value={link} onChange={(e) => setLink(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleEditBook} isLoading={loading}>
            {loading ? <Spinner size="sm" /> : "Save"}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditBookModal;
