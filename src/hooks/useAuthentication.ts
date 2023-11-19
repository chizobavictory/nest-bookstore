import axios from "axios";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const useAuthentication = (onLoginSuccessCallback: () => void) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoginSuccessful, setLoginSuccessful] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isLoginSuccessful) {
      setLoginSuccessful(true);
      onLoginSuccessCallback();
    }
  }, [isLoginSuccessful, onLoginSuccessCallback]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post("https://nest-bookmarks-api.onrender.com/auth/login", {
        email,
        password,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setLoginSuccessful(true);
      onLoginSuccessCallback();
      toast({
        title: "Login successful!",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/books");
    } catch (error) {
      console.error("Error during login:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoginSuccessful(false);
    toast({
      title: "Logged out successfully!",
      description: "You have been logged out.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return {
    isLoginSuccessful,
    handleLogin,
    handleLogout,
  };
};

export default useAuthentication;
