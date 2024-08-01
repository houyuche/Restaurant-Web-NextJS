import React from "react";
import { FcApproval } from "react-icons/fc";

const ReservationConfirmation = () => {
  return (
    <>
      <FcApproval className="mx-auto my-10 w-24 h-24" />
      <h1 className="text-xl text-center my-5">Reservation Booked!</h1>
      <h1 className="text-xl text-center">
        You can view your reservation in the profile page.
      </h1>
    </>
  );
};

export default ReservationConfirmation;
