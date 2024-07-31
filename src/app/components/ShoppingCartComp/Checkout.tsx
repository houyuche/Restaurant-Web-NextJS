"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Item } from "../Interface";
import { useCart } from "@/CartContext";

interface Props {
  totalPrice: number;
  cart: Item[];
}

const Checkout = ({ totalPrice, cart }: Props) => {
  const { data: session } = useSession();
  const rewardPoints = session?.user.reward || 0;

  const [rewardSelected, setRewardSelected] = useState("no");
  const [rewardValue, setRewardValue] = useState(0);

  const {clearCart} = useCart();

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRewardSelected(e.target.value);
    if (e.target.value === "no") {
      setRewardValue(0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRewardValue(
      Math.max(0, Math.min(rewardPoints!, Number(e.target.value)))
    );
  };

  const sendOrder = () => {
    const username = session?.user.email;
    const reward = (totalPrice - rewardValue)/10 - rewardValue;
    const payload = JSON.stringify({ cart, reward, username });
    navigator.sendBeacon(
      "https://yuchen-react-proj.azurewebsites.net/place_order/",
      payload
    );
    console.log(payload);
    clearCart();
  };

  return (
    <div className="w-1/2 ml-auto">
      <div className="flex items-center justify-between">
        <p className="text-xl">Payment Method: </p>
        <div className="flex items-center">
          <p className="text-xl mx-1">Cash</p>
          <input type="radio" className="radio" defaultChecked />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xl">Delivery Method:</p>
        <div className="flex items-center">
          <p className="text-xl mx-1">Take out</p>
          <input type="radio" className="radio" defaultChecked />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 mb-1">
        <p className="text-xl">Rewards Available:</p>
        <p className="text-xl mr-1">${rewardPoints.toFixed(2)}</p>
      </div>
      <div className="flex items-top justify-between">
        <p className="text-xl">Use Reward?</p>

        <div className="flex flex-col items-end">
          <div className="flex items-center">
            <p className="text-xl mx-1">No</p>
            <input
              type="radio"
              name="reward"
              value="no"
              className="radio"
              checked={rewardSelected === "no"}
              onChange={handleRadioChange}
            />
          </div>
          <div className="flex items-center">
            <input
              type="number"
              value={rewardValue}
              onChange={handleInputChange}
              step={0.01}
              className="input input-sm input-bordered w-1/3 ml-auto max-w-sm"
              disabled={rewardSelected === "no"}
            />
            <p className="text-xl mx-1">Yes</p>
            <input
              type="radio"
              name="reward"
              value="yes"
              className="radio"
              checked={rewardSelected === "yes"}
              onChange={handleRadioChange}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-xl">Sub Total:</p>
        <div className="flex items-center">
          <p className="text-xl mx-1">${totalPrice.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xl">Rewards:</p>
        <div className="flex items-center">
          <p className="text-xl mx-1">-${rewardValue.toFixed(2)}</p>
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-between mt-4">
        <p className="text-xl">Total:</p>
        <div className="flex items-center">
          <p className="text-xl mx-1">
            ${(totalPrice - rewardValue).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Link href="/confirmation" className="btn btn-primary text-l" onClick={sendOrder} >
          Place Order
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
