import React from "react";

export const withListLoading = (
  Component,
  LoadingComponent = Component,
  empty2
) => {
  return ({ loadingCount = 3, data, empty, loading, ...props }) => {
    return loading
      ? Array.from(Array(loadingCount)).map((_, i) => (
          <LoadingComponent key={i} loading />
        ))
      : data.length > 0
      ? data.map((e) => (
          <React.Fragment key={e.id}>
            <Component {...e} {...props} />
          </React.Fragment>
        ))
      : empty ||
        empty2 || (
          <div className="col-12 ">
            <p className="w-full p-5 mb-5 text-xl text-center border">
              Không tìm thấy dữ liệu 😔
            </p>
          </div>
        );
  };
};
