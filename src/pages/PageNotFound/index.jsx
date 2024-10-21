import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { MdNoAccounts, MdNoCell, MdNoDrinks, MdNoFood } from "react-icons/md";

export const PageNotFound = () => {
  return (
    <VStack w="100%">
      <Header />
      <VStack pt="14rem">
        <Icon fontSize="3rem" as={MdNoFood} opacity={0.7} />
        <Text fontSize="1.8rem" fontWeight="bold" opacity={0.7}>
          Page not found!
        </Text>
      </VStack>
    </VStack>
  );
};
