import React from "react";

interface Props {
  categories: string[];
  onSelect: (category: string) => void;
}

const FilterMenu = ({ categories, onSelect }: Props) => {
  return (
    <div className="my-4">
      <select
        defaultValue={"All categories"}
        className="select w-full max-w-xs"
        onChange={(event) => onSelect(event.target.value)}
      >
        <option key={categories.length + 1} value="All categories">
          All categories
        </option>
        {categories.map((category, id) => (
          <option key={id}>{category}</option>
        ))}
      </select>
    </div>
  );
};
export default FilterMenu;
