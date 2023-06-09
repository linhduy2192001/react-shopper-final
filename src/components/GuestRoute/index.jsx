import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute({ redirect = "/" }) {
  const { user } = useAuth();

  if (user) return <Navigate to={redirect} />;
  return <Outlet />;
}
