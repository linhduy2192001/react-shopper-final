import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { cn } from "@/utils";

export default function Button({ outline, children, loading, ...props }) {
  return (
    <button
      {...props}
      className={cn("btn btn-sm flex items-center gap-2", props.className, {
        "disabled pointer-events-none": loading,
        "btn-dark": !outline,
        "btn-outline-dark": outline,
      })}
    >
      {loading && <LoadingOutlined />}
      {children}
    </button>
  );
}
