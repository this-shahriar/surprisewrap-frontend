import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { Avatar, Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";

export const Cart = () => {
  const { cart, removeFromCart } = useContext(ProductsContext);

  return (
    <VStack w="100%" alignItems="start">
      <Text fontWeight="bold" fontSize="1.4rem">
        Your Gift Cart
      </Text>
      <Text pb="1rem" fontSize="0.85rem" opacity={0.6}>
        Your have reached maximum number of product for a single gift wrap.
        Proceed to order page to select wrapping paper and recipient addresses.
      </Text>
      {cart?.map((item) => (
        <HStack w="100%" justifyContent="space-between" key={item?.id}>
          <HStack p="0.4rem 0">
            <Avatar src={item?.image} />
            <VStack alignItems="start">
              <Text fontWeight="bold">{item?.name}</Text>
              <Text
                fontSize="0.8rem"
                fontWeight="bold"
                opacity={0.5}
                lineHeight={0.2}
              >{`${item?.price} ${item?.currency}`}</Text>
            </VStack>
          </HStack>
          <Button
            size="sm"
            leftIcon={<Icon as={MdDeleteOutline} />}
            colorScheme="red"
            variant="outline"
            onClick={() => removeFromCart(item)}
          >
            Remove
          </Button>
        </HStack>
      ))}
      <Button
        mt="1rem"
        w="100%"
        colorScheme="green"
        isDisabled={cart?.length === 0}
      >
        Proceed to order page
      </Button>
    </VStack>
  );
};
