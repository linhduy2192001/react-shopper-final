import { cn } from "@/utils";
import React from "react";
import { SelectStyle } from "./style";

export const Select = ({ error, children, ...props }) => {
  return (
    <SelectStyle
      {...props}
      onChange={(ev) => props?.onChange?.(ev.target.value)}
      className={cn("custom-select", {
        "border border-solid text-[red] !border-[red]": error,
      })}
    >
      {children}
    </SelectStyle>
  );
};
