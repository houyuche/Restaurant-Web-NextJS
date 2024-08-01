import React from "react";
import { Booking } from "../components/Interface";

interface Props {
  bookings: Booking[];
}

const Bookings = ({ bookings }: Props) => {
  const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  return (
    <>
      <h1 className="text-xl mt-10">Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-center">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Meal</th>
              <th className="py-2 px-4 border-b">Head Count</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="align-middle">
                <td className="py-2 px-4 border-b">{formatTime(booking.time_slot_date)}</td>
                <td className="py-2 px-4 border-b">{booking.time_slot_meal}</td>
                <td className="py-2 px-4 border-b">{booking.head_count}</td>
                <td className="py-2 px-4 border-b">{booking.status}</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-red-500 text-white py-1 px-2 rounded">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Bookings;
