import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Link from "next/link";

export default function OrdersPage() {
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
      <h1>Comenzi</h1>

      <div className="mb-10">
        <h2>
          Stripe
        </h2>
        <div className="flex flex-col items-start gap-[15px]">
          <button className="bg-black p-2 rounded-lg text-white max-w-[150px]"><Link target="_blank" href={'https://dashboard.stripe.com/payments'}>Vezi comenzi pe Stripe</Link></button>
          <button className="bg-black p-2 rounded-lg text-white max-w-[150px]"><Link href={'https://dashboard.stripe.com/balance/overview'}>Vezi blanță pe Stripe</Link></button>
          <button className="bg-black p-2 rounded-lg text-white max-w-[150px]"><Link href={'https://dashboard.stripe.com/customers'}>Vezi clienți pe Stripe</Link></button>
        </div>
      </div>
      <table className="basic">
        <thead>
          <tr>
            <th>Dată</th>
            <th>Client</th>
            <th>Produse</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4}>
                <div className="py-4">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          ) : (
              orders.map((order, index) => (
                <tr key={order._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                  {/* <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                  {order.paid ? 'Da' : 'Nu'}
                </td> */}
                <td>
                    <p>Nume : {order.name} </p>
                    <p>Adresă de email : {order.email} </p>
                    <p>Număr de telefon : {order.phone}</p>
                    <p>Oraș : {order.city}</p>
                    <p>Cod poștal : {order.postalCode}</p>
                    <p>Județ : {order.country} </p>
                    <p>Adresă : {order.streetAddress} </p>
                  </td>
                  <td>
                    {order.line_items.map((l, index) => (
                      <div key={index} className="border border-black p-2 mb-2">
                        <p>Nume : {l.title}</p>
                        <p>Parfum : {l.selectedScent}</p>
                        <p>Decoratiune : {l.selectedDecoration}</p>
                        <p>Cantitate : {l.quantity}</p>
                      </div>
                    ))}
                  </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
}
