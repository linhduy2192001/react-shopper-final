import GuestRoute from "@/components/GuestRoute";
import PrivateRouter from "@/components/PrivateRouter";
import { PATH } from "@/config";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages";
import Page404 from "@/pages/404";
import ProductPage from "@/pages/san-pham";
import Account from "@/pages/tai-khoan";
import ProductDetailPage from "@/pages/[slug]";
import { profile } from "./ca-nhan";

export const routes = [
  {
    element: <MainLayout />,
    children: [
      {
        element: <HomePage />,
        path: "/",
      },
      {
        element: <ProductPage />,
        path: PATH.Product,
      },
      {
        element: <ProductPage />,
        path: PATH.Category,
      },
      {
        element: <ProductDetailPage />,
        path: PATH.ProductDetail,
      },
      {
        element: <PrivateRouter redirect={PATH.Account} />,
        children: profile,
        path: PATH.Profile.index,
      },
      {
        element: <GuestRoute redirect={PATH.Profile.index} />,
        path: PATH.Account,
        children: [
          {
            index: true,
            element: <Account />,
          },
        ],
      },
      {
        element: <Page404 />,
        path: "*",
      },
    ],
  },
];
