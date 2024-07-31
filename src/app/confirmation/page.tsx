import React from "react";
import { FcApproval } from "react-icons/fc";

const Confirmation = () => {
  return (
    <>
      <FcApproval className="mx-auto my-10 w-24 h-24"/>
      <div className="text-xl text-center mt-5">
        Order placed, you can view your order in the profile page.
      </div>
    </>
  );
};

export default Confirmation;
