import { FormLogin } from '@/models/auth.models';
import AuthService from '@/services/auth.service';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setToken } from '../utils/redux/slices/token.slice';
import { setIsLoggedIn } from '../utils/redux/slices/user.slice';
import useAuth from './useAuth';
import { PAGES_ROUTES } from '@/utils/routes';
import { useSearchParams } from 'next/navigation'

function useLogin() {
  const { getUserData } = useAuth();
  const dispatch = useDispatch();
  const params = useSearchParams();
  let authService: AuthService;
  const [form, setForm] = useState<FormLogin>({
    email: '',
    password: ''
  });

  authService = AuthService.create();
  const handlerSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formAuth: FormLogin = {
      email: form.email,
      password: form.password
    }
    let res;
    try {

      res = await authService.login(formAuth);

      dispatch(setToken({ field: 'code', value: res.token }));
      const userData = getUserData(res.token);
      dispatch(setToken({ field: 'exp', value: userData.exp }));
      dispatch(setIsLoggedIn(true));
      const path = params.get("redirect");
      if (path) {
        window.location.href = path;
      } else
        // window.location.pathname =
        //   PAGES_ROUTES.profile.default + '/' + userData.username;
        window.location.href = '/';
    } catch (error) {
      debugger
    }

  }

  const handlerChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };
  return {
    handlerSubmit,
    form,
    handlerChangeValue
  }
}

export default useLogin