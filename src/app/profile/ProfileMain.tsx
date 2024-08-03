"use client";
import React, { useEffect, useRef, useState } from "react";
import { Booking, PastOrder } from "../components/Interface";
import Orders from "./Orders";
import Bookings from "./Bookings";

interface Props {
  myOrders: PastOrder[];
  myBookings: Booking[];
}

const ProfileMain = ({ myOrders, myBookings }: Props) => {
  const [orders, setOrders] = useState<PastOrder[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setOrders(myOrders);
    setBookings(myBookings);
  }, []);

  const removeOrder = (order: PastOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === order.id ? { ...o, status: "canceled" } : o
      )
    );
  };

  const removeBooking = (booking: Booking) => {
    setBookings((prevBookings) =>
      prevBookings.map((b) =>
        b.id === booking.id ? { ...b, status: "canceled" } : b
      )
    );
  };

  return (
    <div className="pb-20">
      <h1 className="text-xl my-4 font-semibold">Past Orders:</h1>
      <Orders orders={orders} cancelOrder={removeOrder} />
      <h1 className="text-xl mt-10 mb-4 font-semibold">Bookings</h1>
      <Bookings bookings={bookings} cancelBooking={removeBooking} />
    </div>
  );
};

export default ProfileMain;
