import {
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { MdAdd, MdDelete, MdDeleteOutline, MdRemove } from "react-icons/md";
import { ProductsContext } from "../../../contexts/ProductsContext";
import { AuthContext } from "../../../contexts/AuthContext";

export const ProductCard = ({ product }) => {
  const { isLoggedIn, setAuthModal } = useContext(AuthContext);
  const { addToCart, removeFromCart, cart } = useContext(ProductsContext);

  return (
    <VStack w="18rem" p="1rem" spacing={0}>
      <Flex
        borderRadius="10px 10px 0 0"
        overflow="hidden"
        w="100%"
        h="14rem"
        borderStyle="solid"
        borderWidth="1px 1px 0 1px"
        borderColor="gray.200"
      >
        <Image
          w="100%"
          objectFit="cover"
          src={product?.image}
          _hover={{ transform: "scale(1.1)" }}
          transition="all linear 0.2s"
        />
      </Flex>
      <HStack
        p="1rem"
        w="100%"
        alignItems="start"
        justifyContent="space-between"
        borderRadius="0 0 10px 10px"
        borderStyle="solid"
        borderWidth="0 1px 1px 1px"
        borderColor="gray.200"
        bg="gray.50"
      >
        <VStack alignItems="start">
          <Text fontSize="1rem" fontWeight="bold">
            {product?.name}
          </Text>
          <Text
            fontSize="0.8rem"
            opacity={0.6}
            fontWeight="bold"
            lineHeight={0.2}
          >{`${product?.price} ${product?.currency}`}</Text>
        </VStack>
        {cart.map((ci) => ci?.id)?.includes(product?.id) ? (
          <IconButton
            variant="outline"
            colorScheme="orange"
            icon={<Icon as={MdDeleteOutline} />}
            onClick={() => removeFromCart(product)}
          />
        ) : (
          <IconButton
            variant="outline"
            icon={<Icon as={MdAdd} />}
            isDisabled={cart?.length === 3}
            onClick={() => {
              addToCart(product);
              if (!isLoggedIn) setAuthModal(true);
            }}
          />
        )}
      </HStack>
    </VStack>
  );
};
