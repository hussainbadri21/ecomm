'use client'
import React, { useContext, useState } from "react"
import Container from "../Container"
import { api } from '~/trpc/react'
import { toast } from 'react-toastify';
import UserContext from '~/app/utils/userContext';
import { useRouter } from 'next/navigation'
import EmailField from '~/app/_components/Fields/Email'
import PasswordField from "~/app/_components/Fields/Password";

const RegistrationForm = () => {
    const router = useRouter()
    const { setUserData } = useContext(UserContext);

    const registerUser = api.user.signup.useMutation({
        onSuccess: (data) => {
            setUserData(data)
            sessionStorage.setItem('token', btoa(`${data.name}${data.email}${data.password}`))
            toast.success(`Account created successfully! Verification code ${data.code.toLocaleUpperCase()} sent to your email.`);
            router.push(`/verify`)
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [errorMsg, setErrorMsg] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMsg('')
        // Validate name
        if (formData.name === '') {
            setErrorMsg('Name is required');
            return;
        }

        // Validate email
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
        const code = Math.random().toString(36).slice(2, 10);
        registerUser.mutate({ ...formData, password: btoa(formData.password), code, status: 1 })
    }

    return (
        <Container type="signup">
            <form className="flex flex-col w-3/4 pt-8" onSubmit={handleSubmit} autoComplete="off" >
                <label className='text-black' htmlFor="name">Name</label>
                <input className="p-2 rounded" type="text" id="name" name="name" placeholder="Enter your name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <EmailField {...{ formData, setFormData }} />
                <PasswordField {...{ formData, setFormData }} />
                {errorMsg && errorMsg.length > 0 && <div className="text-red-500 font-bold pt-4">{errorMsg}</div>}

                <button disabled={registerUser.isPending} className="cursor-pointer bg-black hover:bg-gray-700 text-white font-bold py-4 px-4 rounded mt-8 uppercase" type="submit"> {registerUser.isPending ? 'Submitting...' : 'Create account'}</button>

            </form >
        </Container >
    )
}
export default RegistrationForm;