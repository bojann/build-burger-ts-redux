import React from "react";
import { render } from "@testing-library/react";
import BuildControl from "../../component/Burger/BuildControls/BuildControl/BuildControl";

describe("+++++ BurgerControl", () => {
  test("build control matches the snapshot", () => {
    const { container } = render(<BuildControl label={"bacon"} price={10} />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="build-control"
        >
          <span
            class="ingredient-label"
          >
            bacon
             ( $
            10
             )
          </span>
          <button
            class="btn btn-less"
            data-ingredient="bacon"
          >
            Less
          </button>
          <button
            class="btn btn-more"
            data-ingredient="bacon"
          >
            More
          </button>
        </div>
      </div>
    `);
  });
});
