import { AnyAction } from "redux";
import { CART_ACTION_TYPES, cartItem } from "./cart.types";
import { categoryItem } from "../categories/category.types";
import { setCartItems, setIsCartOpen } from "./cart.action";
export type cartState = {
  cartItems: cartItem[];
  isCartOpen: boolean;
};

export const CART_INITIAL_STATE: cartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): cartState => {
  if (setCartItems.match(action)) {
    return { ...state, cartItems: action.payload };
  }

  if (setIsCartOpen.match(action)) {
    return { ...state, isCartOpen: action.payload };
  }

  return state;
};
