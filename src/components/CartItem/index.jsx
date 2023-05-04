import { useCart } from "@/hooks/useCart";
import {
  removeCartItemAction,
  toggleCheckOutItemAction,
  updateCartItemAction,
} from "@/stores/cart";
import { currency } from "@/utils";
import { Popconfirm, Spin } from "antd";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Checkbox } from "../Checkout";

export const CartItem = ({ allowSelect, productId, product, quantity }) => {
  const dispatch = useDispatch();
  // const inputRef = useRef();
  const [_quantity, setQuantity] = useState(quantity);

  const { loading } = useCart();
  const _loading = loading[productId] || false;
  const [openPopconfirm, setOpenPopconfirm] = useState(false);
  const [openPopconfirmQuantity, setOpenPopconfirmQuantity] = useState(false);

  useEffect(() => {
    if (_quantity !== quantity) {
      setQuantity(quantity);
    }
  }, [quantity]);

  const onChangeQuantityCurry = (val) => () => {
    if (val === 0) {
      dispatch(removeCartItemAction(productId));
    } else {
      setQuantity(val);
      dispatch(
        updateCartItemAction({
          productId,
          quantity: val,
        })
      );
    }
  };
  // const onDecrement = () => {
  //   // inputRef.current.value--;
  //   setQuantity(_quantity - 1);
  //   dispatch(
  //     updateCartItemAction({
  //       productId,
  //       quantity: _quantity - 1,
  //     })
  //   );
  // };
  // const onIncrement = () => {
  //   setQuantity(_quantity + 1);
  //   // inputRef.current.value++;
  //   dispatch(
  //     updateCartItemAction({
  //       productId,
  //       quantity: _quantity + 1,
  //     })
  //   );
  // };

  // const onUpdateQuantity = (val) => {
  //   dispatch(
  //     updateCartItemAction({
  //       productId,
  //       quantity: val,
  //     })
  //   );
  // };

  // const onRemoveCartItem = () => {
  //   dispatch(removeCartItemAction(productId));
  // };

  const onSelectCartItem = (checked) => {
    dispatch(toggleCheckOutItemAction({ checked, productId }));
  };
  return (
    <Spin spinning={_loading}>
      <li className="list-group-item">
        <div className="row align-items-center">
          {allowSelect && <Checkbox onChange={onSelectCartItem} />}

          <div className="w-[120px]">
            {/* Image */}
            <a href="./product.html">
              <img
                className="img-fluid"
                src={product.thumbnail_url}
                alt="..."
              />
            </a>
          </div>
          <div className="flex-1 px-2">
            {/* Title */}
            <p className="mb-6 font-size-sm">
              <a className="text-body" href="./product.html">
                {product.name}
              </a>{" "}
              <br />
              <span className="card-product-price">
                {product.real_price < product.price ? (
                  <>
                    <span className="sale text-primary">
                      {currency(product.real_price)}
                    </span>
                    <span className="inline-block ml-1 line-through text-muted">
                      {currency(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="inline-block ml-1 line-through text-muted">
                    {currency(product.real_price)}
                  </span>
                )}
              </span>
            </p>
            {/*Footer */}
            <div className="d-flex align-items-center">
              {/* Select */}
              <div className="btn-group btn-quantity">
                <Popconfirm
                  open={openPopconfirmQuantity}
                  onOpenChange={(visible) => setOpenPopconfirmQuantity(visible)}
                  onConfirm={() => {
                    setOpenPopconfirmQuantity(false);
                    onChangeQuantityCurry(0)();
                  }}
                  disabled={_quantity > 1}
                  placement="bottomRight"
                  okText="Xoá"
                  showCancel={false}
                  title="Thông báo"
                  description="Bạn có chắc chắn muốn xoá sản phẩm này?"
                >
                  <button
                    onClick={
                      _quantity > 1
                        ? onChangeQuantityCurry(_quantity - 1)
                        : undefined
                    }
                    className="btn"
                  >
                    -
                  </button>
                </Popconfirm>
                <input
                  // ref={inputRef}
                  value={_quantity}
                  onChange={(ev) => setQuantity(ev.target.value)}
                  onBlur={(ev) => {
                    let val = parseInt(ev.target.value);
                    if (!val) {
                      val = 1;
                      setQuantity(val);
                    }
                    if (val !== quantity) {
                      onUpdateQuantity(val);
                    }
                  }}
                />
                <button
                  onClick={onChangeQuantityCurry(_quantity + 1)}
                  className="btn"
                >
                  +
                </button>
              </div>
              {/* Remove */}
              <Popconfirm
                open={openPopconfirm}
                onOpenChange={(visible) => setOpenPopconfirm(visible)}
                placement="bottomRight"
                okText="Xoá"
                showCancel={false}
                title="Thông báo"
                description="Bạn có chắc chắn muốn xoá sản phẩm này?"
                onConfirm={() => {
                  setOpenPopconfirm(false);
                  onChangeQuantityCurry(0)();
                }}
              >
                <a
                  onClick={(ev) => ev.preventDefault()}
                  className="ml-auto text-gray-400 font-size-xs"
                  href="#!"
                >
                  <i className="fe fe-x" /> Xóa
                </a>
              </Popconfirm>
            </div>
          </div>
        </div>
      </li>
    </Spin>
  );
};
