import { cartService } from "@/services/cart";
import { getToken, setCart } from "@/utils";
import { call, delay, put, race, take } from "redux-saga/effects";
import { cartActions, getCartAction } from ".";
import { authActions } from "../auth";

export function* fetchCartItem(action) {
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
export function* fetchRemoveItem(action) {
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

export function* fetchCart() {
  if (getToken()) {
    // const cart = yield call(cartService.getCart);

    const { cart, logout } = yield race({
      cart: call(cartService.getCart),
      logout: take(authActions.logout),
    });

    if (cart) {
      yield put(cartActions.setCart(cart.data));
    }
    // thunkApi.dispatch(cartActions.setCart(cart.data));
    return cart;
  }
}
//root saga
export function* clearCart() {
  yield put(cartActions.setCart(null));
}

export function* setCartSaga(action) {
  setCart(action.payload);
}
