import { cn } from "@/utils";
import React, { useId } from "react";
import { ErrorText, FieldStyle } from "./style";

export default function Field({ lable, error, onChange, ...props }) {
  const id = useId();
  const _onChange = (ev) => {
    onChange?.(ev.target.value);
  };
  return (
    <FieldStyle className={cn("form-group relative", { error })}>
      <label className="sr-only">Email Address *</label>
      <input
        onChange={_onChange}
        className="form-control form-control-sm"
        {...props}
        id={id}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </FieldStyle>
  );
}