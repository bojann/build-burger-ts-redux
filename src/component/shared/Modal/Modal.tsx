import React, { ReactNode } from "react";
import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";

interface Props {
  children: ReactNode | string;
  modalShow: boolean;
  handleModalClose: () => void;
}

const Modal = (props: Props) => {
  const classes = props.modalShow
    ? "modal modal-show"
    : "modal modal-hidden";
  const testId = props.modalShow
  ? "modal-visible"
  : "modal-hidden";

  return (
    <>
      <Backdrop
        show={props.modalShow}
        handleModalClose={props.handleModalClose}
      />
      <div className={classes} data-testid={testId}>{props.children ? props.children : null}</div>
    </>
  );
};

export default Modal;
