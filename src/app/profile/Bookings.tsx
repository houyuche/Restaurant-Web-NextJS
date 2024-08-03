import React, { useState, useRef } from "react";
import { Booking } from "../components/Interface";
import Alert from "../components/Alert";
import BookingModal from "./BookingModal";

interface Props {
  bookings: Booking[];
  cancelBooking: (o: Booking) => void;
}

const Bookings = ({ bookings, cancelBooking }: Props) => {
  const [alertVisible, setAlertVisible] = useState(false);

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

  const handleCancel = (b: Booking) => {
    cancelBooking(b);
    setAlertVisible(true);
  };

  return (
    <>
      <div className="max-h-80 overflow-y-auto">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th>Booking#</th>
              <th>Party</th>
              <th className="w-full">Date</th>
              <th>Meal</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <th>{booking.id}</th>
                <td>{booking.head_count}</td>
                <td className="w-full">
                  {booking.time_slot_date}
                </td>
                <td>{booking.time_slot_meal.toUpperCase()}</td>
                <td>{booking.status.toUpperCase()}</td>
                {booking.status === "confirmed" && (
                  <td>
                    <div
                      className="btn btn-outline btn-error btn-sm"
                      onClick={() => openBookingModal(booking)}
                    >
                      Cancel
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BookingModal
        modalRef={bookingModalRef}
        closeModal={closeBookingModal}
        booking={bookingrModalContent}
        onCancel={handleCancel}
      />
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
        {alertVisible && (
          <Alert message="Reservation canceled!" turnOffAlert={setAlertVisible} />
        )}
      </div>
    </>
  );
};

export default Bookings;
