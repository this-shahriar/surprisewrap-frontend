import "./index.css";
import App from "./App";
import React from "react";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthContextProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = extendTheme({
  initialColorMode: "dark",
  fonts: { body: "DM Sans" },
});

root.render(
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </ChakraProvider>
  // </React.StrictMode>
);
