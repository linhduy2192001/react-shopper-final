import { PATH } from "@/config";
import { logoutAction } from "@/stores/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

export const ProfileLayout = () => {
  const dispatch = useDispatch();
  return (
    <section className="pb-12 pt-7">
      <div className="container">
        <div className="row">
          <div className="text-center col-12">
            {/* Heading */}
            <h3 className="mb-10" id="profile-title"></h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-3">
            {/* Nav */}
            <nav className="mb-10 mb-md-0">
              <div className="list-group list-group-sm list-group-strong list-group-flush-x">
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to="account-orders.html"
                >
                  Theo dõi đơn hàng
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  end
                  to={PATH.Profile.index}
                >
                  Thông tin cá nhân
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to={PATH.Profile.Wistlist}
                >
                  Sản phẩm yêu thích
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to={PATH.Profile.Address}
                >
                  Sổ địa chỉ
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to="account-payment.html"
                >
                  Sổ thanh toán
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle"
                  to=""
                  onClick={(ev) => {
                    ev.preventDefault();
                    dispatch(logoutAction());
                  }}
                >
                  Đăng xuất
                </NavLink>
              </div>
            </nav>
          </div>
          <div className="col-12 col-md-12 col-lg-8 offset-lg-1">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};
