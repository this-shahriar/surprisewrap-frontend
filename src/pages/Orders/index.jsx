import {
  Badge,
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Cart } from "../../components/Cart";
import { Order } from "../../components/Order";
import { useContext, useEffect } from "react";
import { OrdersContext } from "../../contexts/OrdersContext";
import { FcInfo } from "react-icons/fc";
import { ProductsContext } from "../../contexts/ProductsContext";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { AuthContext } from "../../contexts/AuthContext";

export const Orders = () => {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(ProductsContext);
  const { orders, getOrders, deleteOrder, updateOrder } =
    useContext(OrdersContext);
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <VStack w="100%" p="5rem 2rem 1rem 2rem">
      <Header />
      {cart?.length > 0 && (
        <VStack p="1rem" w="100%" maxW="700px" borderRadius="8px" bg="gray.50">
          <Cart ordering />
          <Divider />
          <Order />
        </VStack>
      )}
      <VStack w="100%" maxW="700px">
        <HStack w="100%">
          <Text whiteSpace="nowrap" fontWeight="bold">
            Past orders
          </Text>
          <Divider />
        </HStack>
        <VStack w="100%">
          {orders?.length > 0 ? (
            <TableContainer w="100%">
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Order</Th>
                    <Th>Price</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orders.map((order) => (
                    <Tr key={order.id}>
                      <Td>
                        <VStack alignItems="start">
                          <Text fontSize="0.9rem" fontWeight="bold">
                            {order?.delivery_address}
                          </Text>
                          <Text
                            fontSize="0.8rem"
                            fontWeight="bold"
                            opacity={0.5}
                            lineHeight={0.8}
                          >
                            {new Date(order?.createdAt)?.toLocaleString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </Text>

                          <Text
                            fontSize="0.8rem"
                            opacity={0.5}
                            lineHeight={0.6}
                          >
                            ID - {order?.id}
                          </Text>
                        </VStack>
                      </Td>
                      <Td>{order?.totalPrice}</Td>
                      <Td>
                        <Badge fontSize="0.6rem" size="sm" variant="outline">
                          {order?.status}
                        </Badge>
                      </Td>
                      <Td>
                        <HStack>
                          {user?.role === "manager" ? (
                            <Button
                              size="sm"
                              variant="outline"
                              colorScheme="cyan"
                              isDisabled={order?.status != "ordered"}
                              onClick={() =>
                                updateOrder({
                                  id: order?.id,
                                  data: {
                                    ...order,
                                    products: JSON.stringify(order?.products),
                                    status: "delivered",
                                  },
                                })
                              }
                            >
                              Mark as delivered
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              colorScheme="red"
                              isDisabled={order?.status != "ordered"}
                              onClick={() => deleteOrder({ id: order?.id })}
                            >
                              Cancel
                            </Button>
                          )}
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <VStack w="100%" borderRadius="8px" bg="gray.50" p="1rem">
              <Icon fontSize="2rem" as={FcInfo} />
              <Text fontSize="0.9rem" opacity={0.6}>
                No orders found!
              </Text>
            </VStack>
          )}
        </VStack>
      </VStack>
      <Footer />
    </VStack>
  );
};
