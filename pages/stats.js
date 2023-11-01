import Layout from '@/components/Layout/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'


export default function Stats() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get('/api/orders').then(response => {
            setOrders(response.data);
            setIsLoading(false);
        });
    }, []);


    return (

        <Layout>
            <h1 className='title'>Statistici</h1>

        </Layout>

    )
}

{/* <div className='mb-10'>

    <h2>Oraș</h2>
    {
        orders.map((order, index) => (
            <div key={order._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                <div>
                    <p>Oraș : {order.city}</p>
                    <p>Județ : {order.country} </p>
                </div>
            </div>
        ))
    }
</div> */}