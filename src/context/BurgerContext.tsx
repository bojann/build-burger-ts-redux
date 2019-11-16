import React, {ReactNode} from "react";

// export default function() {
//     return null;
// }
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
    burgerCount: number;
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
const  Context:React.Context<State & RouteComponentProps | {}> = React.createContext({});

export class BurgerContextProvider extends React.Component {
    private isMountedComp = false;

    public updateBurgerContextState = (stateObj) => {
        const {
            orderPrice = INITIAL_PRICE,
            burgerCount = 0,
            basket = null,
            isAdded = false,
        } = stateObj;
        let {ingredients = null} = stateObj;

        if (isAdded) {
            ingredients = this.state.initialIngredients;
        }
        this.setState((prevState) => {
            console.log('************************  ', prevState)
            return {
                basket: basket ? basket : prevState.basket,
                ingredients: ingredients ? ingredients : prevState.ingredients,
                orderPrice,
                burgerCount,
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
        burgerCount: 0,
        initialPrice: INITIAL_PRICE,
        orderPrice: INITIAL_PRICE,
        isError: false,
        loading: true,
        updateBurgerContextState: this.updateBurgerContextState,
    };

    public componentDidMount(): void {
        this.isMountedComp = true;
        console.log('%c log BA: ********** componentDidMount ********** ', 'background: yellow;');

        axiosServices
            .get("/ingredients.json")
            .then(response => {
                if (this.isMountedComp) {
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
            })
    }

    public componentWillUnmount() {
        this.isMountedComp = false;
    }

    public render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const BurgerContextConsumer = Context.Consumer;
