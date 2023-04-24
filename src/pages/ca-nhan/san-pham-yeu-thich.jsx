import Paginate from "@/components/Paginate";
import { Portal } from "@/components/Portal";
import ProductCard, { ProductCardLoading } from "@/components/ProductCard";
import { PROFILE_TITLE_ID } from "@/config";
import { useQuery } from "@/hooks/useQuery";
import { useSearch } from "@/hooks/useSearch";
import { productService } from "@/services/product";
import queryString from "query-string";
import React from "react";

export const WishlistPage = () => {
  const [search] = useSearch({
    page: 1,
  });

  const qs = queryString.stringify({
    page: search.page,
  });

  const {
    loading,
    data,
    refetch: fetchWishlist,
    clearPreviosData,
  } = useQuery({
    queryKey: [qs],
    queryFn: () => productService.getWishlist(`?${qs}`),
    keepPreviousData: true,
  });

  return (
    <>
      <Portal selector={PROFILE_TITLE_ID}>Sản phẩm yêu thích</Portal>
      <div>
        <div className="row">
          {loading
            ? Array.from(Array(6)).map((_, i) => <ProductCardLoading key={i} />)
            : data.data.map((e) => (
                <ProductCard
                  onRemoveWishlistSuccess={() => {
                    clearPreviosData();
                    fetchWishlist();
                  }}
                  showRemove
                  key={e.id}
                  {...e}
                />
              ))}
        </div>
        <Paginate totalPage={data?.paginate?.totalPage} />
      </div>
    </>
  );
};
