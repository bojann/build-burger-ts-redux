import React from "react";
import { render } from "@testing-library/react";
import BurgerIngredient from "../../component/Burger/BurgerIngredient/BurgerIngredient";

test("should return top-bread ", () => {
  const { container } = render(<BurgerIngredient type="top-bread" />);

  expect(container.querySelector(".top-bread")).toBeTruthy();
});
