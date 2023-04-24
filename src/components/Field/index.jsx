import { cn } from "@/utils";
import React, { useId } from "react";
import { ErrorText, FieldStyle } from "./style";

export default function Field({
  label,
  error,
  onChange,
  renderField,
  ...props
}) {
  const id = useId();

  const _onChange = (ev) => {
    onChange?.(ev.target.value);
  };
  return (
    <FieldStyle className={cn("form-group relative", { error })}>
      {label && <label htmlFor={id}>{label}</label>}

      {renderField ? (
        renderField({ ...props, error, label, onChange, id })
      ) : (
        <input
          onChange={_onChange}
          className="form-control form-control-sm"
          {...props}
          id={id}
        />
      )}

      {error && <ErrorText>{error}</ErrorText>}
    </FieldStyle>
  );
}
