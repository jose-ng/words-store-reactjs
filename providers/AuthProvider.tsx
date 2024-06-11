"use client";
import { useAuth } from '@hooks/useAuth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken, selectToken } from '@utils/redux/slices/token.slice';
import { selectUserLoggedIn } from '@utils/redux/slices/user.slice';

interface Props {
  children: React.ReactNode;
}
function AuthProvider({ children }: Props) {
  const { authTokenIsValid } = useAuth();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const checkValidity = () => {
    if (!authTokenIsValid()) {
      dispatch(removeToken());
      dispatch(selectUserLoggedIn(false));
    }
  };
  useEffect(() => {
    if (token.exp) checkValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return <React.Fragment>{children}</React.Fragment>;
}

export { AuthProvider };
