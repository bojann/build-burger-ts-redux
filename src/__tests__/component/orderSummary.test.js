import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OrderSummary from '../../component/Burger/OrderSummery/OrderSummery'; 

const ingredients = {
    salad: 0,
    bacon: 1,
}
const handleModalClose = jest.fn();
const handlePurchase = jest.fn();
let getByText;

describe('++++++++ OrderSummary modal box', () => {
    
    beforeEach(() => {
        const order = render(<OrderSummary
            ingredients={ingredients}
            orderPrice={10}
            handleModalClose={handleModalClose}
            handlePurchase={handlePurchase}
        />);
        getByText = order.getByText;
    })

    test('Show OrderSummary chosen ingredients', () => {
        expect(getByText('salad: 0')).toBeInTheDocument;
        expect(getByText('bacon: 1')).toBeInTheDocument;
    })

    test('Closing OrderSummary modal box on button X', () => {
        fireEvent.click(getByText(/x/i));
        expect(handleModalClose).toBeCalledTimes(1);
    })

    
})

test('Closing OrderSummary modal box on button Cancel', () => {
    const { getByText } = render(<OrderSummary
        ingredients={ingredients}
    />);
    fireEvent.click(getByText('Cancel'));
    expect(handleModalClose).toBeCalledTimes(1);
})