'use client'

import CategoriesForm from "../_components/Categories";
import { isLoggedIn } from '~/app/utils/validateSession'
import { useRouter } from 'next/navigation'
import UserContext from '~/app/utils/userContext';
import React, { useContext, useEffect } from "react"
import { toast } from 'react-toastify';

const Categories = () => {
    const router = useRouter()
    const { userData } = useContext(UserContext);
    const isUserLoggedIn = isLoggedIn(userData?.name ?? '', userData?.email ?? '', userData?.password ?? '')
    useEffect(() => {
        if (!isUserLoggedIn) {
            toast.error('You need to be logged in to access this page');
            router.push(`/login`)
        }
    }, [])
    return (
        <div>
            {isUserLoggedIn && <CategoriesForm />}
        </div>
    );
};

export default Categories;