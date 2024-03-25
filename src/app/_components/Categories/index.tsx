'use client'
import Container from "../Container"
import { api } from '~/trpc/react'
import { useState } from "react"
import Paginator from "~/app/_components/Paginator"

const CategoriesForm = () => {
    const [page, setPage] = useState(1);
    const categoryData = api.category.fetch.useQuery({ page });
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
