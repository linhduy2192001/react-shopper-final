const TOKEN_KEY = "token";
const USER_KEY = "user";
const CART_KEY = "cart";

export const setToken = (data) => {
  return localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
};
export const getToken = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY));
};
export const clearToken = () => {
  return localStorage.removeItem(TOKEN_KEY);
};

export const setUser = (data) => {
  return localStorage.setItem(USER_KEY, JSON.stringify(data));
};
export const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY));
};
export const clearUser = () => {
  return localStorage.removeItem(USER_KEY);
};

export const setCart = (data) => {
  return localStorage.setItem(CART_KEY, JSON.stringify(data));
};
export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY));
};
export const clearCart = () => {
  return localStorage.removeItem(CART_KEY);
};
