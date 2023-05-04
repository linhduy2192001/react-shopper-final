import { CartItem } from "@/components/CartItem";
import { PATH } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { cn, currency } from "@/utils";
import { Spin } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ViewCart = () => {
  const { cart, preCheckoutResponse, preCheckoutLoading } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigate(PATH.Account);
    }
  }, []);

  return (
    <>
      <section className="pb-12 pt-7">
        {cart?.listItems.length > 0 ? (
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Heading */}
                <h3 className="mb-10 text-center">Shopping Cart</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-7">
                {/* List group */}
                <ul className="mb-6 list-group list-group-lg list-group-flush-x">
                  {cart?.listItems.map((e) => (
                    <CartItem key={e.productId} {...e} allowSelect />
                  ))}
                </ul>
                {/* Footer */}
                <div className="mb-10 row align-items-end justify-content-between mb-md-0">
                  <div className="col-12 col-md-7">
                    <div className="mb-5 promotion-code-card">
                      <div className="font-bold">SALE50</div>
                      <div className="text-sm">Promotion (-50%)</div>
                      <i className="fe fe-x close" />
                    </div>
                    {/* Coupon */}
                    <form className="mb-7 mb-md-0">
                      <label
                        className="font-size-sm font-weight-bold"
                        htmlFor="cartCouponCode"
                      >
                        Coupon code:
                      </label>
                      <div className="row form-row">
                        <div className="col">
                          {/* Input */}
                          <input
                            className="form-control form-control-sm"
                            id="cartCouponCode"
                            type="text"
                            placeholder="Enter coupon code*"
                          />
                        </div>
                        <div className="col-auto">
                          {/* Button */}
                          <button className="btn btn-sm btn-dark" type="submit">
                            Apply
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
                {/* Total */}
                <div className="product-card card mb-7 bg-light">
                  <Spin spinning={preCheckoutLoading}>
                    <div className="card-body">
                      <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                        <li className="list-group-item d-flex">
                          <span>Subtotal</span>{" "}
                          <span className="ml-auto font-size-sm">
                            {currency(preCheckoutResponse?.subTotal)}
                          </span>
                        </li>
                        <li className="list-group-item d-flex">
                          <span>Promotion</span>{" "}
                          <span className="ml-auto font-size-sm">
                            {currency(preCheckoutResponse?.promotion)}
                          </span>
                        </li>
                        <li className="list-group-item d-flex">
                          <span>Tax</span>{" "}
                          <span className="ml-auto font-size-sm">
                            {currency(preCheckoutResponse?.tax)}
                          </span>
                        </li>
                        <li className="list-group-item d-flex font-size-lg font-weight-bold">
                          <span>Total</span>{" "}
                          <span className="ml-auto font-size-sm">
                            {currency(preCheckoutResponse?.total)}
                          </span>
                        </li>
                        <li className="text-center text-gray-500 list-group-item font-size-sm">
                          Giá vận chuyển sẽ được tính khi checkout *
                        </li>
                      </ul>
                    </div>
                  </Spin>
                </div>
                {/* Button */}
                <Link
                  className={cn("mb-2 btn btn-block btn-dark", {
                    disabled: !preCheckoutResponse?.listItems.length,
                  })}
                  href="checkout.html"
                >
                  Proceed to Checkout
                </Link>
                {/* Link */}
                <a
                  className="px-0 btn btn-link btn-sm text-body"
                  href="shop.html"
                >
                  <i className="mr-2 fe fe-arrow-left" /> Continue Shopping
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <img width={300} src="./img/empty-cart.png" />
            <p className="mb-0">
              Không có sản phẩm nào trong giỏ hàng của bạn.
            </p>
            <Link
              to={PATH.Product}
              className="btn btn-dark min-w-[300px] text-center"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        )}
      </section>
      <section className="bg-light py-9">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="mb-6 d-flex mb-lg-0">
                {/* Icon */}
                <i className="fe fe-truck font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="mb-1 heading-xxs">Free shipping</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    From all orders over $100
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="mb-6 d-flex mb-lg-0">
                {/* Icon */}
                <i className="fe fe-repeat font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="mb-1 heading-xxs">Free returns</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    Return money within 30 days
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="mb-6 d-flex mb-md-0">
                {/* Icon */}
                <i className="fe fe-lock font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="mb-1 heading-xxs">Secure shopping</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    You're in safe hands
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="d-flex">
                {/* Icon */}
                <i className="fe fe-tag font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="mb-1 heading-xxs">Over 10,000 Styles</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    We have everything you need
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
