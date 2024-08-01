"use client";
import React, { RefObject } from "react";
import { TimeSlot } from "../Interface";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaCalendar } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";


interface Props {
  modalRef: RefObject<HTMLDialogElement>;
  closeModal: () => void;
  slot: TimeSlot;
  headCount: number;
}

const ReservationModal = ({ modalRef, closeModal, slot, headCount }: Props) => {
  
  const { data: session } = useSession();

  const sendReservation = () => {
    const username = session?.user.email;
    const time_slot_id = slot.id;
    const head_count = headCount;
    const payload = JSON.stringify({ username, time_slot_id, head_count });
    navigator.sendBeacon(
      "https://yuchen-react-proj.azurewebsites.net/make_reservation/",
      payload
    );
    console.log(payload);
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
        <h1 className="font-bold text-2xl">Complete Your Reservation</h1>
        <hr className="my-2"/>
        <FaCalendar />
        <h1 className="text-lg">{slot.date + ", "+slot.meal.toUpperCase()}</h1>
        <BsFillPeopleFill />
        <h1 className="text-lg opacity-80 mb-10">Party of {headCount}</h1>
        <div className="modal-action">
          <Link
            href="/reservationConfirmation"
            className="btn btn-primary text-l w-full"
            onClick={sendReservation}
          >
            Make Reservation
          </Link>
        </div>
      </div>
    </dialog>
  );
};

export default ReservationModal;
