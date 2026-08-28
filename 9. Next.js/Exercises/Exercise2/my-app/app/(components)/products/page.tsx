export const dynamic = 'force-dynamic'

import React, { Suspense } from 'react'
import Counter from '../counter/page'
import SlowComponent from '../slowComponent/page'

interface Product {
    id: number
    title: string
    description: string
    price: number
    category: string
    availabilityStatus: string
    brand: string
    discountPercentage: number
    rating: number
    images: string[]
    thumbnail: string
}

interface ProductsResponse {
    products: Product[]
}

const Page = async () => {
    try {
        const res = await fetch('https://dummyjson.com/products')

        const data: ProductsResponse = await res.json()
        const products = data.products

        return (
            <div className="flex flex-col items-center gap-6 my-10 px-4">
                <div>          
                    {/* counter components */}
                    <Counter/>
                </div>
                {/* Slow component */}
                <div>
                    <Suspense fallback='Wait for 3seconds...'>     
                        <SlowComponent/>
                    </Suspense>
                </div>
                <h3>Products componet (Server)</h3>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Products <span className="text-gray-400">({products.length})</span>
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-5xl">
                    {products.slice(0, 6).map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="bg-gray-50 aspect-square flex items-center justify-center p-4">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="max-h-full max-w-full"
                                />
                            </div>

                            <div className="p-4 flex flex-col gap-1">
                                <span className="text-xs uppercase tracking-wide text-gray-400">
                                    {product.brand}
                                </span>
                                <h2 className="font-medium text-gray-800 truncate">
                                    {product.title}
                                </h2>

                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-lg font-semibold text-gray-900">
                                        ${product.price}
                                    </span>
                                    {product.discountPercentage > 0 && (
                                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                            -{Math.round(product.discountPercentage)}%
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-yellow-500 text-sm">★</span>
                                    <span className="text-sm text-gray-500">{product.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        )
    } catch (error) {
        return (
            <div className="min-h-screen flex items-center justify-center my-10 text-red-500">
                Failed to load products..
            </div>
        )
    }
}

export default Page