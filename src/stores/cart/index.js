import { getCart } from "@/utils";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import { loginSuccessAction, logoutAction } from "../auth";

import {
  clearCart,
  fetchCart,
  fetchCartItem,
  fetchPreCheckout,
  fetchRemoveItem,
  fetchSelectCartItem,
  setCartSaga,
} from "./saga";

// export const updateCartItemAction = createAsyncThunk(
//   "cart/addCartItem",
//   async (data, thunkApi) => {
//     try {
//       await cartService.addItem(data.productId, data.quantity);
//       thunkApi.dispatch(getCartAction());
//       if (data.showPopover) {
//         thunkApi.dispatch(cartActions.togglePopover(true));

//         window.scroll({
//           top: 0,
//           behavior: "smooth",
//         });
//       }
//     } catch (err) {
//       throw err.response.data;
//     }
//   }
// );

// export const getCartAction = createAsyncThunk(
//   "cart/getCart",
//   async (_, thunkApi) => {
//     try {
//       if (getToken()) {
//         const cart = await cartService.getCart();
//         thunkApi.dispatch(cartActions.setCart(cart.data));
//         return cart;
//       }
//     } catch (err) {
//       console.log("err", err);
//     }
//   }
// );

export const {
  reducer: cartReducer,
  actions: cartActions,
  name,
  getInitialState,
} = createSlice({
  name: "cart",
  initialState: () => {
    return {
      cart: getCart(),
      openCartOver: false,
      preCheckoutData: {
        listItems: [],
      },
      preCheckoutResponse: null,
      preCheckoutLoading: false,
      loading: {},
    };
  },
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
    togglePopover(state, action) {
      state.openCartOver = action.payload;
    },
    toggleProductLoading(state, action) {
      state.loading[action.payload.productId] = action.payload.loading;
    },
    togglePreCheckoutLoading(state, action) {
      state.preCheckoutLoading = action.payload;
    },
    setPreCheckoutData(state, action) {
      state.preCheckoutData = action.payload;
    },
    setPreCheckoutResponse(state, action) {
      state.preCheckoutResponse = action.payload;
    },
  },
});

export const updateCartItemAction = createAction(`${name}/addCartItem`);
export const removeCartItemAction = createAction(`${name}/removeItem`);
export const getCartAction = createAction(`${name}/getCart`);
export const toggleCheckOutItemAction = createAction(`${name}/selectCartItem`);
export const updateItemQuantitySuccessAction = createAction(
  `${name}/updateItemQuantitySuccess`
);

export function* cartSaga() {
  //   yield takeLatest("cart/getCart/pending", getCart);
  yield takeLatest(updateCartItemAction, fetchCartItem);
  yield takeLatest(removeCartItemAction, fetchRemoveItem);
  yield takeLatest([getCartAction, loginSuccessAction], fetchCart);
  yield takeLatest(logoutAction, clearCart);
  yield takeLatest(cartActions.setCart, setCartSaga);
  yield takeLatest(toggleCheckOutItemAction, fetchSelectCartItem);
  yield takeLatest(
    [cartActions.setPreCheckoutData, updateItemQuantitySuccessAction],
    fetchPreCheckout
  );
}
