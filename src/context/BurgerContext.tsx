import React, {ReactNode} from "react";

import axiosServices from "../services/shared/axios-service";
import {RouteComponentProps} from "react-router";

export interface IngredientsTypes {
    salad?: number;
    bacon?: number;
    cheese?: number;
    meat?: number;
    price?: number;
}
interface IngredientPrices {
    salad: number;
    bacon: number;
    cheese: number;
    meat: number;
}
interface State {
    ingredients: IngredientsTypes | {};
    initialIngredients:  IngredientsTypes | {};
    ingredientPrices: IngredientPrices;
    initialPrice: number;
    orderPrice: number;
    loading: boolean;
    isError: boolean,
    updateBurgerContextState: (stateObj: any) => void;
    children?: ReactNode;
}
interface BurgerContextInterface<T> {
    value: T;
    children?: ReactNode;
}
interface BurgerConsumerInterface<T> {
    children: (value: T) => ReactNode;
}

const INITIAL_PRICE = 5;
const BurgerContext:React.Context<State & RouteComponentProps | {}> = React.createContext({});

export class BurgerContextProvider extends React.Component {
    private isMountedComp = false;

    public componentDidMount(): void {
        this.isMountedComp = true;
        console.log('%c log BA: ********** componentDidMount ********** ', 'background: yellow;');

        axiosServices
            .get("/ingredients.json")
            .then(response => {
                if (this.isMountedComp && response.data) {
                    this.setState({
                        loading: false,
                        ingredients: Object.assign({}, response.data),
                        initialIngredients: Object.assign({}, response.data),
                    });
                }
            })
            .catch(error => {
                console.error(error);
                // this.setState({
                //   isError: true,
                //   loading: false,
                // })
                setTimeout(() => {
                    if (this.isMountedComp) {
                        this.setState({
                            isError: true,
                            loading: false,
                        })
                    }
                }, 3000)
            });

        axiosServices
            .get("/order.json")
            .then(response => {
                console.log('%c log BA: ********** componentDidMount  order.json ********** ', 'background: yellow;', response);
                if (this.isMountedComp && response.data) {
                    const savedBasket = Object.keys(response.data)
                        .map( key => {
                            return response.data[key].ingredients;
                        });

                    this.setState({
                        basket: savedBasket,
                        orderPrice: response.data.price,
                    });
                }
            })
            .catch(error => {
                console.error(error);
                this.setState({
                  isError: true,
                  loading: false,
                })
            });
    }

    public componentWillUnmount() {
        this.isMountedComp = false;
    }
    
    public updateBurgerContextState = (stateObj) => {
        console.log('===> stateObj   ',stateObj);
        const {
            orderPrice = INITIAL_PRICE,
            basket = null,
            isAdded = false,
        } = stateObj;
        let {ingredients = null} = stateObj;

        if (isAdded) {
            ingredients = this.state.initialIngredients;
        }
        this.setState((prevState) => {
            return {
                basket: basket ? basket : prevState.basket,
                ingredients: ingredients ? ingredients : prevState.ingredients,
                orderPrice,
            }
        });
        console.log('%c log BA: updateBurgerContextState  ===> ingredients ', 'background: orange;', ingredients);
    };

    public state = {
        basket: [],
        ingredients: {},
        initialIngredients: {},
        ingredientPrices: {
            salad: 0.5,
            bacon: 0.65,
            cheese: 1,
            meat: 2.2
        },
        initialPrice: INITIAL_PRICE,
        orderPrice: INITIAL_PRICE,
        isError: false,
        loading: true,
        updateBurgerContextState: this.updateBurgerContextState,
    };

    public render() {
        return (
            <BurgerContext.Provider value={this.state}>
                {this.props.children}
            </BurgerContext.Provider>
        );
    }
}

export const BurgerContextConsumer = BurgerContext.Consumer;
export default BurgerContext;
