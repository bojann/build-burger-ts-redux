import React from "react";
import { EventHandlersTypes } from "../BuildControls";
import "./BuildControl.scss";

export interface BuildBurgerTypes {
  label: string;
  price: number;
}

const BuildControl = (props: BuildBurgerTypes & EventHandlersTypes) => {
  const { label, price, removeIngredients, addIngredients } = props;

  return (
    <div className="build-control">
      <span className="ingredient-label">
        {label} ( ${price} )
      </span>
      <button className="btn btn-less" data-ingredient={label} onClick={removeIngredients}>
        Less
      </button>
      <button className="btn btn-more" data-ingredient={label} onClick={addIngredients}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
