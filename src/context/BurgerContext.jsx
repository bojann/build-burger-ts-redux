import React from "react";
import axiosServices from "../services/shared/axios-service";

const  Context = React.createContext(null);

export class BurgerContextProvider extends React.Component {
    isMountedComp = false;

    updateBurgerContextState = (stateObj) => {
        const newState = {...stateObj};

        console.log('%c log BA: ', 'background: orange;', newState);
    };

    state = {
        ingredients: {},
        ingredientPrices: {
            salad: 0.5,
            bacon: 0.65,
            cheese: 1,
            meat: 2.2
        },
        initialPrice: 5,
        orderPrice: 5,
        loading: true,
        isError: false,
        updateBurgerContextState: this.updateBurgerContextState,
    };

    componentDidMount() {
        this.isMountedComp = true;

        axiosServices
            .get("/ingredients.json")
            .then(response => {
                if (this.isMountedComp) {
                    this.setState({
                        loading: false,
                        ingredients: Object.assign({}, response.data),
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

    componentWillUnmount() {
        this.isMountedComp = false;
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const BurgerContextConsumer = Context.Consumer;
