import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";

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
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Dată</th>
            <th>Plătit</th>
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
            orders.map(order => (
              <tr key={order._id}>
                <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                  {order.paid ? 'Da' : 'Nu'}
                </td>
                <td>
                  {order.name} {order.email}<br />
                  {order.city} {order.postalCode} {order.country}<br />
                  {order.streetAddress}
                </td>
                <td>
                  <td>
                    {order.line_items.map(l => {
                      console.log(l); // Add this line
                      return (
                        <div key={l._id}>
                          <p>Nume : </p>{l.title}
                          <p>Parfum : {l.selectedScent}</p>
                          <p>Decoratiune : {l.selectedDecoration}</p>
                          <p>Cantitate : {l.quantity}</p>
                        </div>
                      );
                    })}
                  </td>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
}