import React from "react";
import { Link } from "react-router-dom";

export const Breadcrumb = ({ children }) => {
  return (
    <ol className="text-gray-400 breadcrumb mb-md-0 font-size-xs">
      {children}
    </ol>
  );
};

Breadcrumb.Item = ({ to, children }) => {
  const Component = to ? Link : React.Fragment;
  return (
    <li className="breadcrumb-item">
      {" "}
      <Component className="text-gray-400" to={to}>
        {children}
      </Component>
    </li>
  );
};
