import { VStack } from "@chakra-ui/react";

export const ProductCard = () => {
  return (
    <VStack minW="14rem" w="100%" p="1rem">
      <VStack borderRadius="8px" w="100%" h="14rem" bg="gray.300"></VStack>
      <VStack borderRadius="8px" w="100%" h="2rem" bg="gray.300" />
      <VStack borderRadius="8px" w="100%" h="1.2rem" bg="gray.300" />
      <VStack borderRadius="8px" w="100%" h="1.2rem" bg="gray.300" />
    </VStack>
  );
};
