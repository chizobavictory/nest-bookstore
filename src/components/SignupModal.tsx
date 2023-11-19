import React, { useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupResponse, setSignupResponse] = useState<{ userId: number; access_token: string } | null>(null);
  const navigate = useNavigate();

  const toast = useToast();

  const handleSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post("https://nest-bookmarks-api.onrender.com/auth/signup", {
        email,
        password,
      });
      console.log(response.data);
      setSignupResponse({
        userId: response.data.userId,
        access_token: response.data.access_token,
      });
      toast({
        title: "Signup Successful",
        description: response.data.message || "Confirmation OTP sent to email. Confirm your account to login.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error("Error during signup:", error);
      toast({
        title: "Signup Error",
        description: error.response?.data.message || "An error occurred during signup. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignup = async () => {
    try {
      setLoading(true);
      const userId = signupResponse?.userId;

      if (!userId) {
        console.error("User ID not available.");
        return;
      }

      const confirmResponse = await axios.post("https://nest-bookmarks-api.onrender.com/auth/verify", {
        userId,
        otp,
      });
      console.log(confirmResponse.data);
      navigate("/books");
      onClose();
    } catch (error) {
      console.error("Error during signup confirmation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{signupResponse ? "Confirm Sign Up" : "Sign Up"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {signupResponse ? (
            <FormControl>
              <FormLabel>Confirmation OTP</FormLabel>
              <Input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
            </FormControl>
          ) : (
            <>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {signupResponse ? (
            <Button colorScheme="blue" mr={3} onClick={handleConfirmSignup} isLoading={loading}>
              {loading ? <Spinner size="sm" /> : "Confirm Sign Up"}
            </Button>
          ) : (
            <Button colorScheme="blue" mr={3} onClick={handleSignup} isLoading={loading}>
              {loading ? <Spinner size="sm" /> : "Sign Up"}
            </Button>
          )}
          <Button onClick={onClose} isDisabled={loading}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;
