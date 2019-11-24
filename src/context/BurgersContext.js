import React, {useEffect, useState, useCallback} from "react";

import axiosServices from "../services/shared/axios-service";

const INITIAL_PRICE = 5;
const BurgersContext = React.createContext({});

export const BurgersContextProvider = (props) => {    
    const [basket,setBasket] = useState([]);
    const [ingredients,setIngredients] = useState({});
    const [initialIngredients,setInitialIngredients] = useState({});
    const [orderPrice,setOrderPrice] = useState(INITIAL_PRICE);
    const [isError,setIsError] = useState(false);
    const [loading,setLoading] = useState(true);
    const [ingredientPrices, setIngredientPrices] = useState({
        salad: 0.5,
        bacon: 0.65,
        cheese: 1,
        meat: 2.2
    });

    const updatePriceSum = (_ingredients, _ingredientPrices) => {
        return Object.keys(_ingredients)
                .map(
                    ingKey => _ingredientPrices[ingKey] * _ingredients[ingKey]
                )
                .reduce((acc, curr) => {
                    const total = acc + curr;
                    return Number(total.toFixed(2));
                }, INITIAL_PRICE)
    };

    useEffect(() => {
        console.log('%c log BA: ********** BurgerContextProvider - useEffect ********** ', 'background: green;');
        axiosServices
            .get("/ingredients.json")
            .then(response => {
                if (response.data) {
                    console.log('%c log BA: ingredientPrices ', 'background: yellow;',ingredientPrices);
                    console.log('%c log BA: response.data ', 'background: yellow;',response.data);
                    setLoading(false);
                    setIngredients(response.data);
                    setInitialIngredients(response.data);
                    setOrderPrice(updatePriceSum(response.data, ingredientPrices));
                }
            })
            .catch(error => {
                console.error(error);
                setTimeout(() => {
                    setIsError(true);
                    setLoading(false);
                }, 3000)
            });

        // axiosServices
        //     .get("/order.json")
        //     .then(response => {
        //         if (response.data) {                    
        //             const savedBasket = Object.keys(response.data)
        //                 .map( key => {
        //                     return response.data[key].ingredients;
        //                 });

        //             setBasket(savedBasket);
        //             // setOrderPrice(response.data.price);
        //         }
        //     })
        //     .catch(error => {
        //         console.error(error);
        //         setIsError(true);
        //         setLoading(false);
        //     });
    }, []);
    
    const updateBurgerContextState = useCallback(stateObj => {
        console.log('updateBurgerContextState ===> stateObj   ',stateObj);
        const {
            orderPrice = INITIAL_PRICE,
            basket = null,
            isAdded = false,
        } = stateObj;
        let {ingredients = null} = stateObj;

        if (isAdded) {
            ingredients = initialIngredients;
        }
        setBasket((prevStateBasket) => {
            console.log('******************************', prevStateBasket);
            return basket ? basket : prevStateBasket;
        });
        setIngredients((prevStateIngredients) => ingredients ? ingredients : prevStateIngredients);
        setOrderPrice(orderPrice);
    }, [initialIngredients]);

    const state = {
        updateBurgerContextState,
        basket,
        ingredients,
        initialIngredients,
        ingredientPrices,
        initialPrice: INITIAL_PRICE,
        orderPrice,
        isError,
        loading,
    }

    return (
        <BurgersContext.Provider value={state}>
            {props.children}
        </BurgersContext.Provider>
    );
}

export const BurgersContextConsumer = BurgersContext.Consumer;
export default BurgersContext;
