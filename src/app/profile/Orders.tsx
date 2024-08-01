import React from "react";
import { PastOrder } from "../components/Interface";

interface Props {
  orders: PastOrder[];
}

const Orders = ({ orders }: Props) => {
    const formatTime = (time: string) => {
        const date = new Date(time);
        return date.toLocaleString();
      };

  return (
    <>
    <h1 className="text-xl mt-4">Past Orders</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Items Ordered</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="align-middle">
              <td className="py-2 px-4 border-b">{formatTime(order.time)}</td>
              <td className="py-2 px-4 border-b">
                {order.items_ordered.map((item, index) => (
                  <span key={index}>
                    {item.name} ({item.quantity})
                    {index < order.items_ordered.length - 1 ? ", " : ""}
                  </span>
                ))}
              </td>
              <td className="py-2 px-4 border-b">{order.status}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-red-500 text-white py-1 px-2 rounded">
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Orders;
