import React, {useContext, useState} from "react";

const INIT_STATE = {
    name: "Jan",
    surname: "Kowalski",
    city: "Warsaw",
    email: "testo@test.com",
    address: "Krutka ulica 14/14",
    phone: "00111234567",
};

export const UserContext = React.createContext(INIT_STATE);

const UserContextProvider = (props) => {
    const state = INIT_STATE;

    const [name, setName] = useState(state.name);
    const [surname, setSurname] = useState(state.surname);
    const [address, setAddress] = useState(state.address);
    const [email, setEmail] = useState(state.email);
    const [city, setCity] = useState(state.city);
    const [phone, setPhone] = useState(state.phone);

    return (
        <UserContext.Provider value={{
            name,
            setName,
            surname,
            setSurname,
            address,
            setAddress,
            email,
            setEmail,
            city,
            setCity,
            phone,
            setPhone
        }}>
            { props.children }
        </UserContext.Provider>
    )
};
export default UserContextProvider;