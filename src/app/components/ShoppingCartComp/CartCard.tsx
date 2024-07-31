"use client";
import React from "react";
import { Item, MenuItem } from "../Interface";
import menuData from "@/menu.json";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "@/CartContext";

interface Props {
  item: Item;
}

const CartCard = ({ item }: Props) => {
  const foundItem = menuData.find((data: MenuItem) => data.name === item.name);
  const totalPrice = foundItem ? item.quantity * Number(foundItem.price) : 0;

  const { addToCart, removeFromCart } = useCart();

  return (
    <div className="card card-side bg-base-100 w-full shadow-xl my-2">
      <figure>
        <img
          src="https://cdn.pixabay.com/photo/2024/05/13/19/19/ufo-8759621_1280.png"
          alt={item.name}
          className="w-32"
        />
      </figure>
      <div className="card-body flex flex-row items-center justify-between">
        <div>
          <h2 className="card-title">{item.name}</h2>
          <p>US${totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex flex-row items-center">
          <div className="join mr-2">
            <button
              className="join-item btn"
              onClick={() => removeFromCart({ name: item.name, quantity: 1 })}
            >
              -
            </button>
            <button className="join-item btn">{item.quantity}</button>
            <button
              className="join-item btn"
              onClick={() => addToCart({ name: item.name, quantity: 1 })}
            >
              +
            </button>
          </div>
          <FaTrashAlt
            className="cursor-pointer"
            onClick={() => removeFromCart(item)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartCard;
