// Home.tsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { Box, Grid, Text } from "@chakra-ui/react";
import axios from "axios";
import useAuthentication from "../hooks/useAuthentication";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  link: string;
}

const Home = () => {
  const auth = useAuthentication(() => {});

  const onEdit = () => {
    // Implement your edit logic here
  };

  const onDelete = () => {
    // Implement your delete logic here
  };

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    console.log("isLoginSuccessful:", auth.isLoginSuccessful);

    if (auth.isLoginSuccessful) {
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
    }
  }, [auth.isLoginSuccessful]);

  return (
    <div>
      <Navbar onLoginSuccessCallback={function (): void {
        throw new Error("Function not implemented.");
      } }/>

      {!auth.isLoginSuccessful ? (
        <Box>
          <Text>Please log in to view the bookstore.</Text>
        </Box>
      ) : (
        <>
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
      )}
    </div>
  );
};

export default Home;
