// Books.tsx (New Component)
import React, { useState, useEffect } from "react";
import { Grid, Text } from "@chakra-ui/react";
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
  const onEdit = () => {};

  const onDelete = () => {};
  useEffect(() => {
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

    axios
      .get("https://nest-bookmarks-api.onrender.com/bookmarks", config)
      .then((response) => {
        console.log("API Response:", response.data);
        setBooks(response.data.bookmarks);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <>
      <Navbar />
      {Array.isArray(books) && books.length > 0 ? (
        <Grid templateColumns="repeat(2, 1fr)" gap="4" padding={4}>
          {books.map((book: Book) => (
            <Card key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </Grid>
      ) : (
        <Text>No books available</Text>
      )}
    </>
  );
};

export default Books;
