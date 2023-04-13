import { cn } from "@/utils";
import React from "react";
import { SkeletonStyle } from "./style";

const Skeleton = ({ shape, width, height, children, ...props }) => {
  return (
    <SkeletonStyle
      style={{ width, height }}
      className={cn(shape, props.className)}
      {...props}
    >
      {" "}
      {children}
    </SkeletonStyle>
  );
};

export default Skeleton;
