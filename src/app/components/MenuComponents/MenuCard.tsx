import React from "react";
import { MenuItem } from "../Interface";
import Image from 'next/image'

interface Props {
  menuItem: MenuItem;
  onClick?: (item: MenuItem) => void;
}

const MenuCard = ({ menuItem, onClick }: Props) => {
  return (
    <div
      className={`card card-compact bg-base-100 w-60 shadow-xl my-2 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick ? () => onClick(menuItem) : undefined}
    >
      <figure>
        <Image
          src="https://cdn.pixabay.com/photo/2024/05/13/19/19/ufo-8759621_1280.png"
          alt={menuItem.name}
          width={100}
          height={100}
          className="w-1/2"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{menuItem.name}</h2>
        <p>${menuItem.price}</p>
      </div>
    </div>
  );
};

export default MenuCard;
