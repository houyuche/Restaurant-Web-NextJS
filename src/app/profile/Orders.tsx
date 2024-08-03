"use client";
import React, { useState, useRef } from "react";
import { PastOrder } from "../components/Interface";
import Alert from "../components/Alert";
import OrderModal from "./OrderModal";

interface Props {
  orders: PastOrder[];
  cancelOrder: (o: PastOrder) => void;
}

const Orders = ({ orders, cancelOrder }: Props) => {
  const [alertVisible, setAlertVisible] = useState(false);

  const orderModalRef = useRef<HTMLDialogElement>(null);
  const [orderModalContent, setOrderModalContent] = useState<PastOrder>({
    id: 0,
    username_id: 0,
    time: "",
    items_ordered: [],
    reward_change: 0,
    status: "",
  });

  const openOrderingModal = (order: PastOrder) => {
    setOrderModalContent(order);
    if (orderModalRef.current) {
      orderModalRef.current.showModal();
    }
  };

  const closeOrderModal = () => {
    if (orderModalRef.current) {
      orderModalRef.current.close();
    }
  };

  const handleCancel = (o: PastOrder) => {
    cancelOrder(o);
    setAlertVisible(true);
  };

  const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  return (
    <>
      <div className="max-h-80 overflow-y-auto">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th>Order#</th>
              <th>Time</th>
              <th>Item Ordered</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <th>{order.id}</th>
                <td>{formatTime(order.time)}</td>
                <td>
                  <div className="overflow-y-scroll max-h-10">
                    {order.items_ordered.map((item, i) => (
                      <span key={i}>
                        {item.name + "(" + item.quantity + ") "}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{order.status.toUpperCase()}</td>
                {order.status.toUpperCase() === "IN PROGRESS" && (
                  <td>
                    <div
                      className="btn btn-outline btn-error btn-sm"
                      onClick={() => openOrderingModal(order)}
                    >
                      Cancel
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <OrderModal
        modalRef={orderModalRef}
        closeModal={closeOrderModal}
        order={orderModalContent}
        onCancel={handleCancel}
      />
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
        {alertVisible && (
          <Alert message="Order canceled!" turnOffAlert={setAlertVisible} />
        )}
      </div>
    </>
  );
};

export default Orders;
