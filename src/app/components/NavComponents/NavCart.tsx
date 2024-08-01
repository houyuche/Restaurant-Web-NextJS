"use client";
import React, { useEffect } from "react";
import menuData from "@/menu.json";
import Link from "next/link";
import { Item } from "../Interface";
import { useCart } from "@/CartContext";

interface Props {
  email: string;
  userCart: Item[];
}

const NavCart = ({ userCart, email }: Props) => {
  const { cart, setInitialCart } = useCart();

  useEffect(() => {
    setInitialCart(userCart);
  }, []);

  useEffect(() => {
    const payload = JSON.stringify({ email, cart });
    navigator.sendBeacon(
      "https://yuchen-react-proj.azurewebsites.net/update_cart/",
      payload
    );
    //console.log(payload);
  }, [cart]);


  const totalPrice = cart.reduce((total, cartItem) => {
    const menuItem = menuData.find((item) => item.name === cartItem.name);
    if (menuItem) {
      total += parseFloat(menuItem.price) * cartItem.quantity;
    }
    return total;
  }, 0);

  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">{totalCount}</span>
          </div>
        </div>
        <div
          tabIndex={0}
          className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
        >
          <div className="card-body">
            <span className="text-lg font-bold">
              {totalCount} {totalCount > 1 ? "Items" : "Item"}
            </span>
            <span className="text-info">
              Subtotal: ${totalPrice.toFixed(2)}
            </span>
            <div className="card-actions">
              <Link className="btn btn-primary btn-block" href={"/cart"}>
                View cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavCart;
