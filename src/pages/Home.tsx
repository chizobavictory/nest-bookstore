import Navbar from "../components/Navbar";
import { Box, Text } from "@chakra-ui/react";
interface Book {
  id: number;
  title: string;
  description: string;
  author: string;
  link: string;
}
const Home = () => {
  return (
    <div>
      <Navbar onBookCreate={function (newBook: Book): void {
        throw new Error("Function not implemented.");
      } } />
      <Box padding="4" textAlign="center">
        <Text fontWeight="bold">Please log in to view the bookstore.</Text>
        <Box marginTop="4">
          <Text fontSize="md">
            This project is built using React, TypeScript, and Chakra UI for the frontend. The backend is developed with NestJS on TypeScript, hosted
            on Render, and includes email notifications for signup.
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
