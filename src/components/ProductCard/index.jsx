import React from "react";

const ProductCard = ({ name, price, real_price, slug, images }) => {
  const img1 = images?.[0].thumbnail_url;
  const img2 = images?.[1] ? images?.[1].thumbnail_url : img1;
  return (
    <div className="col-6 col-md-4">
      <div className="product-card card mb-7">
        <div className="card-sale badge badge-dark card-badge card-badge-left text-uppercase">
          - 50%
        </div>
        <div className="card-img">
          {/* Image */}
          <a className="card-img-hover" href="product.html">
            <img className="card-img-top card-img-back" src={img1} alt="..." />
            <img className="card-img-top card-img-front" src={img2} alt="..." />
          </a>
          {/* Actions */}
          <div className="card-actions">
            <span className="card-action"></span>
            <span className="card-action">
              <button
                className="btn btn-xs btn-circle btn-white-primary"
                data-toggle="button"
              >
                <i className="fe fe-shopping-cart" />
              </button>
            </span>
            <span className="card-action">
              <button
                className="btn btn-xs btn-circle btn-white-primary"
                data-toggle="button"
              >
                <i className="fe fe-heart" />
              </button>
            </span>
          </div>
        </div>
        {/* Body */}
        <div className="card-body px-0">
          {/* Category */}
          <div className="card-product-category font-size-xs">
            <a className="text-muted" href="shop.html">
              Shoes
            </a>
          </div>
          {/* Title */}
          <div className="card-product-title font-weight-bold">
            <a className="text-body card-product-name" href="product.html">
              {name}
            </a>
          </div>
          <div className="card-product-rating">
            5
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              size={14}
              color="#fdd836"
              height={14}
              width={14}
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "rgb(253, 216, 54)" }}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              size={14}
              color="#fdd836"
              height={14}
              width={14}
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "rgb(253, 216, 54)" }}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              size={14}
              color="#fdd836"
              height={14}
              width={14}
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "rgb(253, 216, 54)" }}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              size={14}
              color="#fdd836"
              height={14}
              width={14}
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "rgb(253, 216, 54)" }}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              size={14}
              color="#fdd836"
              height={14}
              width={14}
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "rgb(253, 216, 54)" }}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            (40 review)
          </div>
          {/* Price */}
          <div className="card-product-price">
            <span className="text-primary sale">$40.00</span>
            <span className="font-size-xs text-gray-350 text-decoration-line-through ml-1">
              $85.00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
