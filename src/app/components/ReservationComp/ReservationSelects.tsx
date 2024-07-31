"use client";
import React, { useEffect, useState } from "react";
import PartySelect from "./PartySelect";
import DateSelect from "./DateSelect";

const ReservationSelects = () => {
  const [headCount, setHeadCount] = useState(2);
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  useEffect

  return (
    <div className="">
      <PartySelect headCount={headCount} onSelect={setHeadCount} />
      <DateSelect onChange={setDate} show={show} setShow={setShow} />

    </div>
  );
};

export default ReservationSelects;
