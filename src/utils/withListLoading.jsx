import React from "react";

export const withListLoading = (Component, LoadingComponent = Component) => {
  return ({ loadingCount = 3, data, loading, empty, ...props }) => {
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
      : empty || (
          <div className="col-12 ">
            <p className="w-full p-5 mb-5 text-xl text-center border">
              Không tìm thấy dữ liệu 😔
            </p>
          </div>
        );
  };
};
