import React, {ReactNode, useState} from "react"
import OrderSummary from "../Burger/OrderSummery/OrderSummery"

import {IngredientTypes} from "../Burger/BuildControls/BuildControls";
import Burger from "../Burger/Burger";

const Checkout = (props: IngredientTypes & {
    handlePurchase: () => void;
}) => {
    const { ingredients, orderPrice, handlePurchase } = props;
    
    return (
        <div>
            <Burger ingredients={ingredients} />
            <OrderSummary
                ingredients={ingredients}
                orderPrice={orderPrice}
                handlePurchase={handlePurchase}
            />
        </div>
    )
};

export default Checkout;
