import React from "react";
import Burger from "../../component/Burger/Burger";
import BuildControls from "../../component/Burger/BuildControls/BuildControls";
import Modal from "../../component/shared/Modal/Modal";
import OrderSummary from "../../component/Burger/OrderSummery/OrderSummery";
import axiosServices from "../../services/shared/axios-service";
import Spinner from "../../component/shared/Spinner/Spinner"
import ErrorModal from "../../Handlers/Errors/ErrorModal";
import Checkout from "../../component/Checkout/Checkout"
import {BrowserRouterProps} from "react-router-dom";

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
  [key: string]: number;
}
interface State {
  modalShow: boolean;
  loading: boolean;
  isPurchased: boolean;
  isError: boolean;
  errorMsg: string | undefined;
}
interface Props {
  ingredients: IngredientsTypes | {};
  ingredientPrices: IngredientPrices;
  initialPrice: number;
  orderPrice: number;
  loading: boolean;
  isError: boolean;
  burgerCount: number;
  basket: IngredientsTypes[],
  updateBurgerContextState: (stateObj: any) => void;
}

export default class BurgerBuilder extends React.Component<Props & BrowserRouterProps, State> {
  // private isMountedComp = false;

  public state = {
    modalShow: false,
    loading: true,
    isPurchased: false,
    isError: false,
    errorMsg: undefined,
  };

  public handleAddIngredients = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const label = event.currentTarget.dataset.ingredient;

    if (label && Object.keys(this.props.ingredients).length) {
      const newIngredients = { ...this.props.ingredients };
      const initialPrice = this.props.initialPrice;
      newIngredients[label] = newIngredients[label] + 1;

      const updatePriceSum = Object.keys(newIngredients)
        .map(
          ingKey => this.props.ingredientPrices[ingKey] * newIngredients[ingKey]
        )
        .reduce((acc, curr) => {
          const total = acc + curr;
          return Number(total.toFixed(2));
        }, initialPrice);

      this.props.updateBurgerContextState({
        ingredients: newIngredients,
        orderPrice: updatePriceSum
      });
    }
  };

  public handleRemoveIngredients = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const label = event.currentTarget.dataset.ingredient;
    if (label && Object.keys(this.props.ingredients).length) {
      const newIngredients = { ...this.props.ingredients };
      const initialPrice = this.props.initialPrice;
      newIngredients[label] = this.props.ingredients[label] - 1;

      if (this.props.ingredients[label]) {
        const updatePriceSum = Object.keys(newIngredients)
          .map(
            ingKey =>
              this.props.ingredientPrices[ingKey] * newIngredients[ingKey]
          )
          .reduce((acc, curr) => {
            const total = acc + curr;
            return Number(total.toFixed(2));
          }, initialPrice);

        this.props.updateBurgerContextState({
          ingredients: newIngredients,
          orderPrice: updatePriceSum
        });
      }
    }
  };

  public handleShowOrder = () => {
    this.setState(
      (prevState: { modalShow: boolean }): any => {
        return {
          modalShow: !prevState.modalShow
        };
      }
    );
  };

  public handleModalClose = () => {
    this.setState({ modalShow: false });
  };

  public handleAddToBasket = () => {
    const newCount = this.props.burgerCount + 1;
    const currentBurger = this.props.ingredients;
    const currentBasket = this.props.basket;
    const newBasket = [...currentBasket, currentBurger];
    
    this.props.updateBurgerContextState({
      burgerCount: newCount,
      loading: false,
      basket: newBasket,
      isAdded: true,
    });

    this.handleModalClose();
  }

  public handlePurchase = () => {
    // TODO: move this to Checkout step where purchase able
    // const order = {
    //   ingredients: this.props.ingredients,
    //   price: this.props.orderPrice,
    //   customer: {
    //     name: "Jan Kowalski",
    //     address: {
    //       street: "test1",
    //       zipCode: "2132",
    //       country: "Poland"
    //     }
    //   },
    //   deliveryMethod: "fast"
    // };
    // console.log("Purchase done");
    // this.setState({
    //   loading: true,
    //   isPurchased: true
    // });

    // axiosServices.post("/order.json", order)
    //   .then(response => {
    //     this.setState({
    //       loading: false,
    //       modalShow: false,
    //     })
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     this.setState({
    //       loading: false,
    //       modalShow: false,
    //     })
    //   });
    console.log('%c log BA: handlePurchase $$$$ ', 'background: orange;');
    this.handleModalClose();
  };

  public render() {
    const {ingredients, orderPrice } = this.props;
    let orderSummary;
    let burgerLayout;
    console.log('%c log BA: ', 'background: orange;', this.props);

    if (!this.props.loading
        && Object.keys(this.props.ingredients).length
      ) {
      console.log('---------------',this.state);
      burgerLayout = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredients={this.props.ingredients}
            ingredientPrices={this.props.ingredientPrices}
            orderPrice={this.props.orderPrice}
            addIngredients={this.handleAddIngredients}
            removeIngredients={this.handleRemoveIngredients}
            handleShowOrder={this.handleShowOrder}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          orderPrice={this.props.orderPrice}
          handleModalClose={this.handleModalClose}
          handlePurchase={this.handlePurchase}
          handleAddToBasket={this.handleAddToBasket}
        />
      );
    }
    if (this.props.loading && !this.state.isPurchased) {
      burgerLayout = (
        <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
          <Spinner classNames={{ top: "30%", background: "orange" }} />
        </div>
      );
    }
    if (this.props.loading && this.state.isPurchased) {
      orderSummary = (
        <Spinner classNames={{ top: "30%", background: "orange" }} />
      );
    }

    if (this.state.isError) {
      return <ErrorModal
        errorMsg={this.state.errorMsg}
        modalShow={true}
        handleModalClose={this.handleModalClose}
      />
    }

    return (
      <>
        {burgerLayout}
        {
          this.props.ingredients &&
          <Checkout
              ingredients={ingredients}
              orderPrice={orderPrice}
              handlePurchase={this.handlePurchase}
          />
        }
        <Modal
          modalShow={this.state.modalShow}
          handleModalClose={this.handleModalClose}
        >
          {orderSummary}
        </Modal>
      </>
    );
  }
}
