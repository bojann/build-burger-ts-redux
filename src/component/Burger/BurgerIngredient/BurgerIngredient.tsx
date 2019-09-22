import React, { ReactNode } from "react";

import "./BurgerIngredient.scss";

const BurgerIngredient = (props: { type: string }) => {
  let layer;

  switch (props.type) {
    case "top-bread":
      layer = <div className="top-bread" />;
      break;
    case "salad":
      layer = <div className="salad" />;
      break;
    case "meat":
      layer = <div className="meat" />;
      break;
    case "bacon":
      layer = <div className="bacon" />;
      break;
    case "cheese":
      layer = <div className="cheese" />;
      break;
    case "bottom-bread":
      layer = <div className="bottom-bread" />;
      break;
    default:
      layer = null;
      break;
  }

  return layer;
};

export default BurgerIngredient;
