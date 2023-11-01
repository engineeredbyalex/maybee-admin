import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Basic/Spinner";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/products').then(response => {
      setProducts(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Layout>
      <Link href={'/products/new'} className="bg-[#000] text-white font-bold py-2 px-4 rounded mb-2">
        Adauga un produs nou
      </Link>
      <table className="table-auto mt-2 text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 text_light"><p>Nume produs</p></th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={2}>
                <div className="py-4">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          )}
          {products.map(product => (
            <tr key={product._id}>
              <td className="border px-4 py-4">{product.title}</td>
              <td className="border px-4 py-4">
                <Link href={'/products/edit/' + product._id} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                  Editeaza
                </Link>
                <Link href={'/products/delete/' + product._id} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                  Sterge
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
