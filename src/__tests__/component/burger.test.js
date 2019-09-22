import React from "react";
import { render } from "@testing-library/react";
import Burger from "../../component/Burger/Burger";

describe("++++ Show Burger with ingredients", () => {
  test("should show all ingredients", () => {
    const ingredients = {
      salad: 1,
      bacon: 1,
      cheese: 1,
      meat: 1
    };
    const { container } = render(<Burger ingredients={ingredients} />);
    expect(container.querySelector(".top-bread")).toBeTruthy();
    expect(container.querySelector(".salad")).toBeTruthy();
    expect(container.querySelector(".bacon")).toBeTruthy();
    expect(container.querySelector(".cheese")).toBeTruthy();
    expect(container.querySelector(".meat")).toBeTruthy();
    expect(container.querySelector(".bottom-bread")).toBeTruthy();
  });
});
