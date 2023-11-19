import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, useToast, Spinner } from "@chakra-ui/react";
import axios from "axios";

interface DeleteBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (bookId: number) => void;
  bookId: number; 
}

const DeleteBookModal: React.FC<DeleteBookModalProps> = ({ isOpen, onClose, onDelete, bookId }) => {
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();

  const confirmDelete = async () => {
    try {
      setLoading(true);
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

      const response = await axios.delete(`https://nest-bookmarks-api.onrender.com/bookmarks/${bookId}`, config);
      console.log("delete response:", response.data);
      toast({
        title: "Book deleted successfully!",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onDelete(bookId);
      onClose();
    } catch (error) {
      console.error("Error deleting book:", error);

      // Display error toast with the response message
      toast({
        title: "Error deleting book",
        description:"An error occurred while deleting the book. Please try again.",
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
        <ModalHeader>Delete Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this book?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={confirmDelete} isLoading={loading}>
            {loading ? <Spinner size="sm" /> : "Delete"}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBookModal;
