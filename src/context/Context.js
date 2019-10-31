import React from "react";

export default function() {
    return null;
}
// import axiosServices from "../services/shared/axios-service";
// import {RouteComponentProps} from "react-router";
//
// export interface IngredientsTypes {
//     salad?: number;
//     bacon?: number;
//     cheese?: number;
//     meat?: number;
//     price?: number;
// }
// interface IngredientPrices {
//     salad: number;
//     bacon: number;
//     cheese: number;
//     meat: number;
// }
// interface State {
//     ingredients?: IngredientsTypes | {};
//     ingredientPrices?: IngredientPrices;
//     initialPrice?: number;
//     orderPrice?: number;
//     loading: boolean;
//     updateBurgerContextState: (stateObj: any) => void;
// }
// interface BurgerContextInterface {
//     value: State,
//     children: React.ReactNode | Element;
// }
//
//
// const  Context = React.createContext<BurgerContextInterface & RouteComponentProps | null>(null);
//
// export class BurgerContextProvider extends React.Component {
//     private isMountedComp = false;
//
//     public updateBurgerContextState = (stateObj) => {
//         const newState = {...stateObj};
//
//         console.log('%c log BA: ', 'background: orange;', newState);
//     };
//
//     public state = {
//         ingredients: {},
//         ingredientPrices: {
//             salad: 0.5,
//             bacon: 0.65,
//             cheese: 1,
//             meat: 2.2
//         },
//         initialPrice: 5,
//         orderPrice: 5,
//         loading: false,
//         updateBurgerContextState: this.updateBurgerContextState,
//     };
//
//     public componentDidMount(): void {
//         this.isMountedComp = true;
//
//         axiosServices
//             .get("/ingredients.json")
//             .then(response => {
//                 if (this.isMountedComp) {
//                     this.setState({
//                         loading: false,
//                         ingredients: Object.assign({}, response.data),
//                     });
//                 }
//             })
//             .catch(error => {
//                 console.error(error);
//                 // this.setState({
//                 //   isError: true,
//                 //   loading: false,
//                 // })
//                 setTimeout(() => {
//                     if (this.isMountedComp) {
//                         this.setState({
//                             isError: true,
//                             loading: false,
//                         })
//                     }
//                 }, 3000)
//             })
//     }
//
//     public componentWillUnmount() {
//         this.isMountedComp = false;
//     }
//
//     public render() {
//         return (
//             <Context.Provider value={this.state}>
//                 {this.props.children}
//             </Context.Provider>
//         );
//     }
// }
//
// export const BurgerContextConsumer = Context.Consumer;
