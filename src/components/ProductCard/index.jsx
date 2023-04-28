import { useCategory } from "@/hooks/useCategories";
import { productService } from "@/services/product";
import { currency, handleError } from "@/utils";
import React, { useRef } from "react";
import Skeleton from "../Skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/config";
import { Popconfirm } from "../Popconfirm";
import { message } from "antd";
import { withListLoading } from "@/utils/withListLoading";
import { useAction } from "@/hooks/useAction";
import { Rating } from "../Rating";
import { useDispatch } from "react-redux";
import { updateCartItemAction } from "@/stores/cart";
import { useCart } from "@/hooks/useCart";

export default function ProductCard({
  onRemoveWishlistSuccess,
  showRemove,
  showWishlist,
  id,
  name,
  price,
  real_price,
  slug,
  images,
  discount_rate,
  review_count,
  rating_average,
  categories,
}) {
  const img1 = images?.[0].thumbnail_url;
  const img2 = images?.[1] ? images?.[1].thumbnail_url : img1;
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useCart();

  const category = useCategory(categories);
  const onAddWishlist = useAction({
    service: () => productService.addWishlist(id),
    loadingMessage: `Đang thêm sản phẩm ${name} vào yêu thích`,
    successMessage: `Thêm sản phẩm ${name} vào yêu thích thành công`,
  });

  // const flagWishlistRef = useRef(false);

  // const onAddWishlist = async () => {
  //   if (flagWishlistRef.current) return;

  //   flagWishlistRef.current = true;
  //   const key = `add-wishlist-${id}`;
  //   try {
  //     message.loading({
  //       key,
  //       content: `Đang thêm sản phẩm ${name} vào yêu thích`,
  //       duration: 0,
  //     });
  //     await productService.addWishlist(id);
  //     message.success({
  //       key,
  //       content: `Thêm sản phẩm ${name} vào yêu thích thành công`,
  //     });
  //   } catch (err) {
  //     handleError(err, key);
  //   }

  //   flagWishlistRef.current = false;
  // };
  const onRemoveWishlist = useAction({
    service: () => productService.removeWishlist(id),
    loadingMessage: `Đang xoá sản phẩm ${name} khỏi yêu thích`,
    successMessage: `Xoá sản phẩm ${name} khỏi yêu thích thành công`,
    onSuccess: onRemoveWishlistSuccess,
  });

  // const onRemoveWishlist = async () => {
  //   const key = `remove-wishlist-${id}`;
  //   try {
  //     message.loading({
  //       key,
  //       content: `Đang xoá sản phẩm ${name} khỏi yêu thích`,
  //       duration: 0,
  //     });
  //     await productService.removeWishlist(id);
  //     message.success({
  //       key,
  //       content: `Xoá sản phẩm ${name} khỏi yêu thích thành công`,
  //     });
  //     onRemoveWishlistSuccess?.(id);
  //   } catch (err) {
  //     handleError(err, key);
  //   }
  // };
  const onAddCartItem = () => {
    if (user) {
      const { listItems } = cart;
      const product = listItems.find((e) => e.productId === id);
      console.log("listItems", listItems);
      dispatch(
        updateCartItemAction({
          productId: id,
          quantity: product ? product.quantity + 1 : 1,
          showPopover: true,
        })
      );
    } else {
      navigate(PATH.Account);
    }
  };
  return (
    <div className="col-6 col-md-4">
      <div className="product-card card mb-7">
        {discount_rate > 0 && (
          <div className="card-sale badge badge-dark card-badge card-badge-left text-uppercase">
            - {discount_rate}%
          </div>
        )}
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
                onClick={onAddCartItem}
                className="btn btn-xs btn-circle btn-white-primary"
                data-toggle="button"
              >
                <i className="fe fe-shopping-cart" />
              </button>
            </span>

            {showWishlist && (
              <Popconfirm
                disabled={!!user}
                title="Thông báo"
                description="Vui lòng đăng nhập trước khi đưa sản phẩm vào yêu thích"
                onConfirm={() => navigate(PATH.Account)}
                okText="Đăng nhập"
                showCancel={false}
              >
                <span className="card-action">
                  <button
                    onClick={user ? onAddWishlist : undefined}
                    className="btn btn-xs btn-circle btn-white-primary"
                    data-toggle="button"
                  >
                    <i className="fe fe-heart" />
                  </button>
                </span>
              </Popconfirm>
            )}

            {showRemove && (
              <span className="card-action">
                <button
                  onClick={onRemoveWishlist}
                  className="btn btn-xs btn-circle btn-white-primary"
                  data-toggle="button"
                >
                  <i className="fe fe-x" />
                </button>
              </span>
            )}
          </div>
        </div>
        {/* Body */}
        <div className="px-0 card-body">
          {/* Category */}
          <div className="card-product-category font-size-xs">
            {category && (
              <a className="text-muted" href="shop.html">
                {category.title}
              </a>
            )}
          </div>
          {/* Title */}
          <div className="card-product-title font-weight-bold">
            <a className="text-body card-product-name" href="product.html">
              {name}
            </a>
          </div>
          <div className="card-product-rating">
            {review_count > 0 && (
              <>
                {rating_average}
                <Rating value={rating_average} />
                {review_count}
              </>
            )}
          </div>

          {/* Price */}
          <div className="card-product-price">
            {real_price < price ? (
              <>
                <span className="text-primary sale">
                  {currency(real_price)}
                </span>
                <span className="ml-1 font-size-xs text-gray-350 text-decoration-line-through">
                  {currency(price)}
                </span>
              </>
            ) : (
              <span className="ml-1 font-size-xs text-gray-350 text-decoration-line-through">
                {real_price}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const ProductCardLoading = () => {
  return (
    <div className="col-6 col-md-4">
      <div className="product-card card mb-7">
        <div className="card-img">
          {/* Image */}
          <a className="card-img-hover" href="product.html">
            <Skeleton height={300} />
          </a>
          {/* Actions */}
        </div>
        {/* Body */}
        <div className="px-0 card-body">
          {/* Category */}
          <div className="card-product-category font-size-xs">
            <a className="text-muted" href="shop.html">
              <Skeleton height="100%" width={150} />
            </a>
          </div>
          {/* Title */}
          <div className="card-product-title font-weight-bold">
            <a className="text-body card-product-name" href="product.html">
              <Skeleton height="100%" width={150} />
            </a>
          </div>
          <div className="card-product-rating">
            <Skeleton height="100%" width={150} />
          </div>

          {/* Price */}
          <div className="card-product-price">
            <Skeleton height="100%" width={100} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ListProductCard = withListLoading(
  ProductCard,
  ProductCardLoading,
  <div className="col-12">
    {" "}
    <p className="w-full p-5 mb-5 text-xl text-center border">
      Không tìm thấy sản phẩm nào 😞
    </p>
  </div>
);
