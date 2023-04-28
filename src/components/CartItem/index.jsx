import { useCart } from "@/hooks/useCart";
import { removeCartItemAction, updateCartItemAction } from "@/stores/cart";
import { currency } from "@/utils";
import { Popconfirm, Popover, Spin } from "antd";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const CartItem = ({ productId, product, quantity }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [_quantity, setQuantity] = useState(quantity);

  const { loading } = useCart();
  const _loading = loading[productId] || false;

  useEffect(() => {
    if (parseInt(inputRef.current.value) !== quantity) {
      inputRef.current.value = quantity;
    }
  }, [quantity]);

  const onDecrement = () => {
    inputRef.current.value--;
    dispatch(
      updateCartItemAction({
        productId,
        quantity: inputRef.current.value,
      })
    );
  };
  const onIncrement = () => {
    inputRef.current.value++;
    dispatch(
      updateCartItemAction({
        productId,
        quantity: inputRef.current.value,
      })
    );
  };

  const onRemoveCartItem = () => {
    dispatch(removeCartItemAction(productId));
  };
  return (
    <Spin spinning={_loading}>
      <li className="list-group-item">
        <div className="row align-items-center">
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
                  onConfirm={onRemoveCartItem}
                  disabled={_quantity > 1}
                  placement="bottomRight"
                  okText="Xoá"
                  showCancel={false}
                  title="Thông báo"
                  description="Bạn có chắc chắn muốn xoá sản phẩm này?"
                >
                  <button
                    onClick={_quantity > 1 ? onDecrement : undefined}
                    className="btn"
                  >
                    -
                  </button>
                </Popconfirm>
                <input
                  ref={inputRef}
                  value={_quantity}
                  onChange={(ev) => setQuantity(parseInt(ev.target.value)) || 1}
                />
                <button onClick={onIncrement} className="btn">
                  +
                </button>
              </div>
              {/* Remove */}
              <Popconfirm
                placement="bottomRight"
                okText="Xoá"
                showCancel={false}
                title="Thông báo"
                description="Bạn có chắc chắn muốn xoá sản phẩm này?"
                onConfirm={onRemoveCartItem}
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
