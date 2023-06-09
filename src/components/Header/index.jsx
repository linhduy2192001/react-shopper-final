import { PATH } from "@/config";
import { avatarDefault } from "@/config/assets";
import { useAuth } from "@/hooks/useAuth";
import { Dropdown, Popover } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchDrawer from "../SearchDrawer";
import { logoutAction } from "@/stores/auth";
import { useCart } from "@/hooks/useCart";
import { CartDrawer } from "../CartDrawer";
import { CheckCircleFilled } from "@ant-design/icons";
import Button from "../Button";
import { cartActions } from "@/stores/cart";
const Header = () => {
  const { user } = useAuth();
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const dispatch = useDispatch();
  const { cart, openCartOver } = useCart();
  const navigate = useNavigate();
  return (
    <>
      <SearchDrawer
        open={openSearchDrawer}
        onClose={() => setOpenSearchDrawer(false)}
      />
      <CartDrawer
        open={openCartDrawer}
        onClose={() => setOpenCartDrawer(false)}
      />
      {/* NAVBAR */}
      <div className="navbar navbar-topbar navbar-expand-xl navbar-light bg-light">
        <div className="container">
          {/* Promo */}
          <div className="mr-xl-8">
            <i className="mr-2 fe fe-truck" />{" "}
            <span className="heading-xxxs">Vận chuyển toàn cầu</span>
          </div>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#topbarCollapse"
            aria-controls="topbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Collapse */}
          <div className="navbar-collapse" id="topbarCollapse">
            {/* Nav */}
            <ul className="mr-auto nav nav-divided navbar-nav">
              <li className="nav-item dropdown">
                {/* Toggle */}
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  <img
                    className="inline-block mb-1 mr-1"
                    src="/img/flags/usa.svg"
                    alt="..."
                  />{" "}
                  United States
                </a>
                {/* Menu */}
                <div className="dropdown-menu minw-0">
                  <a className="dropdown-item" href="#!">
                    <img
                      className="mb-1 mr-2"
                      src="/img/flags/usa.svg"
                      alt="USA"
                    />
                    United States
                  </a>
                  <a className="dropdown-item" href="#!">
                    <img
                      className="mb-1 mr-2"
                      src="/img/flags/canada.svg"
                      alt="Canada"
                    />
                    Canada
                  </a>
                  <a className="dropdown-item" href="#!">
                    <img
                      className="mb-1 mr-2"
                      src="/img/flags/germany.svg"
                      alt="Germany"
                    />
                    Germany
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                {/* Toggle */}
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  USD
                </a>
                {/* Menu */}
                <div className="dropdown-menu minw-0">
                  <a className="dropdown-item" href="#!">
                    USD
                  </a>
                  <a className="dropdown-item" href="#!">
                    EUR
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                {/* Toggle */}
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  English
                </a>
                {/* Menu */}
                <div className="dropdown-menu minw-0">
                  <a className="dropdown-item" href="#">
                    English
                  </a>
                  <a className="dropdown-item" href="#">
                    Tiếng Việt
                  </a>
                  <a className="dropdown-item" href="#">
                    China
                  </a>
                </div>
              </li>
            </ul>
            {/* Nav */}
            <ul className="mr-8 nav navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/shipping-and-returns.html">
                  Quy định giao hàng
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/faq.html">
                  Câu hỏi
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact-us.html">
                  Liên hệ
                </a>
              </li>
            </ul>
            {/* Nav */}
            <ul className="flex-row nav navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li className="nav-item ml-xl-n4">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li className="nav-item ml-xl-n4">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-instagram" />
                </a>
              </li>
              <li className="nav-item ml-xl-n4">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-medium" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* NAVBAR */}
      <nav className="bg-white navbar navbar-expand-lg navbar-light">
        <div className="container">
          {/* Brand */}
          <a className="navbar-brand" href="/index.html">
            <img style={{ width: "50px" }} src="/img/logo.svg" />
            Shopper.
          </a>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Collapse */}
          <div className="navbar-collapse" id="navbarCollapse">
            {/* Nav */}
            <ul className="mx-auto navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Trang chủ
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={PATH.Product}>
                  Sản phẩm
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="/shop.html">
                  Laptop
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="/shop.html">
                  Máy tính
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/shop.html">
                  Sản phẩm khuyến mãi
                </a>
              </li>
            </ul>
            {/* Nav */}
            <ul className="flex-row navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="modal"
                  href="#modalSearch"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenSearchDrawer(true);
                  }}
                >
                  <i className="fe fe-search" />
                </a>
              </li>
              <li className="nav-item ml-lg-n4">
                <a className="nav-link" href="#">
                  <i className="fe fe-heart" />
                </a>
              </li>
              <li className="nav-item ml-lg-n4">
                <Popover
                  onOpenChange={(visible) => {
                    if (!visible) {
                      dispatch(cartActions.togglePopover(false));
                    }
                  }}
                  trigger={["click"]}
                  open={openCartOver}
                  content={
                    <>
                      <p className="flex items-center gap-2 mb-0">
                        <span className="text-green-500">
                          <CheckCircleFilled />
                        </span>
                        Thêm sản phẩm vào giỏ hàng thành công
                      </p>
                      <Link
                        onClick={() =>
                          dispatch(cartActions.togglePopover(false))
                        }
                        to={PATH.ViewCart}
                        className="justify-center w-full mt-2 btn btn-dark btn-xs"
                      >
                        Xem giỏ hàng và thanh toán
                      </Link>
                    </>
                  }
                  placement="bottomRight"
                >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenCartDrawer(true);
                    }}
                    className="nav-link"
                    data-toggle="modal"
                    href="#modalShoppingCart"
                  >
                    <span data-cart-items={cart?.totalQuantity || undefined}>
                      <i className="fe fe-shopping-cart" />
                    </span>
                  </a>
                </Popover>
              </li>
              {user ? (
                <Dropdown
                  arrow
                  placement="bottomRight"
                  menu={{
                    items: [
                      {
                        key: 1,
                        label: (
                          <Link to={PATH.Profile.Order}>Đơn hành của tôi</Link>
                        ),
                      },
                      {
                        key: 2,
                        label: (
                          <Link to={PATH.Profile.index}>
                            Thông tin tài khoản
                          </Link>
                        ),
                      },
                      {
                        key: 3,
                        label: "Đăng xuất ",
                        onClick: () => {
                          dispatch(logoutAction());
                          navigate(PATH.Account);
                        },
                      },
                    ],
                  }}
                >
                  <li className="nav-item ml-lg-n4">
                    <Link
                      className="header-avatar nav-link"
                      to={PATH.Profile.index}
                    >
                      <img src={user?.avatar || avatarDefault} />
                    </Link>
                  </li>
                </Dropdown>
              ) : (
                <li className="nav-item ml-lg-n4">
                  <Link className="nav-link" to={PATH.Account}>
                    <i className="fe fe-user" />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
