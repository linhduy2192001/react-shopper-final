import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { cn } from "@/utils";

export default function Button({ children, loading, ...props }) {
  return (
    <button
      className={cn("btn btn-sm btn-dark flex items-center gap-2", {
        "disabled pointer-events-none": loading,
      })}
      {...props}
    >
      {loading && <LoadingOutlined />}
      {children}
    </button>
  );
}
