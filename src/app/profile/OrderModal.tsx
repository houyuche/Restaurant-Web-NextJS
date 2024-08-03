import React, { RefObject } from "react";
import { PastOrder } from "../components/Interface";

interface Props {
  modalRef: RefObject<HTMLDialogElement>;
  closeModal: () => void;
  order: PastOrder;
  onCancel: (o: PastOrder) => void;
}

const OrderModal = ({ modalRef, closeModal, order, onCancel }: Props) => {
  const cancelOrder = () => {
    onCancel(order);
    const order_id = order.id;
    const payload = JSON.stringify({ order_id });
    navigator.sendBeacon(
      "https://yuchen-react-proj.azurewebsites.net/cancel_order/",
      payload
    );
    closeModal();
  };

  const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  return (
    <dialog className="modal" ref={modalRef}>
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeModal}
        >
          ✕
        </button>
        <h1 className="font-bold text-2xl">Cancel Order</h1>
        <hr className="my-2" />
        <h1 className="text-lg">
          <span className="font-semibold">Order placed at:</span>{" "}
          {formatTime(order.time)}
        </h1>
        <h1 className="text-lg">
          <span className="font-semibold">Status:</span>{" "}
          {order.status.toUpperCase()}
        </h1>
        <h1 className="text-lg font-semibold">Item ordered:</h1>
        <ul className="pl-6 max-h-48 overflow-y-auto">
          {order.items_ordered.map((item, index) => (
            <li key={index}> {item.name + " (" + item.quantity + ") "}</li>
          ))}
        </ul>
        <div className="modal-action">
          <button
            className="btn btn-primary text-l w-full"
            onClick={cancelOrder}
          >
            Cancel This Order
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default OrderModal;
