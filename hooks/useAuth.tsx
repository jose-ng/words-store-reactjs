import { FormLogin } from '@/models/auth.models';
import AuthService from '@/services/auth.service';
import React, { useState } from 'react'

function useAuth() {
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
        const res = await authService.login(formAuth);
        debugger
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

export default useAuth