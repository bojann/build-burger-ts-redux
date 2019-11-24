import React, { ReactNode } from "react";
import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";

interface Props {
  children: ReactNode | string;
  modalShow: boolean;
  classNames?: string;
  handleModalClose: () => void;
}

const Modal = (props: Props) => {
  const classnames = props.classNames ? props.classNames : "";
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
      <div className={`${classnames} ${classes}`} data-testid={testId}>
        <button onClick={props.handleModalClose} className="btn-close">X</button>
        {props.children ? props.children : null}
      </div>
    </>
  );
};

export default Modal;
