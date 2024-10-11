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
import { useContext, useEffect } from "react";
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
import { ProductsContext } from "../../contexts/ProductsContext";
import { Cart } from "../../components/Cart";

export const LandingPage = () => {
  const { pageMode, setPageMode, authModal, setAuthModal } =
    useContext(AuthContext);

  const { setSearchIndex, visibleItems, cartModal, setCartModal } =
    useContext(ProductsContext);

  useEffect(() => {
    setSearchIndex([
      ...toys.map((item) => ({
        ...item,
        category: "toy",
        searchKey: `${item?.name?.toLowerCase()} toy`,
      })),
      ...flowersItems.map((item) => ({
        ...item,
        category: "flower",
        searchKey: `${item?.name?.toLowerCase()} flower`,
      })),
      ...warmClothItems.map((item) => ({
        ...item,
        category: "feel warm",
        searchKey: `${item?.name?.toLowerCase()} feel warm winter`,
      })),
      ...chocolates.map((item) => ({
        ...item,
        category: "chocolate",
        searchKey: `${item?.name?.toLowerCase()} chocolate`,
      })),
      ...houseDecor.map((item) => ({
        ...item,
        category: "home decoration",
        searchKey: `${item?.name?.toLowerCase()} home decoration house`,
      })),
    ]);
  }, []);

  return (
    <VStack w="100%">
      <Header />
      <SearchBar />
      {visibleItems ? (
        <ProductSection name="Results" products={visibleItems} />
      ) : (
        <>
          <ProductSection name="Toys for children" products={toys} />
          <ProductSection name="Flowers" products={flowersItems} />
          <ProductSection name="Feel warm" products={warmClothItems} />
          <ProductSection name="Chocolates" products={chocolates} />
          <ProductSection name="Home decoration" products={houseDecor} />
        </>
      )}

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
    </VStack>
  );
};
