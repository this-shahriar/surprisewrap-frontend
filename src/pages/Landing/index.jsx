import {
  Divider,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { ProductCard } from "../../components/Products/ProductCard";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Login } from "../../components/Login";
import { Registration } from "../../components/Registration";

export const LandingPage = () => {
  const { pageMode, setPageMode, authModal, setAuthModal } =
    useContext(AuthContext);

  return (
    <VStack w="100%">
      <Header />
      <Grid templateColumns={`repeat(5, 1fr)`}>
        <GridItem>
          <ProductCard />
        </GridItem>
        <GridItem>
          <ProductCard />
        </GridItem>
        <GridItem>
          <ProductCard />
        </GridItem>
        <GridItem>
          <ProductCard />
        </GridItem>
        <GridItem>
          <ProductCard />
        </GridItem>
        <GridItem>
          <ProductCard />
        </GridItem>
        <GridItem>
          <ProductCard />
        </GridItem>
        <GridItem>
          <ProductCard />
        </GridItem>
      </Grid>

      <Modal isOpen={authModal} onClose={() => setAuthModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Authentication</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody pb="1rem">
            {pageMode === "login" ? (
              <Login />
            ) : pageMode === "registration" ? (
              <Registration />
            ) : (
              ""
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};
