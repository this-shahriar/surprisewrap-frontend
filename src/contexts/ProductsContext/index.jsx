import { createContext, useContext, useState } from "react";
import { useHttp } from "../../hooks/http";
import { ENDPOINTS } from "../../configs/readable";
import { AuthContext } from "../AuthContext";
import { useToast } from "@chakra-ui/react";

export const ProductsContext = createContext({});

export const ProductsContextProvider = ({ children }) => {
  const { get, post, put, del } = useHttp();
  const { user } = useContext(AuthContext);
  const [visibleItems, setVisibleItems] = useState();
  const [searchIndex, setSearchIndex] = useState([]);
  const [cartModal, setCartModal] = useState();
  const [cart, setCart] = useState([]);
  const [createProductModal, setCreateProductModal] = useState();
  const [products, setProducts] = useState();
  const toast = useToast();

  const getProducts = async () => {
    const res = await get({ url: ENDPOINTS.products });
    if (res) {
      console.log(res);
      setProducts(res);
    }
  };

  const createProduct = async (values) => {
    const res = await post({
      url: ENDPOINTS.products,
      token: user?.token,
      data: { ...values },
    });

    if (res) {
      getProducts();
      setCreateProductModal();
      toast({ description: "Product added", status: "success" });
    }
  };

  const updateProduct = async ({ id, values }) => {
    const res = await put({
      url: ENDPOINTS.products + `/${id}`,
      token: user?.token,
      data: { ...values },
    });

    if (res) {
      getProducts();
      setCreateProductModal();
      toast({ description: "Product updated", status: "success" });
    }
  };

  const deleteProduct = async ({ id }) => {
    const res = await del({
      url: ENDPOINTS.products + `/${id}`,
      token: user?.token,
    });

    if (res) {
      getProducts();
      setCreateProductModal();
      toast({ description: "Deleted", status: "success" });
    }
  };

  const initialIndexing = (products) => {};
  const search = (str) => {
    if (str?.length === 0) setVisibleItems();
    else {
      setVisibleItems(
        searchIndex.filter((index) => index?.searchKey?.includes(str))
      );
    }
  };
  const applySorting = (items) => {};
  const applyFilter = (items) => {
    if (items?.length === 0) setVisibleItems();
    else {
      setVisibleItems(
        searchIndex.filter((index) => items?.includes(index?.category))
      );
    }
  };

  const addToCart = (item) => {
    if (cart?.length == 2) setCartModal(true);
    setCart((cart) => [...cart, item]);
  };
  const removeFromCart = (item) => {
    setCart((cart) => cart?.filter((ci) => ci?.id != item.id));
  };

  return (
    <ProductsContext.Provider
      value={{
        visibleItems,
        initialIndexing,
        search,
        applySorting,
        applyFilter,
        setSearchIndex,
        addToCart,
        removeFromCart,
        cart,
        cartModal,
        setCartModal,
        getProducts,
        createProduct,
        createProductModal,
        setCreateProductModal,
        products,
        updateProduct,
        deleteProduct,
        setCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
