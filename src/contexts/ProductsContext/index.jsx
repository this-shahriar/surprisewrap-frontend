import { createContext, useState } from "react";

export const ProductsContext = createContext({});

export const ProductsContextProvider = ({ children }) => {
  const [visibleItems, setVisibleItems] = useState();
  const [searchIndex, setSearchIndex] = useState([]);
  const [cartModal, setCartModal] = useState();
  const [cart, setCart] = useState([]);
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
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
