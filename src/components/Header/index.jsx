import { Button, HStack, Image } from "@chakra-ui/react";
import sw from "../../../public/surprisewrap.svg";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
  const { setAuthModal } = useContext(AuthContext);

  return (
    <HStack w="100%" justifyContent="space-between" p="1rem">
      <Image h="3rem" objectFit="contain" src={sw} />
      <Button variant="link" onClick={() => setAuthModal(true)}>
        Login
      </Button>
    </HStack>
  );
};
