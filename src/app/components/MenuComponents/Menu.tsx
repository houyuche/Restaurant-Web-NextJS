"use client";
import React, { useState } from "react";
import FilterMenu from "./MenuFilter";
import menuData from "@/menu.json";
import MenuDisplay from "./MenuDisplay";
import { MenuItem } from "../Interface";

interface Props {
  order: boolean;
}

const Menu = ({ order }: Props) => {
  const [selected, setSelected] = useState("All categories");
  const [input, setInput] = useState("");

  const categories: string[] = Array.from(
    new Set(
      menuData
        .filter((item: MenuItem) =>
          item.name.toLowerCase().includes(input.toLowerCase())
        )
        .map((item) => item.category)
    )
  );

  const filteredItems: MenuItem[] = menuData.filter(
    (item: MenuItem) =>
      (selected === "All categories" || item.category === selected) &&
      item.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="w-2/3 mx-auto my-4">
      <h1 className="font-bold text-3xl">Menu</h1>
      <div className="flex flex-row justify-between items-center">
        <FilterMenu categories={categories} onSelect={setSelected} />
        <input
          type="text"
          value={input}
          placeholder="Search"
          className="input input-bordered w-full max-w-xs"
          onChange={(event) => setInput(event.target.value)}
        />
      </div>
      <MenuDisplay filteredItems={filteredItems} order={order} />
    </div>
  );
};

export default Menu;
