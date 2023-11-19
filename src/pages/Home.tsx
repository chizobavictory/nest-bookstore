import Navbar from "../components/Navbar";
import { Box, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <div>
      <Navbar />
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
