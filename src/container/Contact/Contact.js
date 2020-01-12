import React, {useContext} from "react";
import styled from "@emotion/styled";
import {UserContext} from "../../context/User/UserContext";

const CONTACTFORM = styled("form")`
    background: #ccc;
    margin-top: 200px;
`;
const CONTACTSPAN = styled("span")`
    display: block;
    padding: 10px;
    margin: 0 auto;
    width: 400px;

    &>label {
        width: 24%;
        display: inline-block;
        text-align: right;
        padding-right: 5px;
    }
    &>input {
        width: 70%;
    }
`;

const Contact = (props) => {
    const userContext = useContext(UserContext);
    const handleSubmit = (ev) => {
        ev.preventDefault();
        console.log("submit contact : ", ev)
    }
    console.log("USER:    ", userContext);

    const handleNameChange = (ev) => {
        userContext.setName(ev.target.value);
    }
    
    return (
        <>
            <CONTACTFORM onSubmit={handleSubmit}>
                <CONTACTSPAN>
                    <label htmlFor="name">Name:</label>
                    <input type="string" onChange={handleNameChange} id="name" value={userContext.name} />
                </CONTACTSPAN>
                <CONTACTSPAN>
                    <label htmlFor="surname">surname:</label>
                    <input type="string" onChange={userContext.setSurname} id="surname" value={userContext.surname} />
                </CONTACTSPAN>
                <CONTACTSPAN>
                    <label htmlFor="address">Address:</label>
                    <input type="string" onChange={userContext.setAddress} id="address" value={userContext.address} />
                </CONTACTSPAN>
                <CONTACTSPAN>
                    <label htmlFor="email">Email:</label>
                    <input type="string" onChange={userContext.setEmail} id="email" value={userContext.email} />
                </CONTACTSPAN>
                <CONTACTSPAN>
                    <label htmlFor="city">City:</label>
                    <input type="string" onChange={userContext.setCity} id="city" value={userContext.city} />
                </CONTACTSPAN>
                <CONTACTSPAN>
                    <label htmlFor="phone">Phone:</label>
                    <input type="string" onChange={userContext.setPhone} id="phone" value={userContext.phone} />
                </CONTACTSPAN>
            </CONTACTFORM>
        </>
    )
};

export default Contact;