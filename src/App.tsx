import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import Books from "./pages/Books";
function App() {
  return (
    <ChakraProvider>
      <div>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="books" element={<Books />} />
          </Route>
          
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
