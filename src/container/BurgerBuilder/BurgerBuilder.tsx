import React from "react";
import Burger from "../../component/Burger/Burger";
import BuildControls from "../../component/Burger/BuildControls/BuildControls";
import Modal from "../../component/shared/Modal/Modal";
import OrderSummary from "../../component/Burger/OrderSummery/OrderSummery";
import axiosServices from "../../services/shared/axios-service";
import Spinner from "../../component/shared/Spinner/Spinner"
import ErrorModal from "../../Handlers/Errors/ErrorModal";

export interface IngredientsTypes {
  salad?: number;
  bacon?: number;
  cheese?: number;
  meat?: number;
  price?: number,
}
interface IngredientPrices {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
}
interface State {
  ingredients: IngredientsTypes | {};
  ingredientPrices: IngredientPrices;
  initialPrice: number;
  orderPrice: number;
  modalShow: boolean;
  loading: boolean;
  isPurchased: boolean;
  isError: boolean;
  errorMsg: string | undefined;
}

export default class BurgerBuilder extends React.Component<{}, State> {
  private isMountedComp = false;

  public state = {
    ingredients: {},
    ingredientPrices: {
      salad: 0.5,
      bacon: 0.65,
      cheese: 1,
      meat: 2.2
    },
    initialPrice: 5,
    orderPrice: 5,
    modalShow: false,
    loading: true,
    isPurchased: false,
    isError: false,
    errorMsg: undefined,
  };

  public componentDidMount(): void {
    this.isMountedComp = true;

    axiosServices.get("/ingredients.json")
      .then((response) => {
        if (this.isMountedComp) {
          this.setState({
            loading: false,
            ingredients: Object.assign({}, response.data),
          })
        }
      })
      .catch(error => {
        console.error(error)
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

  public handleAddIngredients = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
    const label = event.currentTarget.dataset.ingredient;

    if (label && Object.keys(this.state.ingredients).length) {
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
    if (label && Object.keys(this.state.ingredients).length) {
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

  public handlePurchase = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.orderPrice,
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
      isPurchased: true,
    })

    axiosServices.post("/order.json", order)
    .then(response => {
      this.setState({
        loading: false,
        modalShow: false,
      })
    })
    .catch(error => {
      console.error(error)
      this.setState({
        loading: false,
        modalShow: false,
      })
    })

    this.handleModalClose();
  };

  public render() {
    let orderSummary;
    let burgerLayout;
    
    if (!this.state.loading
        && Object.keys(this.state.ingredients).length
      ) {
      console.log('---------------',this.state)
      burgerLayout = (
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
        </>
      )
      orderSummary = (
        <OrderSummary
            ingredients={this.state.ingredients}
            orderPrice={this.state.orderPrice}
            handleModalClose={this.handleModalClose}
            handlePurchase={this.handlePurchase}
          />
      )
    }
    if (this.state.loading && !this.state.isPurchased) {
      burgerLayout = (
        <div style={{position: "relative", height: "100vh", width: "100vw" }}>
          <Spinner classNames={{top: "30%", background: "orange" }} />
          </div>
      )
    } 
    if (this.state.loading && this.state.isPurchased) {
      orderSummary = <Spinner classNames={{top: "30%", background: "orange" }} />
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
        { burgerLayout }
        <Modal
          modalShow={this.state.modalShow}
          handleModalClose={this.handleModalClose}
        >
          { orderSummary }
        </Modal>
      </>
    );
  }
}
