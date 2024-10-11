import {
  Avatar,
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import sw from "../../../public/surprisewrap.svg";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { MdOutlineDarkMode, MdOutlineShoppingCart } from "react-icons/md";
import { ProductsContext } from "../../contexts/ProductsContext";

export const Header = () => {
  const { setAuthModal, isLoggedIn, logout } = useContext(AuthContext);
  const { cart, setCartModal } = useContext(ProductsContext);

  return (
    <VStack zIndex={2} w="100%" position="fixed" top="0" bg="#fff">
      <HStack
        w="100%"
        maxW="1280px"
        justifyContent="space-between"
        p="1rem 1rem 0 1rem"
      >
        <Image h="2.4rem" objectFit="contain" src={sw} />
        <HStack justifyContent="space-between">
          {cart?.length > 0 && (
            <HStack
              p="0.4rem"
              borderRadius="100px"
              border="1px solid"
              borderColor="gray.100"
            >
              <HStack>
                {cart?.map((item) => (
                  <Avatar size="sm" name={item?.name} src={item?.image} />
                ))}
              </HStack>
              <Button
                borderRadius="0 100px 100px 0"
                size="sm"
                colorScheme="green"
                onClick={() => setCartModal(true)}
              >
                View Cart
              </Button>
            </HStack>
          )}
          {isLoggedIn ? (
            <Button colorScheme="red" variant="link" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button
              colorScheme="green"
              variant="link"
              onClick={() => setAuthModal(true)}
            >
              Login
            </Button>
          )}
        </HStack>
      </HStack>
      <Divider />
    </VStack>
  );
};
