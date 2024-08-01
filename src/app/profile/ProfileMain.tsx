"use client";
import React, { useRef, useState } from "react";
import { Booking, PastOrder } from "../components/Interface";
import Orders from "./Orders";
import Bookings from "./Bookings";

interface Props {
  orders: PastOrder[];
  bookings: Booking[];
}

const ProfileMain = ({ orders, bookings }: Props) => {
  const bookingModalRef = useRef<HTMLDialogElement>(null);
  const [bookingrModalContent, setBookingModalContent] = useState<Booking>({
    id: 0,
    username__username: "",
    head_count: 0,
    time_slot_id: 0,
    time_slot_date: "",
    time_slot_meal: "",
    status: "",
  });
  const orderModalRef = useRef<HTMLDialogElement>(null);
  const [orderModalContent, setOrderModalContent] = useState<PastOrder>({
    id: 0,
    username_id: 0,
    time: "",
    items_ordered: [],
    reward_change: 0,
    status: "",
  });

  const openBookingModal = (booking: Booking) => {
    setBookingModalContent(booking);
    if (bookingModalRef.current) {
      bookingModalRef.current.showModal();
    }
  };

  const closeBookingModal = () => {
    if (bookingModalRef.current) {
      bookingModalRef.current.close();
    }
  };

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

  return (
    <div>
      <Orders orders={orders}/>
      <Bookings bookings={bookings}/>
    </div>
  );
};

export default ProfileMain;
