import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Layout from '@/components/Layout/Layout'
import Link from 'next/link'

export default function ProductsList() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data)
        })
    }, [])

    return (
        <Layout>
            <h4 className='text_light'>Toate produsle</h4>
            <div className='w-full h-full flex items-center justify-center'>
                <div className='grid grid-cols-3 gap-10'>
                    {products.map(product => (
                        <Link href={`/products/[id]`} as={`/products/${product._id}`}>
                            <div className='bg-[#ececec] py-10 flex items-center justify-center flex-col text-center rounded-xl' key={product._id}>
                                <img key={images._id} className='w-[150px] h-[150px] rounded-xl' src={product.images[0]}></img>
                                <p className='mt-10'>{product.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout >
    )
}

