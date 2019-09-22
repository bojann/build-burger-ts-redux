import React from "react";

import "./Backdrop.scss";

interface Props {
  show: boolean;
  handleModalClose: () => void;
}

const backdrop = (props: Props) => {
  const backdropShow = props.show ? "visible-backdrop" : "hidden-backdrop";

  return <div onClick={props.handleModalClose} className={backdropShow} />;
};

export default backdrop;
