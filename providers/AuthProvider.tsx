"use client";
import { useAuth } from "@hooks/useAuth";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "@utils/redux/slices/token.slice";

interface Props {
  children: React.ReactNode;
}
function AuthProvider({ children }: Props) {
  const { authTokenIsValid, signOut } = useAuth();
  const token = useSelector(selectToken);

  const checkValidity = () => {
    if (!authTokenIsValid()) {
      signOut(() => {
        window.location.href = "/";
      });
    }
  };

  useEffect(() => {
    if (token.exp) checkValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return <React.Fragment>{children}</React.Fragment>;
}

export { AuthProvider };
