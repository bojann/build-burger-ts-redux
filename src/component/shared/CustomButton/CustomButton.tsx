import React, { ReactNode } from "react";

import "./CustomButton.scss";

interface Props {
  children: ReactNode;
  btnType: string;
  handleBtnClick: () => void;
}

const CustomButton = (props: Props) => {
  return (
    <button className={`btn ${props.btnType}`} onClick={props.handleBtnClick}>
      {props.children}
    </button>
  );
};

export default CustomButton;
