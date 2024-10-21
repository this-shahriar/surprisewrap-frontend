import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { OrdersContext } from "../../contexts/OrdersContext";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";

export const Order = ({ edit }) => {
  const { user } = useContext(AuthContext);
  const { createOrder } = useContext(OrdersContext);
  const { cart } = useContext(ProductsContext);
  const { handleSubmit, register } = useForm({
    defaultValues: edit,
  });

  const handleCreateOrder = (values) => {
    if (values) {
      createOrder({
        ...values,
        status: "ordered",
        totalPrice: cart?.reduce(
          (acc, current) => acc + parseInt(current?.price),
          0
        ),
        products: JSON.stringify(cart),
        userId: user?.userId,
      });
    }
  };

  return (
    <VStack w="100%">
      <form
        style={{ width: "100%" }}
        onSubmit={handleSubmit(handleCreateOrder)}
      >
        <FormControl p="0.5rem 0">
          <FormLabel>Recipient's address</FormLabel>
          <Textarea
            size="sm"
            id="delivery_address"
            placeholder="Address"
            {...register("delivery_address", { required: true })}
          />
        </FormControl>
        <HStack w="100%" justifyContent="space-between">
          <HStack w="100%" alignItems="start">
            <Text fontSize="0.9rem" fontWeight="bold" opacity={0.6}>
              Total:{" "}
            </Text>
            <Text fontSize="0.9rem" fontWeight="bold">
              {cart?.reduce(
                (acc, current) => acc + parseInt(current?.price),
                0
              )}
              kr
            </Text>
          </HStack>
          <Button
            type="submit"
            pr="2rem"
            pl="2rem"
            size="sm"
            colorScheme="green"
            isDisabled={!cart?.length > 0}
          >
            Confirm Order
          </Button>
        </HStack>
      </form>
    </VStack>
  );
};
