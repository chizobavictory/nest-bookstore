import React, { useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import AddBookModal from "./AddBookModal";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal"; // Import the SignupModal
import logo from "../assets/nestjs-light.svg";
import avatar from "../assets/profile-circle-fill.svg";
import useAuthentication from "../hooks/useAuthentication";

interface Props {
  children: React.ReactNode;
}
interface Book {
  id: number;
  name: string;
  description: string;
  author: string;
  link: string;
}

const Links = ["Signup", "Login", "Logout"];

const NavLink = (props: Props) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {props.children}
    </Box>
  );
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [, setBooks] = useState<Book[]>([]);

  const { isLoginSuccessful, handleLogout } = useAuthentication(() => {});

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <img src={logo} alt="logo" />
            </Box>
            <Text fontWeight="bold">Nest Book Store</Text>
          </HStack>
          <Flex alignItems={"center"}>
            {isLoginSuccessful && (
              <>
                <Button variant={"solid"} colorScheme={"teal"} size={"sm"} mr={4} leftIcon={<AddIcon />} onClick={() => setModalOpen(true)}>
                  Add Book
                </Button>
                <Button variant={"solid"} colorScheme={"orange"} size={"sm"} mr={4} onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            )}

            {isLoginSuccessful ? (
              <Menu>
                <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                  <Avatar size={"sm"} src={avatar} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Button variant={"solid"} colorScheme={"teal"} size={"sm"} mr={4} onClick={() => setSignupModalOpen(true)}>
                  Sign Up
                </Button>
                <Button variant={"solid"} colorScheme={"teal"} size={"sm"} mr={4} onClick={() => setLoginModalOpen(true)}>
                  Log In
                </Button>
              </>
            )}
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        book={{
          id: 0,
          name: "",
          description: "",
          author: "",
          link: "",
        }}
        onBookCreate={(newBook) => {
          setBooks((prevBooks) => [...prevBooks, newBook]);
        }}
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
      <SignupModal isOpen={isSignupModalOpen} onClose={() => setSignupModalOpen(false)} />
    </>
  );
};

export default Navbar;
