// context/BasketContext.js
import React, { createContext, useState } from "react";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState([]);
  const [balance, setBalance] = useState(98323);

  const addToBasket = (product, quantity) => {
    const existingItem = basketItems.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      // Update the quantity if the product is already in the basket
      const updatedItems = basketItems.map((item) => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      setBasketItems(updatedItems);
    } else {
      // Add new product to the basket
      setBasketItems([...basketItems, { product, quantity }]);
    }
  };

  const clearBasket = () => {
    setBasketItems([]);
  };

  const value = {
    basketItems,
    addToBasket,
    clearBasket,
    balance,
    setBalance,
  };

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
};
