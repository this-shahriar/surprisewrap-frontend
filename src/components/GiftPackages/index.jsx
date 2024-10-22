import {
  Avatar,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";

export const GiftPackages = ({ gifts }) => {
  const { addToCart, cart } = useContext(ProductsContext);

  return (
    <VStack w="95%" alignItems="center">
      {gifts?.length > 0 && (
        <HStack w="100%" pt="1rem" pb="1rem">
          <Divider />
          <Text fontWeight="bold" opacity={0.7} whiteSpace="nowrap">
            Popular gift packages from others
          </Text>
          <Divider />
        </HStack>
      )}
      <HStack>
        {gifts?.map((gift) => (
          <VStack
            key={gift?.id}
            w="18rem"
            p="1rem"
            spacing={0}
            borderRadius="10px"
            borderStyle="solid"
            borderWidth="1px"
            borderColor="gray.200"
            bg="gray.50"
          >
            <VStack w="100%" spacing={4}>
              {gift?.products &&
                JSON.parse(gift.products)
                  ?.slice(0, 3)
                  .map((i) => (
                    <HStack w="100%" key={i?.id} alignItems="start" spacing={4}>
                      <Avatar src={i?.image} shape="rounded" size="sm" />
                      <Text fontSize="1rem" fontWeight="bold">
                        {i?.name}
                      </Text>
                    </HStack>
                  ))}
            </VStack>
            <Divider pt="1rem" />
            <HStack pt="1rem" w="100%" justifyContent="space-between">
              <VStack alignItems="start">
                <Text
                  fontSize="0.8rem"
                  opacity={0.6}
                  fontWeight="bold"
                  lineHeight={0.2}
                >{`${gift?.totalPrice} kr`}</Text>
              </VStack>
              <Button
                pl="3rem"
                pr="3rem"
                colorScheme="green"
                isDisabled={cart?.length > 0}
                onClick={() => {
                  if (gift?.products) {
                    JSON.parse(gift.products).map((i) => addToCart(i));
                  }
                }}
              >
                Order
              </Button>
            </HStack>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
};
