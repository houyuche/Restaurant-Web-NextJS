import React from "react";

interface Props {
  headCount: number;
  onSelect: (i: number) => void;
}

const PartySelect = ({ headCount, onSelect }: Props) => {
  const options = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text opacity-70">Party</span>
      </div>
      <select
        className="select select-bordered"
        value={headCount}
        onChange={(event) => onSelect(Number(event.target.value))}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default PartySelect;
