import React from "react";
import { FcApproval } from "react-icons/fc";

const Confirmation = () => {
  return (
    <>
      <FcApproval className="mx-auto my-10 w-24 h-24" />
      <h1 className="text-xl text-center my-5">Order Placed!</h1>
      <h1 className="text-xl text-center">
        You can view your order in the profile page.
      </h1>
    </>
  );
};

export default Confirmation;
