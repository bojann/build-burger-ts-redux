import React from "react";
import BuildControl, { BuildBurgerTypes } from "./BuildControl/BuildControl";
import "./BuildControls.scss";

export interface IngredientTypes {
  ingredients:
    | {
        cheese: number;
        bacon: number;
        salad: number;
        meat: number;
        [key: string]: number;
      }
    | {};
  orderPrice: number;
}

export interface EventHandlersTypes {
  addIngredients: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  removeIngredients: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  showOrder?: () => void;
}

export interface IngredientPrices {
  ingredientPrices: {
    cheese: number;
    bacon: number;
    salad: number;
    meat: number;
    [key: string]: number;
  };
}

const BuildControls = (
  props: IngredientTypes & EventHandlersTypes & IngredientPrices
) => {
  const ingredients = props.ingredients;
  const renderControls = () => {
    return Object.keys(ingredients).map((item: string | any) => {
      return item ? (
        <BuildControl
          key={item}
          label={item}
          price={props.ingredientPrices[item]}
          addIngredients={props.addIngredients}
          removeIngredients={props.removeIngredients}
        />
      ) : null;
    });
  };
  console.log("props.orderPrice", props.orderPrice);
  const totalPriceNum = props.orderPrice ? props.orderPrice.toFixed(2) : 0;

  return (
    <div className="build-burger-controls">
      <span>
        Total Price: <span data-testid="total-price">$ {totalPriceNum}</span>
      </span>
      {renderControls()}
      <button className="btn order-btn" onClick={props.showOrder}>
        Order now
      </button>
    </div>
  );
};

export default BuildControls;
