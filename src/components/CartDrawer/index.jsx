import { useCart } from "@/hooks/useCart";
import { Drawer } from "antd";
import React from "react";
import { CartItem } from "../CartItem";

export const CartDrawer = ({ open, onClose }) => {
  const { cart } = useCart();
  return (
    <Drawer
      width={453}
      open={open}
      onClose={onClose}
      headerStyle={{ display: "none" }}
      bodyStyle={{ padding: 0 }}
    >
      <>
        <div className="modal-content">
          {/* Close */}
          <button
            onClick={onClose}
            type="button"
            className="close !outline-none"
            data-dismiss="modal"
            aria-label="Close"
          >
            <i className="fe fe-x" aria-hidden="true" />
          </button>
          {/* Header*/}
          <div className="modal-header line-height-fixed font-size-lg">
            <strong className="mx-auto">Your Cart (2)</strong>
          </div>
          {/* List group */}
          <ul className="list-group list-group-lg list-group-flush">
            {cart?.listItems.map((e) => (
              <CartItem key={e.id} {...e} />
            ))}
          </ul>
          {/* Footer */}
          <div className="mt-auto modal-footer line-height-fixed font-size-sm bg-light">
            <strong>Subtotal</strong>{" "}
            <strong className="ml-auto">$89.00</strong>
          </div>
          {/* Buttons */}
          <div className="modal-body">
            <a
              className="btn btn-block btn-outline-dark"
              href="./shopping-cart.html"
            >
              View Cart
            </a>
          </div>
        </div>
        {/* <div className="modal-content d-none">
          <button
            type="button"
            className="close !outline-none"
            data-dismiss="modal"
            aria-label="Close"
          >
            <i className="fe fe-x" aria-hidden="true" />
          </button>
          <div className="modal-header line-height-fixed font-size-lg">
            <strong className="mx-auto">Your Cart (0)</strong>
          </div>
          <div className="flex-grow-0 my-auto modal-body">
            <div className="flex flex-col items-center gap-4">
              <img width={150} src="./img/empty-cart.png" />
              <p className="mb-0">
                Không có sản phẩm nào trong giỏ hàng của bạn.
              </p>
              <a href="#" className="btn btn-dark min-w-[300px] text-center">
                Tiếp tục mua sắm
              </a>
            </div>
          </div>
        </div> */}
      </>
    </Drawer>
  );
};
