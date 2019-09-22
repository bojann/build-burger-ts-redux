import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

import "./Burger.scss";
import { access } from "fs";

interface Ingredients {
  cheese: number;
  bacon: number;
  salad: number;
  meat: number;
}

interface IngredientsTypes {
  ingredients: Ingredients;
}

const Burger = (props: IngredientsTypes) => {
  const renderIngredients = () => {
    const ingredients = props.ingredients;

    const ingredientArr = Object.keys(ingredients)
      .map(
        (igKey: string): string[] => {
          const igAmount: number = ingredients[igKey];
          let igQuantity: string[] = [];
          for (let i = 0; i < igAmount; i++) {
            igQuantity.push(igKey);
          }
          return igQuantity;
        }
      )
      .reduce((acc: string[], cur: string[]): string[] => {
        return [...acc, ...cur];
      }, [])
      .map((igType: string | any, indx?: number) => {
        return <BurgerIngredient type={igType} key={igType + indx} />;
      });

    return ingredientArr.length
      ? ingredientArr
      : "Please add some ingredients.";
  };

  return (
    <div className="burger">
      <BurgerIngredient type="top-bread" />
      {renderIngredients()}
      <BurgerIngredient type="bottom-bread" />
    </div>
  );
};

export default Burger;
