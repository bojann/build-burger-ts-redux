import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BuildControls from "../../component/Burger/BuildControls/BuildControls";
import Modal from "../../component/shared/Modal/Modal";
import BurgerBuilder from "../../container/BurgerBuilder/BurgerBuilder";

const addIngredients = jest.fn();
const removeIngredients = jest.fn();
const handleShowOrder = jest.fn();
let getByText, getByTestId;

beforeEach(() => {
  const controls = render(
    <BuildControls
      ingredients={{ bacon: 1 }}
      ingredientPrices={{ bacon: 10 }}
      orderPrice={20}
      addIngredients={addIngredients}
      removeIngredients={removeIngredients}
      handleShowOrder={handleShowOrder}
    />
  );
  getByText = controls.getByText;
  getByTestId = controls.getByTestId;
});

describe("+++++++ BurgerControls features", () => {
  test("addIngredients triggers once on click", () => {
    const buttonMore = getByText(/more/i);
    fireEvent.click(buttonMore);
    expect(addIngredients).toHaveBeenCalledTimes(1);
  });
  test("removeIngredients triggers once on click", () => {
    const buttonLess = getByText(/less/i);
    fireEvent.click(buttonLess);
    expect(removeIngredients).toHaveBeenCalledTimes(1);
  });
  test("Default price is correct", () => {
    const totalPrice = getByTestId("total-price");
    expect(totalPrice).toHaveTextContent("$ 20.00");
  });
  test("OrderSummary modal box triggers once on click and becomes visible, by default is hidden", () => {
    const { rerender, getByTestId } = render(<Modal />);
    const orderNow = getByText(/order now/i);
    const modalBox = getByTestId("modal-hidden");

    expect(modalBox).toBeTruthy();

<<<<<<< HEAD
    fireEvent.click(orderNow);
    rerender(<Modal orderModalShow={true} />);
    expect(handleShowOrder).toHaveBeenCalledTimes(1);
    expect(getByTestId("modal-visible")).toBeTruthy();
  });
});
=======
        fireEvent.click(orderNow);
        rerender(<Modal modalShow={true} />)
        expect(handleShowOrder).toHaveBeenCalledTimes(1);
        expect(getByTestId('modal-visible')).toBeTruthy();
    }) 
})
>>>>>>> a83b1f2... add burger context API
