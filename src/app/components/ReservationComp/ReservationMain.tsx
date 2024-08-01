"use client";
import React, { useEffect, useState, useRef } from "react";
import PartySelect from "./PartySelect";
import DateSelect from "./DateSelect";
import { TimeSlot } from "../Interface";
import ReservationModal from "./ReservationModal";
import { SessionProvider } from "next-auth/react";

const ReservationMain = () => {
  const [headCount, setHeadCount] = useState(2);
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const [modalContent, setModalContent] = useState<TimeSlot>({
    id: 0,
    date: "",
    meal: "",
    capacity: 0,
  });

  useEffect(() => {
    const fetchTimeSlots = async () => {
      const formattedDate = date.toISOString().split("T")[0];
      const response = await fetch(
        `https://yuchen-react-proj.azurewebsites.net/available_time/?date=${formattedDate}`
      );
      const res: TimeSlot[] = await response.json();
      setTimeSlots(res);
      setIsLoading(false);
    };

    fetchTimeSlots();
  }, [date]);

  const handleChange = (selectedDate: Date) => {
    setDate(selectedDate);
    setIsLoading(true);
  };

  const openModal = (slot: TimeSlot) => {
    setModalContent(slot);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <div>
      <PartySelect headCount={headCount} onSelect={setHeadCount} />
      <DateSelect onChange={handleChange} show={show} setShow={setShow} />

      <h1 className="label-text opacity-70 my-3">Available slots:</h1>

      {isLoading ? (
        <h1 className="opacity-70">Looking for slots...</h1>
      ) : timeSlots.length > 0 ? (
        timeSlots.map((slot) => (
          <button
            key={slot.id}
            className="btn btn-primary btn-outline w-24 mr-2"
            onClick={() => openModal(slot)}
          >
            {slot.meal}
          </button>
        ))
      ) : (
        <button className="btn btn-disabled mr-2">No slot available</button>
      )}
      <SessionProvider>
        <ReservationModal
          modalRef={modalRef}
          closeModal={closeModal}
          slot={modalContent}
          headCount={headCount}
        />
      </SessionProvider>
    </div>
  );
};

export default ReservationMain;
