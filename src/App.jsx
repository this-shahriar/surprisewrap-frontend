import { useContext } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import { PageNotFound } from "./pages/PageNotFound";
import { LandingPage } from "./pages/Landing";
import { Container } from "./components/Container";
import { ProductsContextProvider } from "./contexts/ProductsContext";
import { AuthContext } from "./contexts/AuthContext";
import { Orders } from "./pages/Orders";
import { OrdersContextProvider } from "./contexts/OrdersContext";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const routing = useRoutes([
    { path: "*", element: <PageNotFound /> },
    { path: "/", element: <LandingPage /> },
    {
      path: "/orders",
      element: isLoggedIn ? <Orders /> : <Navigate to="/" />,
    },
  ]);

  return (
    <Container>
      <ProductsContextProvider>
        <OrdersContextProvider>
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
        </OrdersContextProvider>
      </ProductsContextProvider>
    </Container>
  );
};

export default App;
