import { useContext } from "react";
import { useRoutes } from "react-router-dom";
// import { AuthContext } from "./Components/Modules/Auth/_context";
import { Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FcDataSheet } from "react-icons/fc";
import { PageNotFound } from "./pages/PageNotFound";
import { LandingPage } from "./pages/Landing";
import { Container } from "./components/Container";
import { ProductsContextProvider } from "./contexts/ProductsContext";

const App = () => {
  // const { isLoggedIn, logout } = useContext(AuthContext);
  const routing = useRoutes([
    { path: "*", element: <PageNotFound /> },
    { path: "/", element: <LandingPage /> },
  ]);

  return (
    <Container>
      <ProductsContextProvider>
        <VStack
          w="100%"
          minH="100vh"
          spacing={0}
          display="flex"
          overflowX="hidden"
          alignItems="start"
        >
          {routing}
        </VStack>
      </ProductsContextProvider>
    </Container>
  );
};

export default App;
