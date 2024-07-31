"use client";
import React from "react";
import Datepicker from "tailwind-datepicker-react";
import { IOptions } from "tailwind-datepicker-react/types/Options";

interface Props {
  onChange: (d: Date) => void;
  show: boolean;
  setShow: (b: boolean) => void;
}

const DateSelect = ({ onChange, show, setShow }: Props) => {
  const options: IOptions = {};

  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text opacity-70">Date</span>
      </div>
      <Datepicker
        options={options}
        show={show}
        setShow={setShow}
        onChange={onChange}
      />
    </label>
  );
};

export default DateSelect;
