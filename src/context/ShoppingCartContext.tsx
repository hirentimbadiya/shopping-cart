import React, { createContext, ReactNode, useContext } from "react";
import { useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import useLocalStorage from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

// about cart items
type CartItem = {
  id: number;
  quantity: number;
};

// functions to handle cart items
type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

// custom hook to use context
const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

// provider
const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  // useState for cart items and type is given as CartItem and initially empty array
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const getItemQuantity = (id: number) => {
    // find item in cartItems array and if there is item then return quantity else return 0
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  // increment quantity
  const increaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      // if there is no item then add item
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        // add quantity by 1 if there is already item
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  // decrement quantity
  const decreaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      // if quantity is 1 then remove item
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        // decrease quantity by 1 if there is already item
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  // remove item
  const removeFromCart = (id: number) => {
    // filter out the item with given id
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  // return provider
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartProvider };
export default useShoppingCart;
