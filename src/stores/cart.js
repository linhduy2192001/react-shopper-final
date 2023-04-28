import { cartService } from "@/services/cart";
import { getToken } from "@/utils";
import { takeLatest, call, put, delay } from "redux-saga/effects";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { remove } from "lodash";

export const updateCartItemAction = createAction("cart/addCartItem");
export const removeCartItemAction = createAction("cart/removeItem");
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

export const getCartAction = createAsyncThunk(
  "cart/getCart",
  async (_, thunkApi) => {
    try {
      if (getToken()) {
        const cart = await cartService.getCart();
        thunkApi.dispatch(cartActions.setCart(cart.data));
        return cart;
      }
    } catch (err) {
      console.log("err", err);
    }
  }
);

export const { reducer: cartReducer, actions: cartActions } = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    openCartOver: false,
    loading: {},
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
  },
});

function* fetchCartItem(action) {
  try {
    yield delay(300);
    if (action.payload.quantity >= 1) {
      yield call(
        cartService.addItem,
        action.payload.productId,
        action.payload.quantity
      );
      yield put(getCartAction());
      // thunkApi.dispatch(getCartAction());
      if (action.payload.showPopover) {
        yield put(cartActions.togglePopover(true));

        window.scroll({
          top: 0,
          behavior: "smooth",
        });
      }
    } else {
      yield put(removeCartItemAction());
    }
  } catch (err) {
    console.log(err);
  }
}
function* fetchRemoveItem(action) {
  try {
    yield put(
      cartActions.toggleProductLoading({
        productId: action.payload,
        loading: true,
      })
    );
    yield call(cartService.removeItem, action.payload);
    yield put(getCartAction());
    yield put(
      cartActions.toggleProductLoading({
        productId: action.payload,
        loading: false,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

//root saga

export function* cartSaga() {
  //   yield takeLatest("cart/getCart/pending", getCart);
  yield takeLatest(updateCartItemAction, fetchCartItem);
  yield takeLatest(removeCartItemAction, fetchRemoveItem);
}
