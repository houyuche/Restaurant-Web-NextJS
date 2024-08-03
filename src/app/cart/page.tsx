"use client";
import React from "react";
import { useCart } from "@/CartContext";
import CartCard from "../components/ShoppingCartComp/CartCard";
import menuData from "@/menu.json";
import { SessionProvider } from "next-auth/react";
import Checkout from "../components/ShoppingCartComp/Checkout";


const Page = () => {
  const { cart, clearCart } = useCart();

  const totalPrice = cart.reduce((total, cartItem) => {
    const menuItem = menuData.find((item) => item.name === cartItem.name);
    if (menuItem) {
      total += parseFloat(menuItem.price) * cartItem.quantity;
    }
    return total;
  }, 0);

  return (
    <div className="w-2/3 mx-auto my-4">
      <h1 className="font-bold text-3xl mb-4">Shopping Cart</h1>
      {cart.length > 0 ? (
        cart.map((item) => <CartCard key={item.name} item={item} />)
      ) : (
        <h1 className="opacity-50 text-3xl text-center mt-5">Cart is empty</h1>
      )}
      {cart.length > 0 && (
        <>
          <div className="flex justify-end mb-4">
            <button className="btn btn-outline btn-error text-l my-2" onClick={clearCart}>Clear</button>
          </div>
          <h1 className="font-bold text-3xl mt-8 text">Checkout</h1>
          <hr className="mb-4" />

          <SessionProvider>
            <Checkout totalPrice={totalPrice} cart={cart} />
          </SessionProvider>
        </>
      )}
    </div>
  );
};

export default Page;
