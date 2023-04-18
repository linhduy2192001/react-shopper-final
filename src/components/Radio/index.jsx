import React, { createContext, useContext, useState } from "react";

const Context = createContext({});

export default function Radio({ children, ...props }) {
  const { value, onChange } = useContext(Context);
  return (
    <div
      className="custom-control custom-radio mb-3"
      onClick={() => onChange(props.value)}
    >
      <input
        checked={props.value == value}
        className="custom-control-input"
        type="radio"
        defaultChecked
      />
      <label
        className="custom-control-label flex items-center"
        htmlFor="seasonOne"
      >
        {children}
      </label>
    </div>
  );
}

Radio.Group = ({ children, defaultValue, toggle, ...props }) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (_value) => {
    if (toggle && _value == value) {
      setValue();
      props?.onChange?.();
      return;
    }
    setValue(_value);
    props?.onChange?.(_value);
  };
  return (
    <Context.Provider value={{ value, onChange }}>{children}</Context.Provider>
  );
};
