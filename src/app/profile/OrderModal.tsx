import React, { RefObject } from "react";
import { PastOrder } from "../components/Interface";

interface Props {
  modalRef: RefObject<HTMLDialogElement>;
  closeModal: () => void;
  order: PastOrder;
}

const OrderModal = ({ modalRef, closeModal, order }: Props) => {

    
    
      return (
        <></>
      );
};

export default OrderModal;
