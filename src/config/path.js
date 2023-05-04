const PROFILE = "/ca-nhan";

export const PATH = {
  Home: "/",
  Product: "/san-pham",
  ProductDetail: "/:slug",
  Category: "/:slug/:id",
  ViewCart: "/gio-hang",
  Profile: {
    index: PROFILE,
    Order: PROFILE + "/don-hang",
    Wistlist: PROFILE + "/san-pham-yeu-thich",
    Address: PROFILE + "/so-dia-chi",
    NewAddress: PROFILE + "/so-dia-chi/new",
    EditAddress: PROFILE + "/so-dia-chi/edit/:id",
    Payment: PROFILE + "/so-thanh-toan",
    NewPayment: PROFILE + "/so-thanh-toan/new",
    EditPayment: PROFILE + "/so-thanh-toan/edit/:id",
  },
  Account: "/tai-khoan",
};
