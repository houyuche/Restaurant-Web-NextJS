"use client";
import React, { RefObject, useState } from "react";
import { Item, MenuItem } from "../Interface";
import { useCart } from "@/CartContext";
import Image from "next/image";

interface Props {
  modalRef: RefObject<HTMLDialogElement>;
  closeModal: () => void;
  item: MenuItem;
  count: number;
  setCount: (c: number) => void;
  openAlert: (i: boolean) => void;
}

const MenuModal = ({
  modalRef,
  closeModal,
  item,
  count,
  setCount,
  openAlert,
}: Props) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    const newItem: Item = { name: item.name, quantity: count };
    addToCart(newItem);
    closeModal();
    openAlert(true);
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
        <h1 className="font-bold text-xl">{item.name}</h1>

        <h1 className="font-bold text-lg opacity-70"> US${item.price}</h1>
        <div className="badge badge-accent badge-outline">{item.category}</div>

        <Image
          src="https://cdn.pixabay.com/photo/2024/05/13/19/19/ufo-8759621_1280.png"
          alt={item.name}
          width={100}
          height={100}
          className="w-1/2"
        />
        <div className="modal-action flex justify-between">
          <div className="join">
            <button
              className="join-item btn"
              disabled={count === 1}
              onClick={() => setCount(count - 1)}
            >
              «
            </button>
            <button className="join-item btn">{count}</button>
            <button
              className="join-item btn"
              onClick={() => setCount(count + 1)}
            >
              »
            </button>
          </div>
          <button className="btn" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default MenuModal;
