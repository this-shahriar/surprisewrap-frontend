import {
  Icon,
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
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Login } from "../../components/Login";
import { Registration } from "../../components/Registration";
import { ForgetPassword } from "../../components/ForgetPassword";
import { SearchBar } from "../../components/Search";
import { ProductSection } from "../../components/Products/ProductSection";
import { ProductsContext } from "../../contexts/ProductsContext";
import { Cart } from "../../components/Cart";
import { ProductMan } from "../../components/ProductMan";
import { FcInfo } from "react-icons/fc";
import { Footer } from "../../components/Footer";
import { GiftPackages } from "../../components/GiftPackages";

export const LandingPage = () => {
  const { pageMode, user, authModal, setAuthModal } = useContext(AuthContext);

  const {
    getProducts,
    visibleItems,
    cartModal,
    setCartModal,
    products,
    getGifts,
    gifts,
  } = useContext(ProductsContext);

  useEffect(() => {
    getProducts();
    getGifts();
  }, []);

  return (
    <VStack w="100%">
      <Header />
      {user?.role === "manager" ? (
        <ProductMan />
      ) : products?.length > 0 ? (
        <>
          <SearchBar />
          <ProductSection products={products} />
        </>
      ) : (
        <VStack opacity={0.6} pt="5rem">
          <Icon fontSize="1.4rem" as={FcInfo} />
          <Text fontSize="1rem">Empty</Text>
        </VStack>
      )}

      {user?.role != "manager" && <GiftPackages gifts={gifts} />}

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

      <Modal isOpen={cartModal} onClose={() => setCartModal(false)}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Authentication</ModalHeader> */}
          <ModalCloseButton />
          {/* <Divider /> */}
          <ModalBody p="2rem">
            <Cart />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Footer />
    </VStack>
  );
};
