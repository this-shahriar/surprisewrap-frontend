import {
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Image,
} from "@chakra-ui/react";
import sw from "../../../public/surprisewrap.svg";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { MdOutlineDarkMode, MdOutlineShoppingCart } from "react-icons/md";

export const Header = () => {
  const { setAuthModal, isLoggedIn, logout } = useContext(AuthContext);

  return (
    <HStack w="100%" justifyContent="space-between" p="1rem 1rem 0 1rem">
      <Image h="2.4rem" objectFit="contain" src={sw} />
      <HStack justifyContent="space-between">
        <IconButton
          colorScheme="green"
          variant="link"
          icon={<Icon as={MdOutlineDarkMode} />}
        />
        <IconButton
          colorScheme="green"
          variant="link"
          icon={<Icon as={MdOutlineShoppingCart} />}
        />
        <Divider w="1rem" />
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
  );
};
