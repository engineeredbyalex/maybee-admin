import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Basic/Spinner";
import { subHours } from "date-fns";

export default function HomeStats() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/orders').then(res => {
      setOrders(res.data);
      setIsLoading(false);
    });
  }, []);

  function ordersTotal(orders) {
    let sum = 0;
    orders.forEach(order => {
      const { line_items } = order;
      line_items.forEach(li => {
        if (li.price_data && li.price_data.unit_amount) {
          const lineSum = li.quantity * li.price_data.unit_amount / 100;
          sum += lineSum;
        }
      });
    });
    return new Intl.NumberFormat('sv-SE').format(sum);
  }

  if (isLoading) {
    return (
      <div className="my-4">
        <Spinner fullWidth={true} />
      </div>
    );
  }

  const ordersToday = orders.filter(o => new Date(o.createdAt) > subHours(new Date, 24));
  const ordersWeek = orders.filter(o => new Date(o.createdAt) > subHours(new Date, 24 * 7));
  const ordersMonth = orders.filter(o => new Date(o.createdAt) > subHours(new Date, 24 * 30));

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Comenzi</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Astăzi</h3>
          <div className="text-3xl font-bold mb-2">{ordersToday.length}</div>
          <div>{ordersToday.length} comenzi astăzi</div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Această săptămână</h3>
          <div className="text-3xl font-bold mb-2">{ordersWeek.length}</div>
          <div>{ordersWeek.length} comenzi în această săptămână</div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Acest lună</h3>
          <div className="text-3xl font-bold mb-2">{ordersMonth.length}</div>
          <div>{ordersMonth.length} comenzi în această lună</div>
        </div>
      </div>
      <h2 className="text-2xl font-bold my-8">Venituri</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Astăzi</h3>
          <div className="text-3xl font-bold mb-2">{ordersTotal(ordersToday)} RON</div>
          <div>{ordersToday.length} comenzi astăzi</div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Această săptămână</h3>
          <div className="text-3xl font-bold mb-2">{ordersTotal(ordersWeek)} RON</div>
          <div>{ordersWeek.length} comenzi în această săptămână</div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Acest lună</h3>
          <div className="text-3xl font-bold mb-2">{ordersTotal(ordersMonth)} RON</div>
          <div>{ordersMonth.length} comenzi în această lună</div>
        </div>
      </div>
    </div>
  );
}
