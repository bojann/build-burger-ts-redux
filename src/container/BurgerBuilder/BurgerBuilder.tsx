import React, { ReactText } from "react";
import Burger from "../../component/Burger/Burger";
import BuildControls from "../../component/Burger/BuildControls/BuildControls";
import Modal from "../../component/shared/Modal/Modal";
import OrderSummary from "../../component/Burger/OrderSummery/OrderSummery";
import axiosServices from "../../services/shared/axios-service";
import Spinner from "../../component/shared/Spinner/Spinner"

interface Ingredients {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
}
interface IngredientPrices {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
}
interface State {
  ingredients: Ingredients;
  ingredientPrices: IngredientPrices;
  initialPrice: number;
  orderPrice: number;
  orderModalShow: boolean;
  loading: boolean;
}

export default class BurgerBuilder extends React.Component<{}, State> {
  public state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    ingredientPrices: {
      salad: 0.5,
      bacon: 0.65,
      cheese: 1,
      meat: 2.2
    },
    initialPrice: 5,
    orderPrice: 5,
    orderModalShow: false,
    loading: false,
  };

  public handleAddIngredients = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
    const label = event.currentTarget.dataset.ingredient;
    if (label) {
       const newIngredients = { ...this.state.ingredients };
      const initialPrice = this.state.initialPrice;
      newIngredients[label] = newIngredients[label] + 1;

      const updatePriceSum = Object.keys(newIngredients)
        .map(
          ingKey => this.state.ingredientPrices[ingKey] * newIngredients[ingKey]
        )
        .reduce((acc, curr) => {
          const total = acc + curr;
          return Number(total.toFixed(2));
        }, initialPrice);

      this.setState({ ingredients: newIngredients, orderPrice: updatePriceSum });
      }
  };

  public handleRemoveIngredients = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const label = event.currentTarget.dataset.ingredient;
    if (label) {
      const newIngredients = { ...this.state.ingredients };
      const initialPrice = this.state.initialPrice;
      newIngredients[label] = this.state.ingredients[label] - 1;

      if (this.state.ingredients[label]) {
        const updatePriceSum = Object.keys(newIngredients)
          .map(
            ingKey => this.state.ingredientPrices[ingKey] * newIngredients[ingKey]
          )
          .reduce((acc, curr) => {
            const total = acc + curr;
            return Number(total.toFixed(2));
          }, initialPrice);

        this.setState({
          ingredients: newIngredients,
          orderPrice: updatePriceSum
        });
      }
    }
  };

  public handleShowOrder = () => {
    this.setState(
      (prevState: { orderModalShow: boolean }): any => {
        return {
          orderModalShow: !prevState.orderModalShow
        };
      }
    );
  };

  public handleModalClose = () => {
    this.setState({ orderModalShow: false });
  };

  public handlePurchase = () => {
    const order = {
      ingredients: this.state.ingredients,
      orice: this.state.orderPrice,
      customer: {
        name: "Jan Kowalski",
        address: {
          street: "test1",
          zipCode: "2132",
          country: "Poland",
        },
      },
      deliveryMethod: 'fast',
    }
    console.log("Purchase done");
    this.setState({
      loading: true,
    })
    this.handleModalClose();
    
    axiosServices.post("/order.json", order)
    .then(response => {
      console.log('RESPONSE: ', response)
      this.setState({
        loading: false,
        orderModalShow: false,
      })
    })
    .catch(error => {
      console.error(error)
      this.setState({
        loading: false,
        orderModalShow: false,
      })
    })
  };

  public render() {
    let orderSummary = (
      <OrderSummary
          ingredients={this.state.ingredients}
          orderPrice={this.state.orderPrice}
          handleModalClose={this.handleModalClose}
          handlePurchase={this.handlePurchase}
        />
    )
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredients={this.state.ingredients}
          ingredientPrices={this.state.ingredientPrices}
          orderPrice={this.state.orderPrice}
          addIngredients={this.handleAddIngredients}
          removeIngredients={this.handleRemoveIngredients}
          handleShowOrder={this.handleShowOrder}
        />
        <Modal
          orderModalShow={this.state.orderModalShow}
          handleModalClose={this.handleModalClose}
        >
          {orderSummary}
        </Modal>
      </>
    );
  }
}
