import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const toast = useToast(); // Toast hook

  const handleLogin = async () => {
    try {
      setIsLoading(true); // Set loading to true

      const response = await axios.post("https://nest-bookmarks-api.onrender.com/auth/login", {
        email,
        password,
      });

      console.log(response.data);
      const token = response.data.access_token;
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // Display success toast with the message from the backend
      toast({
        title: "Login Successful",
        description: response.data.message || "User login successful.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Call the onLoginSuccess callback
      onLoginSuccess();

      // Close the modal
      onClose();
    } catch (error: any) {
      console.error("Error during login:", error);

      // Display error toast with the message from the backend
      toast({
        title: "Login Error",
        description: error.response?.data.message || "An error occurred during login. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Set loading to false in both success and error cases
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleLogin} isLoading={isLoading}>
            {isLoading ? <Spinner size="sm" color="white" /> : "Login"}
          </Button>
          <Button onClick={onClose} isDisabled={isLoading}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
