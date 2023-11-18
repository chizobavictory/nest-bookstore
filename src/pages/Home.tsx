import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { Box, Grid, Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import AddBookModal from "../components/AddBookModal";

const Home = () => {
  const [books, setBooks] = useState([
    // Existing books...
  ]);

  const onEdit = () => {
    // Implement your edit logic here
  };

  const onDelete = () => {
    // Implement your delete logic here
  };

  const { isAuthenticated } = useAuth0();

  const handleBookCreate = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  return (
    <div>
      <Navbar />
      {!isAuthenticated ? (
        <Box>
          <Text>Please log in to view the bookstore.</Text>
        </Box>
      ) : (
        <>
          <AddBookModal onBookCreate={handleBookCreate} />

          <Grid templateColumns="repeat(2, 1fr)" gap="4" padding={4}>
            {books.map((book) => (
              <Card key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default Home;
