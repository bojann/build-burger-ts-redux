import React, { ReactNode } from "react";
import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";

interface Props {
  children: ReactNode;
  orderModalShow: boolean;
  handleModalClose: () => void;
}

const Modal = (props: Props) => {
  const classes = props.orderModalShow
    ? "modal modal-show"
    : "modal modal-hidden";
  const testId = props.orderModalShow
  ? "modal-visible"
  : "modal-hidden";

  return (
    <>
      <Backdrop
        show={props.orderModalShow}
        handleModalClose={props.handleModalClose}
      />
      <div className={classes} data-testid={testId}>{props.children ? props.children : null}</div>
    </>
  );
};

export default Modal;
