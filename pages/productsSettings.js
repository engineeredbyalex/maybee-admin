import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Layout from '@/components/Layout/Layout'
import Link from 'next/link'


export default function ProductsSettings() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data)
        })
    }, [])
    return (
        <Layout>
            <h4 className='text_light'>Setari produse - promotii / disscount </h4>
            <div className='w-full h-full flex items-center justify-start'>
                <div className='flex flex-col '>
                    {products.map(product => (

                        <div className='mt-5 flex flex-row gap-5' key={product._id}>
                            <p className=''>{product.title}</p>
                            <div className='flex flex-row gap-5'>
                                <p className='text_light'>disscount ?</p>
                                <input type='checkbox' />
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </Layout >
    )
}

