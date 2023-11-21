import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Book } from "../types";
import chakra from "../assets/chakraui.svg";
import nest from "../assets/nestjs-light.svg";
import postgresql from "../assets/postgresql.svg";
import prisma from "../assets/prisma.svg";
import react from "../assets/react.svg";
import typescript from "../assets/typescript.svg";
import render from "../assets/render.svg";
import netlify from "../assets/netlify.svg";
import cloudinary from "../assets/cloudinary-icon.svg";

const Home = () => {
  return (
    <div>
      <Navbar
        onBookCreate={(newBook: Book): void => {
          throw new Error("Function not implemented.");
        }}
      />
      <Box padding="4" textAlign="center">
        <Text fontWeight="bold">Please log in to view the bookstore.</Text>
        <Box marginTop="4">
          <Text fontSize="md">
            This project is built using React, TypeScript, and Chakra UI for the frontend.Hosted on Netlify, the frontend is a static site
            <br />
            <br />
            The backend is developed with NestJS on TypeScript, the database is Postgres, and the ORM used is Prisma. I hosted the database and
            backend on Render, and includes email notifications for signup. Images are saved on Cloudinary.
          </Text>
        </Box>

        {/* Flex for Centered Icons */}
        <Flex justifyContent="center" alignItems="center" marginTop={4}>
          <Box mx={2} textAlign="center">
            <img src={chakra} alt="Chakra UI" />
          </Box>
          <Box mx={2} textAlign="center">
            <img src={react} alt="React" />
          </Box>
          <Box mx={2} textAlign="center">
            <img src={typescript} alt="TypeScript" />
          </Box>
          <Box mx={2} textAlign="center">
            <img src={netlify} alt="TypeScript" />
          </Box>
          <Box mx={2} textAlign="center">
            <img src={nest} alt="NestJS" />
          </Box>
          <Box mx={2} textAlign="center">
            <img src={postgresql} alt="PostgreSQL" />
          </Box>
          <Box mx={2} textAlign="center">
            <img src={prisma} alt="Prisma" />
          </Box>
          <Box mx={2} textAlign="center">
            <img src={render} alt="render" />
          </Box>
          <Box mx={2} textAlign="center">
            <img src={cloudinary} alt="cloudinary" />
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default Home;
