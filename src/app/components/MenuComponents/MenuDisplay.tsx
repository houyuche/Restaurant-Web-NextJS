"use client";
import React, { useRef, useState } from "react";
import { MenuItem } from "../Interface";
import MenuCard from "./MenuCard";
import MenuModal from "./MenuModal";
import Alert from "../Alert";

interface Props {
  filteredItems: MenuItem[];
  order: boolean;
}

const MenuDisplay = ({ filteredItems, order }: Props) => {
  const categories = Array.from(
    new Set(filteredItems.map((item) => item.category))
  );

  const modalRef = useRef<HTMLDialogElement>(null);
  const [modalContent, setModalContent] = useState<MenuItem>({
    id: 0,
    name: "",
    image: "",
    price: "",
    count: 0,
    category: "",
  });
  const [count, setCount] = useState(1);
  const [alertVisible, setAlertVisible] = useState(false);

  const openModal = (item: MenuItem) => {
    setModalContent(item);
    setCount(1);
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
      {categories.map((category, index) => (
        <div key={index}>
          <h1 className="text-xl font-bold my-4">{category}</h1>
          <div className="flex flex-wrap justify-between">
            {filteredItems
              .filter((item) => item.category === category)
              .map((item) =>
                order ? (
                  <MenuCard key={item.id} menuItem={item} onClick={openModal} />
                ) : (
                  <MenuCard key={item.id} menuItem={item} />
                )
              )}
          </div>
          <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
            {alertVisible && (
              <Alert message="Item added to cart" turnOffAlert={setAlertVisible} />
            )}
          </div>
        </div>
      ))}

      <MenuModal
        modalRef={modalRef}
        closeModal={closeModal}
        item={modalContent}
        count={count}
        setCount={setCount}
        openAlert={setAlertVisible}
      />
    </div>
  );
};

export default MenuDisplay;
