import React, { useState } from "react";
import { Box, Button, Input, Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";

interface ImageUploadButtonProps {
  onUpload: (imageUrl: string) => void;
  bookmarkId: number;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ onUpload, bookmarkId }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUploadClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found. User may not be authenticated.");
      return;
    }

    if (selectedFile) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);

        const imageUploadResponse = await axios.post(`https://nest-bookmarks-api.onrender.com/bookmarks/${bookmarkId}/upload-image`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const imageUrl = imageUploadResponse.data.imageUrl;
        onUpload(imageUrl);
        console.log("Image uploaded successfully:", imageUrl);

        // Display response.message in toast for success
        toast({
          title: "Success",
          description: imageUploadResponse.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        window.location.reload();
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 12000);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast({
          title: "Error Uploading Image",
          description: "There was an error uploading the image. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Box mb="2" position="relative" display="inline-block">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          opacity="0"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          cursor="pointer"
        />
        <Button
          as="label" // Use the Button component as a label
          htmlFor="file-input" // Match the htmlFor with the Input's id
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={handleUploadClick}
          borderWidth="1px"
          borderRadius="md"
          borderColor="gray.300"
          backgroundColor="white"
          zIndex="1"
          cursor="pointer"
        >
          {loading ? <Spinner size="sm" color="gray.800" /> : "Upload Image"}
        </Button>
      </Box>
    </div>
  );
};

export default ImageUploadButton;
