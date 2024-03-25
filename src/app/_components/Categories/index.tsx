'use client'
import Container from "../Container"
import { api } from '~/trpc/react'
import { useState } from "react"
import Paginator from "~/app/_components/Paginator"
import UserContext from '~/app/utils/userContext';
import React, { useContext } from "react"
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

const CategoriesForm = () => {
    const [page, setPage] = useState(1);
    const { userData } = useContext(UserContext);
    const router = useRouter()

    console.log(sessionStorage.getItem('token'),)

    const categoryData = api.category.fetch.useQuery({ page, token: sessionStorage.getItem('token') === btoa(`${userData.name}${userData.email}${userData.password}`) });

    if (categoryData.isError) {
        toast.error('You need to be logged in to access this page');
        router.push(`/login`)
    }

    return (
        <Container type="categories" >
            <div className="flex flex-col w-3/4 py-8 sm:pt-4 -mb-8 text2xl text-center text-black">
                <div className="-mt-2">We will keep you notified.</div>
                {categoryData.isLoading ?
                    <div className="text-center text-black my-8">Loading...</div> :
                    <div className="flex flex-col justify-center items-start mt-4">
                        {categoryData?.data?.[1]?.map((category) =>
                            <div className="mt-1" key={category.id}>
                                <input type="checkbox" />
                                <label>{category.name}</label>
                            </div>
                        )}
                    </div>
                }
            </div>
            <Paginator currentPage={page} totalPages={categoryData?.data?.[0] ?? 100} setPage={setPage} />
        </Container >
    )
}

export default CategoriesForm
