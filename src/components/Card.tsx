import React, { useState } from "react";
import { Text, Button, Flex, Box } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import DeleteBookModal from "./DeleteBookModal";
import EditBookModal from "./EditBookModal";
import { Book } from "../types";
import ImageUploadButton from "./ImageUploadButton";

interface CardProps {
  book: {
    id: number;
    title: string;
    author: string;
    description: string;
    link: string;
    images?: string[];
  };
  onEdit: (editedBook: Book) => void;
  onDelete: () => void;
  onUpload: (imageUrl: string) => void;
  imageUrl: string[];
}

const Card: React.FC<CardProps> = ({ book, onEdit, onDelete, onUpload, imageUrl }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const cardStyles = {
    borderWidth: "1px",
    borderRadius: "lg",
    overflow: "hidden",
    p: "2",
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <Box {...cardStyles}>
      <Text fontSize="xl" fontWeight="bold" mb="2">
        {book.title}
      </Text>
      <Text>Author: {book.author}</Text>
      <Text>Description: {book.description}</Text>
      <Text>Link: {book.link}</Text>

      <Flex mt="2">
        <ImageUploadButton onUpload={onUpload} bookmarkId={book.id} />

        <Button onClick={handleEditClick} marginRight="2">
          <EditIcon />
        </Button>
        <Button onClick={handleDeleteClick}>
          <DeleteIcon />
        </Button>
      </Flex>

      {Array.isArray(imageUrl)
        ? imageUrl.map((url, index) => (
            <img key={index} src={url} alt={`Book Cover ${index}`} style={{ width: "100%", height: "auto", marginTop: "8px" }} />
          ))
        : imageUrl && <img src={imageUrl} alt="Book Cover" style={{ width: "100%", height: "auto" }} />}
        
      {isEditModalOpen && <EditBookModal isOpen={isEditModalOpen} onClose={closeEditModal} book={book} onEdit={onEdit} />}

      {isDeleteModalOpen && <DeleteBookModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onDelete={onDelete} bookId={book.id} />}
    </Box>
  );
};

export default Card;
