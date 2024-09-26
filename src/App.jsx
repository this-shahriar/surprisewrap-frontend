import { useContext } from "react";
import { useRoutes } from "react-router-dom";
// import { AuthContext } from "./Components/Modules/Auth/_context";
import { Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FcDataSheet } from "react-icons/fc";
import { PageNotFound } from "./pages/PageNotFound";
import { LandingPage } from "./pages/Landing";
import { Container } from "./components/Container";

const App = () => {
  // const { isLoggedIn, logout } = useContext(AuthContext);
  const routing = useRoutes([
    { path: "*", element: <PageNotFound /> },
    { path: "/", element: <LandingPage /> },
  ]);

  return (
    <Container>
      <VStack
        w="100%"
        h="100vh"
        spacing={0}
        display="flex"
        overflow="hidden"
        alignItems="start"
      >
        {routing}
      </VStack>
    </Container>
  );
};

export default App;
