import { CART_ACTION_TYPES, cartItem } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";
import {
  withMatcher,
  Action,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import { categoryItem } from "../categories/category.types";

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;
export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  cartItem[]
>;

const addCartItem = (
  cartItems: cartItem[],
  productToAdd: categoryItem
): cartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: cartItem[],
  cartItemToRemove: cartItem
): cartItem[] => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (
  cartItems: cartItem[],
  cartItemToClear: cartItem
): cartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const setIsCartOpen = withMatcher( (boolean: boolean): SetIsCartOpen =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const setCartItems =withMatcher( (cartItems: cartItem[]): SetCartItems => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
});

export const addItemToCart = (
  cartItems: cartItem[],
  productToAdd: categoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: cartItem[],
  cartItemToRemove: cartItem
) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: cartItem[],
  cartItemToClear: cartItem
) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  setCartItems(newCartItems);
};
