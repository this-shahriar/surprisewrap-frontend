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
import { ForgetPassword } from "../../components/ForgetPassword";
import { SearchBar } from "../../components/Search";
import { ProductSection } from "../../components/Products/ProductSection";
import {
  chocolates,
  flowersItems,
  houseDecor,
  toys,
  warmClothItems,
} from "../../components/Products/dummy";

export const LandingPage = () => {
  const { pageMode, setPageMode, authModal, setAuthModal } =
    useContext(AuthContext);

  return (
    <VStack w="100%">
      <Header />
      <SearchBar />
      <ProductSection name="Toys for children" products={toys} />
      <ProductSection name="Flowers" products={flowersItems} />
      <ProductSection name="Feel warm" products={warmClothItems} />
      <ProductSection name="Chocolates" products={chocolates} />
      <ProductSection name="Home decoration" products={houseDecor} />

      <Modal isOpen={authModal} onClose={() => setAuthModal(false)}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Authentication</ModalHeader> */}
          <ModalCloseButton />
          {/* <Divider /> */}
          <ModalBody p="2rem">
            {pageMode === "login" ? (
              <Login />
            ) : pageMode === "registration" ? (
              <Registration />
            ) : pageMode === "forgotPassword" ? (
              <ForgetPassword />
            ) : (
              ""
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};
