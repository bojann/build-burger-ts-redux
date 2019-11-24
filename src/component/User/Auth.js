import React, { useContext, useState } from "react";
import { AuthContext } from "./../../context/AuthContext";
import Modal from "./../shared/Modal/Modal";
import CustomButton from "./../shared/CustomButton/CustomButton";
import styled from "@emotion/styled";

const FORM = styled("form")`
    &>label,&>input {
        display: block;
        padding: 5px;
        color: #3d3d3d;

    }
    h3,p {
        color: #3d3d3d;
    }
    &>input:invalid {
        border: 1px solid red;
    }
`;

const Auth = (props) => {
    const authContext = useContext(AuthContext);
    const [modalShow, setModalShow] = useState(true);
    const [formValid, setFormValid] = useState(false);
    const [] = useState();

    const handleLogin = (ev) => {
        console.log('%c log BA: Submit LOGIN $$$$ ', 'background: orange;');
        ev.preventDefault();
        authContext.login();
        setFormValid(true);
    }

    const handleModalClose = () => {
        formValid && setModalShow(false);
    }

    return (
        <Modal
          modalShow={modalShow}
          handleModalClose={handleModalClose}
          classNames="modal-signin"
        >
          <div>
                <FORM onSubmit={handleLogin}>
                    <h3>Sign in</h3>
                    <p>to be able to order burger you have to sign in.</p>
                    <label htmlFor="name">Name:</label>
                    <input id="name" type="text" autoFocus placeholder="Your name" minLength="3" />
                    <br/>
                    <label htmlFor="surname">Surname:</label>
                    <input id="surname" type="text" placeholder="Your surname" minLength="3" />
                    <br/>
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="text" placeholder="jankowalski@mail.com" minLength="8" pattern="/\w+@\w+\.[a-zA-Z]+/" />
                    <br />
                    <CustomButton btnType="btn-success" handleBtnClick={handleLogin}>Submit</CustomButton>
              </FORM>
          </div>
        </Modal>
    );
}

export default Auth;