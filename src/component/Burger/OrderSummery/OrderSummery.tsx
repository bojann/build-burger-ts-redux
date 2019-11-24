import React, { ReactNode } from "react";
import { IngredientTypes } from "../BuildControls/BuildControls";

import "./OrderSummery.scss";
import CustomButton from "../../../component/shared/CustomButton/CustomButton";

const orderSummary = (
  props: IngredientTypes & {
    handleModalClose?: () => void;
    handlePurchase: () => void;
    redirectPage?: () => void;
    handleAddToBasket?: () => void;
  }
) => {
  const renderOrderList = () => {
    const itemList = Object.keys(props.ingredients).map(
      (ingName): JSX.Element => {
        return (
          <li key={ingName}>
            {ingName}: {props.ingredients[ingName]}
          </li>
        );
      }
    );
    return itemList;
  };

  const handleClose = () => {
      const redirectPage = props.redirectPage ? props.redirectPage : () => false;
      return props.handleModalClose ? props.handleModalClose() : redirectPage();
  };

  return (
    <>
      <h3>Your order is burger with:</h3>
      <ul className="ingredient-list">{renderOrderList()}</ul>
      <p>
        <strong>Total price: {props.orderPrice}</strong>
      </p>
      <CustomButton
        btnType="btn-danger"
        handleBtnClick={handleClose}
      >
        Cancel
      </CustomButton>
      <CustomButton btnType="btn-success" handleBtnClick={props.handleAddToBasket}>
        Add to Basket
      </CustomButton>
      <CustomButton btnType="btn-success" handleBtnClick={props.handlePurchase}>
        Go to Checkout
      </CustomButton>
    </>
  );
};

export default orderSummary;
