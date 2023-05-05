import Button from "@/components/Button";
import { CartItem } from "@/components/CartItem";
import Field from "@/components/Field";
import { PATH } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useForm } from "@/hooks/useForm";
import { addPromotionAction, removePromotionAction } from "@/stores/cart";
import { cn, currency, handleError, required } from "@/utils";
import { message, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const ViewCart = () => {
  const { cart, preCheckoutResponse, preCheckoutLoading, promotionLoading } =
    useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const promotionForm = useForm({
    code: [required()],
  });
  useEffect(() => {
    if (!user) {
      navigate(PATH.Account);
    }
  }, []);

  const onSubmitPromotion = () => {
    if (promotionForm.validate()) {
      dispatch(
        addPromotionAction({
          data: promotionForm.values.code,
          onSuccess: () => {
            message.success("Thêm mã giảm giá thành công");
            promotionForm.reset();
          },
          onError: handleError,
        })
      );
    }
  };
  const onRemovePromotion = () => {
    dispatch(
      removePromotionAction({
        onSuccess: () => {
          message.success("Xoá mã giảm giá thành công");
        },
      })
    );
  };
  const { promotion } = preCheckoutResponse;
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
                    {promotion && (
                      <div className="mb-5 promotion-code-card">
                        <div className="font-bold">{promotion?.title}</div>
                        <div className="text-sm">{promotion?.description}</div>
                        <i
                          className="fe fe-x close"
                          onClick={onRemovePromotion}
                        />
                      </div>
                    )}

                    {/* Coupon */}
                    <div className="mb-7 mb-md-0">
                      <Field
                        {...promotionForm.register("code")}
                        label="  Coupon code:"
                        placeholder="Enter coupon code*"
                        renderField={(props) => (
                          <div className="flex gap-2">
                            <input
                              {...props}
                              onChange={(ev) => props.onChange(ev.target.value)}
                              className="form-control form-control-sm"
                            />
                            <Button
                              loading={promotionLoading}
                              onClick={onSubmitPromotion}
                            >
                              Apply
                            </Button>
                          </div>
                        )}
                      />

                      {/* <label
                        className="font-size-sm font-weight-bold"
                        htmlFor="cartCouponCode"
                      >
                        Coupon code:
                      </label>
                      <div className="row form-row">
                        <div className="col">
                          <input
                            className="form-control form-control-sm"
                            id="cartCouponCode"
                            type="text"
                            placeholder="Enter coupon code*"
                          />
                        </div>
                        
                      </div> */}
                    </div>
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
                            {promotion?.discount ? "-" : ""}
                            {currency(promotion?.discount)}
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
                    disabled: !preCheckoutResponse?.listItems?.length,
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
