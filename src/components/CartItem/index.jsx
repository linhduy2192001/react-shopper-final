import { currency } from "@/utils";
import React from "react";

export const CartItem = ({ product, quantity }) => {
  return (
    <li className="list-group-item">
      <div className="row align-items-center">
        <div className="w-[120px]">
          {/* Image */}
          <a href="./product.html">
            <img className="img-fluid" src={product.thumbnail_url} alt="..." />
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
              <button className="btn">-</button>
              <input defaultValue={1} />
              <button className="btn">+</button>
            </div>
            {/* Remove */}
            <a className="ml-auto text-gray-400 font-size-xs" href="#!">
              <i className="fe fe-x" /> Xóa
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};
