import { createContext, useContext, useState } from "react";
import { useHttp } from "../../hooks/http";
import { ENDPOINTS } from "../../configs/readable";
import { AuthContext } from "../AuthContext";
import { useToast } from "@chakra-ui/react";
import { ProductsContext } from "../ProductsContext";

export const OrdersContext = createContext({});

export const OrdersContextProvider = ({ children }) => {
  const toast = useToast();
  const { user } = useContext(AuthContext);
  const { setCart } = useContext(ProductsContext);
  const { get, post, put, del } = useHttp();
  const [orders, setOrders] = useState();

  const getOrders = async () => {
    const res = await get({
      url:
        user?.role === "manager"
          ? ENDPOINTS.orders
          : `${ENDPOINTS.ordersByUser}/${user?.userId}`,
      token: user?.token,
    });
    if (res) setOrders(res);
    else setOrders();
  };

  const createOrder = async (data) => {
    const res = await post({
      url: ENDPOINTS.orders,
      token: user?.token,
      data: { ...data },
    });
    if (res) {
      toast({ description: "Order created", status: "success" });
      setCart([]);
      getOrders();
    }
  };

  const updateOrder = async ({ data, id }) => {
    const res = await put({
      url: ENDPOINTS.orders + `/${id}`,
      token: user?.token,
      data: { ...data },
    });
    if (res) {
      toast({ description: "Order updated", status: "success" });
      getOrders();
    }
  };

  const deleteOrder = async ({ id }) => {
    const res = await del({
      url: ENDPOINTS.orders + `/${id}`,
      token: user?.token,
    });
    if (res) {
      toast({ description: "Order deleted", status: "success" });
      getOrders();
    }
  };

  const cancelOrder = async (order) => {
    updateOrder({
      id: order?.id,
      data: {
        ...order,
        products: JSON.stringify(order?.products),
        status: "cancelled",
      },
    });
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        getOrders,
        createOrder,
        updateOrder,
        deleteOrder,
        cancelOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
