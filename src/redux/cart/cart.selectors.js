import { createSelector } from "reselect";

// input selector, function that takes the whole state but return a slice of item
const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  selectCart,
  (cart) => cart.hidden
);

export const selectCarItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumaltedQuantity, cartItem) => accumaltedQuantity + cartItem.quantity,
      0
    )
);
export const selectCartTotal = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce(
    (accumaltedQuantity, cartItem) =>
      accumaltedQuantity + cartItem.quantity * cartItem.price
  , 0)
);
