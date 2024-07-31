import React from "react";
import ReservationSelects from "../components/ReservationComp/ReservationSelects";
const Reservation = () => {
  return (
    <div className="w-2/3 mx-auto my-4">
      <h1 className="font-bold text-3xl">Reservation</h1>
      <ReservationSelects />
      
    </div>
  );
};

export default Reservation;
