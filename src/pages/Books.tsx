import React, { useState, useEffect } from "react";
import { Grid, Text, Spinner, Center } from "@chakra-ui/react";
import axios from "axios";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  link: string;
}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const onEdit = (editedBook: Book) => {
    setBooks((prevBooks) => {
      return prevBooks.map((book) => (book.id === editedBook.id ? editedBook : book));
    });
  };

  const onDelete = (deletedBookId: number) => {
    setBooks((prevBooks) => {
      return prevBooks.filter((book) => book.id !== deletedBookId);
    });
  };

  const onBookCreate = (newBook: Book) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found. User may not be authenticated.");
      setLoading(false);
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("https://nest-bookmarks-api.onrender.com/bookmarks", config)
      .then((response) => {
        console.log("API Response:", response.data);
        setBooks(response.data.bookmarks);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar onBookCreate={onBookCreate} />
      {loading ? (
        <Center mt={8}>
          <Spinner size="xl" />
          <Text mt={4}>Loading your books...</Text>
        </Center>
      ) : Array.isArray(books) && books.length > 0 ? (
        <Grid templateColumns="repeat(2, 1fr)" gap="4" padding={4}>
          {books.map((book: Book) => (
            <Card key={book.id} book={book} onEdit={onEdit} onDelete={() => onDelete(book.id)} />
          ))}
        </Grid>
      ) : (
        <Center mt={8}>
          <Text>No books available</Text>
        </Center>
      )}
    </>
  );
};

export default Books;
