'use client'

import Container from "../Container"
import React, { useContext, useState } from "react"
import EmailField from '~/app/_components/Fields/Email'
import PasswordField from "~/app/_components/Fields/Password";
import { useRouter } from 'next/navigation'
import { api } from '~/trpc/react'
import { toast } from 'react-toastify';
import UserContext from '~/app/utils/userContext';

const LoginForm = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { setUserData } = useContext(UserContext);
    const router = useRouter()
    const loginUser = api.user.login.useMutation({
        onSuccess: (data) => {
            setUserData(data)
            sessionStorage.setItem('token', btoa(`${data.name}${data.email}${data.password}`))
            if (data.emailVerified) {
                toast.success(`Welcome to ECOMMERCE, ${data.name}!`);
                router.push(`/categories`)
            } else {
                router.push(`/verify`)
            }
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMsg('Invalid email address');
            return;
        }

        // Validate password
        if (formData.password.length < 6) {
            setErrorMsg('Password must be at least 6 characters');
            return;
        }
        loginUser.mutate({ ...formData, password: btoa(formData.password) })

    }
    return (
        <Container type="login">
            <div className="flex flex-col w-3/4 pt-4 -mb-8 text2xl text-center text-black">
                <h2 className="font-bold">Welcome back to ECOMMERCE</h2>
                <div className="-mt-2">The next gen business marketplace</div>
            </div>
            <form className="flex flex-col w-3/4 pt-8" onSubmit={handleSubmit}>
                <EmailField {...{ formData, setFormData }} />
                <PasswordField {...{ formData, setFormData }} />
                {errorMsg && errorMsg.length > 0 && <div className="text-red-500 font-bold pt-4">{errorMsg}</div>}
                <button disabled={loginUser.isPending} className="bg-black hover:bg-gray-700 text-white font-bold py-4 px-4 rounded mt-8 uppercase" type="submit"> {loginUser.isPending ? 'Logging in...' : 'Login'}</button>
            </form >
            <div className="border  border-solid mt-8 border-gray-300 w-3/4" />
        </Container >
    )
}
export default LoginForm;