import React from "react";
import Logo from "../shared/Logo/Logo"

const layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Logo />
      navigation
      {props.children}
    </>
  );
};

export default layout;
