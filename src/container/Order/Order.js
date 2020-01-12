import React, {useState, useEffect} from "react";
import styled from "@emotion/styled";
import Burger from './../../component/Burger/Burger';
import uniqid from "uniqid";
import Spinner from "./../../component/shared/Spinner/Spinner";
import axiosServices from "./../../services/shared/axios-service";
import ErrorModal from "./../../Handlers/Errors/ErrorModal";

const ORDERDIV = styled("div")`
    position: relative;
    top: 100px;
`;

const LI = styled("li")`
    list-style: none;
    width: 30%;
    flex: 1 1;
    display: inline-block;

    &>.burger {
        height: auto;cd
    }
`;

const Order = (props) => {
    const {
        updateBurgerContextState,
    } = props;
    const [modalShow, setModalShow] = useState(true);
    const [count, setCount] = useState(0);
    const [isError,setIsError] = useState(false);
    const [loading,setLoading] = useState(true);
    const [basket,setBasket] = useState([]);
    console.log('%c log Order BA: ', 'background: orange;', props);

    useEffect(() => {
        axiosServices
            .get("/order.json")
            .then(response => {
                if (response.data) {                    
                    const savedBasket = Object.keys(response.data)
                        .map( key => {
                            return response.data[key].ingredients;
                        });

                    setBasket(savedBasket);
                    setLoading(false);
                    setCount(savedBasket.length);
                    // updateBurgerContextState({basket: savedBasket});
                }
            })
            .catch(error => {
                console.error(error);
                setIsError(true);
                setLoading(false);
            });
    }, [setIsError,setLoading,setBasket,setCount]);

    const orderList = () => {
        const list = basket.map(ingredients => {
            const keyId = uniqid('burger-');
            return <LI key={keyId}>
                <Burger ingredients={ingredients} />
            </LI>;
        });

        return (
            <ul>
                {list}
            </ul>
        )
    }

    const totalBurgersString = () => {
        let infoNode = null;
        switch(count) {
            case 0:
                infoNode = <h3>You have No burgers</h3>;
                break;
            case 1 :
                infoNode = <h3>You have 1 burger</h3>;
                break;
            default:
                infoNode = <h3>You have {count} burgers</h3>;
        }
        return infoNode;
    }

    let renderOrder = <Spinner classNames={{ top: "30%", background: "orange" }} />;
    if (!loading) {
        renderOrder = (
            <>
                {totalBurgersString()}
                {orderList()}
            </>
        );
    }

    return (
        <ORDERDIV>
            {isError && <ErrorModal
                errorMsg={"Something went wrong!"}
                modalShow={modalShow}
                handleModalClose={setModalShow(false)}
            />}
            {renderOrder}
        </ORDERDIV>
    )
};

export default Order;