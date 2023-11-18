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
  Spinner, // Import Spinner component
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
  const [loading, setLoading] = useState(false); // New loading state

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

      // Set loading to true when the button is clicked
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

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error editing book:", error);
    } finally {
      // Set loading back to false when the request is complete (success or error)
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
