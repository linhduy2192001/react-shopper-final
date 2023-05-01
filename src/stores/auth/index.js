import { getUser } from "@/utils/token";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import {
  fetchLogin,
  fetchLoginByCode,
  fetchUser,
  logout,
  setUserSaga,
} from "./saga";

const initialState = {
  user: getUser(),
  status: "idle",
  loginLoading: false,
};

// export const loginAction = createAsyncThunk(
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

export const {
  reducer: authReducer,
  actions: authActions,
  name,
} = createSlice({
  initialState,
  name: "auth",
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },

  // extraReducers: (builder) => {
  //   builder.addCase(loginAction.pending, (state) => {
  //     state.loginLoading = true;
  //   });

  //   builder.addCase(loginAction.fulfilled, (state, action) => {
  //     state.user = action.payload;
  //     state.loginLoading = false;
  //   });

  //   builder.addCase(loginAction.rejected, (state) => {
  //     state.loginLoading = false;
  //   });

  //   builder.addCase(loginByCodeAction.fulfilled, (state, action) => {
  //     state.user = action.payload;
  //   });
  // },
});

export const loginAction = createAction(`${name}/login`);
export const logoutAction = createAction(`${name}/actionLogout`);
export const setUserAction = createAction(`${name}/setUserAction`);
export const loginByCodeAction = createAction(`${name}/loginByCodeAction`);
export const getUserAction = createAction(`${name}/getUser`);
export const loginSuccessAction = createAction(`${name}/loginSuccess`);

export function* authSaga() {
  yield takeLatest(loginAction, fetchLogin);
  yield takeLatest(logoutAction, logout);
  yield takeLatest(getUserAction, fetchUser);
  yield takeLatest(setUserAction, setUserSaga);
  yield takeLatest(loginByCodeAction, fetchLoginByCode);
}
