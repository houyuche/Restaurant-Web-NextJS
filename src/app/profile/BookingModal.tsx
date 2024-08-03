import React, { RefObject } from "react";
import { Booking } from "../components/Interface";
import { FaCalendar } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";

interface Props {
  modalRef: RefObject<HTMLDialogElement>;
  closeModal: () => void;
  booking: Booking;
  onCancel: (o: Booking) => void;
}

const BookingModal = ({ modalRef, closeModal, booking, onCancel }: Props) => {
  const cancelbooking = () => {
    onCancel(booking);
    const reservation_id = booking.id;
    const payload = JSON.stringify({ reservation_id });
    navigator.sendBeacon(
      "https://yuchen-react-proj.azurewebsites.net/cancel_reservation/",
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
        <h1 className="font-bold text-2xl">Cancel Reservation</h1>
        <hr className="my-2" />
        <FaCalendar />
        <h1 className="text-lg">
          {booking.time_slot_date + ", " + booking.time_slot_meal.toUpperCase()}
        </h1>
        <BsFillPeopleFill />
        <h1 className="text-lg">Party of {booking.head_count}</h1>
        <div className="modal-action">
          <button
            className="btn btn-primary text-l w-full"
            onClick={cancelbooking}
          >
            Cancel This Reservation
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default BookingModal;
