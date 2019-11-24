import React, {useState, useEffect, useCallback, useReducer, useContext} from "react";
import Burger from "../../component/Burger/Burger";
import BuildControls from "../../component/Burger/BuildControls/BuildControls";
import Modal from "../../component/shared/Modal/Modal";
import OrderSummary from "../../component/Burger/OrderSummery/OrderSummery";
import axiosServices from "../../services/shared/axios-service";
import Spinner from "../../component/shared/Spinner/Spinner"
import ErrorModal from "../../Handlers/Errors/ErrorModal";
import Checkout from "../../component/Checkout/Checkout"
import BurgersContext from "./../../context/BurgersContext";

const BurgersBuilder = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [isPurchased, setIsPurchased] = useState(false); 
    const [isError, setIsError] = useState(); 
    const [errorMsg, setErrorMsg] = useState();
    const burgerContext = useContext(BurgersContext);
    const {ingredients, orderPrice, initialPrice, ingredientPrices, updateBurgerContextState, basket} = burgerContext;
    // const state = {
    //     modalShow: false,
    //     loading: true,
    //     isPurchased: false,
    //     isError: false,
    //     errorMsg: undefined,
    // };
    let orderSummary;
    let burgerLayout;

    const handleAddIngredients = useCallback(event => {
        const label = event.currentTarget.dataset.ingredient;

        if (label && Object.keys(ingredients).length) {
            const newIngredients = { ...ingredients };
            newIngredients[label] = newIngredients[label] + 1;
            console.log('%c log BA:  newIngredients  ', 'background: yellow;',newIngredients);
            console.log('%c log BA:  ingredientPrices  ', 'background: yellow;',ingredientPrices);
            console.log('%c log BA:  initialPrice  ', 'background: yellow;',initialPrice);
            const updatePriceSum = Object.keys(newIngredients)
                .map(
                    ingKey => ingredientPrices[ingKey] * newIngredients[ingKey]
                )
                .reduce((acc, curr) => {
                    const total = acc + curr;
                    return Number(total.toFixed(2));
                }, initialPrice);

            updateBurgerContextState({
                ingredients: newIngredients,
                orderPrice: updatePriceSum
            });
        }
    }, [ingredients]);

    const handleRemoveIngredients = useCallback(event => {
        const label = event.currentTarget.dataset.ingredient;
        if (label && Object.keys(ingredients).length) {
            const newIngredients = { ...ingredients };
            newIngredients[label] = ingredients[label] - 1;

            if (ingredients[label]) {
            const updatePriceSum = Object.keys(newIngredients)
                .map( ingKey =>
                  ingredientPrices[ingKey] * newIngredients[ingKey]
                )
                .reduce((acc, curr) => {
                  const total = acc + curr;
                  return Number(total.toFixed(2));
                }, initialPrice);

              updateBurgerContextState({
                  ingredients: newIngredients,
                  orderPrice: updatePriceSum
              });
            }
        }
    }, [ingredients]);

    const handleModalClose = useCallback(() => {
      setModalShow(false);
    }, []);

    const handleModalOpen = useCallback(() => {
      setModalShow(true);
    }, []);

    const handleAddToBasket = useCallback(() => {
        const currentBurger = ingredients;
        const currentBasket = basket;
        const newBasket = [...currentBasket, currentBurger];
        console.log('%c log BA: handleAddToBasket ingredients $$$$ ', 'background: red;', ingredients);
        const order = {
          ingredients: ingredients,
          price: orderPrice,
          customer: {
              name: "Jan",
              surname: "Kowalski",
              email: "testotest@net.com",
          },
          deliveryMethod: "fast"
        };
        console.log('%c log BA: handleAddToBasket order $$$$ ', 'background: orange;', order);
        axiosServices.post("/order.json", order)
            .then(response => {
                setModalShow(false);
            })
            .catch(error => {
                console.error(error);
                setModalShow(false);
            });

          updateBurgerContextState({
              loading: false,
              basket: newBasket,
              isAdded: true,
          });

        handleModalClose();
    }, [ingredients,basket]);

    const handlePurchase = useCallback(() => {
        // TODO: move this to Checkout step where purchase able
        // const order = {
        //   ingredients: this.ingredients,
        //   price: this.orderPrice,
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
        handleModalClose();
    }, []);

    console.log('%c log BA: BurgerContext $$$$ ', 'background: orange;', burgerContext);
    if (!burgerContext.loading
        && Object.keys(ingredients).length
      ) {
      burgerLayout = (
        <>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredients={ingredients}
            ingredientPrices={ingredientPrices}
            orderPrice={orderPrice}
            addIngredients={handleAddIngredients}
            removeIngredients={handleRemoveIngredients}
            showOrder={handleModalOpen}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          orderPrice={orderPrice}
          handleModalClose={handleModalClose}
          handlePurchase={handlePurchase}
          handleAddToBasket={handleAddToBasket}
        />
      );
    }
    if (burgerContext.loading && !isPurchased) {
      burgerLayout = (
        <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
          <Spinner classNames={{ top: "30%", background: "orange" }} />
        </div>
      );
    }
    if (burgerContext.loading && isPurchased) {
      orderSummary = (
        <Spinner classNames={{ top: "30%", background: "orange" }} />
      );
    }

    if (isError) {
      return <ErrorModal
        errorMsg={errorMsg}
        modalShow={true}
        handleModalClose={handleModalClose}
      />
    }

    return (
      <>
        {burgerLayout}
        {
          ingredients &&
          <Checkout
              ingredients={ingredients}
              orderPrice={orderPrice}
              handlePurchase={handlePurchase}
          />
        }
        <Modal
          modalShow={modalShow}
          handleModalClose={handleModalClose}
        >
          {orderSummary}
        </Modal>
      </>
    );
}

export default BurgersBuilder;