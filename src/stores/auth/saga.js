import { authService } from "@/services/auth";
import { userService } from "@/services/user";
import { handleError } from "@/utils";
import {
  clearToken,
  clearUser,
  getToken,
  setToken,
  setUser,
} from "@/utils/token";
import { call, put } from "redux-saga/effects";
import { authActions, loginSuccessAction } from ".";

//   "auth/login",
//   async (data, thunkApi) => {
//     try {
// const res = await authService.login(data);
// setToken(res.data);
// const user = await userService.getUser();
// setUser(user.data);

// thunkApi.dispatch(getCartAction());
// return user.data;
//     } catch (err) {
//       console.log("err", err);
//       throw err.response.data;
//     }
//   }
// );

// export const loginByCodeAction = createAsyncThunk(
//   "auth/loginByCodeAction",
//   async (code, thunkApi) => {
//     try {
//       const res = await authService.loginByCode({ code });
//       setToken(res.data);
//       const user = await userService.getUser();
//       setUser(user.data);
//       return user.data;
//     } catch (err) {
//       console.log("err", err);
//       throw err.response.data;
//     }
//   }
// );

// export const getUserAction = createAsyncThunk(
//   "auth/getUser",
//   async (_, thunkApi) => {
//     try {
//       if (getToken()) {
//         const user = await userService.getUser();
//         setUser(user.data);
//         thunkApi.dispatch(authActions.setUser(user.data));
//       }
//     } catch (err) {}
//   }
// );

// export const setUserAction = createAsyncThunk(
//   "auth/setUser",
//   (user, thunkApi) => {
//     setUser(user);
//     thunkApi.dispatch(authActions.setUser(user));
//   }
// );

// export const logoutAction = createAsyncThunk("auth/logout", (_, thunkApi) => {
// thunkApi.dispatch(authActions.logout());
// thunkApi.dispatch(cartActions.setCart(null));
// clearUser();
// clearToken();
// });
export function* fetchLogin(action) {
  try {
    const res = yield call(authService.login, action.payload);
    setToken(res.data);
    const user = yield call(userService.getUser);
    setUser(user.data);
    // yield put(getCartAction());
    yield put(authActions.setUser(user.data));
    yield put(loginSuccessAction());
    // thunkApi.dispatch(getCartAction());
    // return user.data;
  } catch (err) {
    handleError(err);
  }
}

export function* logout() {
  yield put(authActions.logout());
  // thunkApi.dispatch(authActions.logout());
  // yield put(cartActions.setCart(null));

  // thunkApi.dispatch(cartActions.setCart(null));
  clearUser();
  clearToken();
}

export function* fetchUser() {
  try {
    if (getToken()) {
      const user = yield call(userService.getUser);
      setUser(user.data);
      yield put(authActions.setUser(user.data));
    }
  } catch (err) {}
}

export function* setUserSaga(action) {
  setUser(action.payload);
  yield put(authActions.setUser(user));
}

export function* fetchLoginByCode() {
  try {
    const res = yield call(authService.loginByCode, { code });
    setToken(res.data);
    const user = call(userService.getUser());
    setUser(user.data);
    yield put(authActions.setUser(user.data));
    // return user.data;
  } catch (err) {
    handleError(err);
  }
}
