import {
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ProductCard } from "../ProductCard";

export const ProductSection = ({ name, products }) => {
  return (
    <VStack w="95%" pt="1rem" alignItems="start">
      <HStack w="100%">
        <Text
          whiteSpace="nowrap"
          fontSize="1rem"
          fontWeight="bold"
          color="gray.500"
        >
          {name}
        </Text>
        <Divider />
      </HStack>
      <VStack w="100%" alignItems="center">
        <Flex flexDir="row" w="100%" flexWrap="wrap" justifyContent="center">
          {products?.map((item) => (
            <ProductCard key={item?.id} product={item} />
          ))}
        </Flex>
      </VStack>
    </VStack>
  );
};
