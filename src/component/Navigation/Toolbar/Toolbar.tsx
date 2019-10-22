import React from "react";
import styled from '@emotion/styled';
import Logo from "../../shared/Logo/Logo";
import {NavLink} from "react-router-dom";

interface Props {}

const HEADER = styled.header`
    height: 70px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    background: #b35938;
    padding: 10px;
    box-sizing: border-box;
    & > .logo {
        width 60px;
    }
`

const NAV = styled.nav`
    &>li {
        margin: 5px;
        list-style: none;
        display: inline-block;
    }
    &>li>a {
        color: #ffe100;
        text-decoration: none;
        text-transform: uppercase;
    }
    &>li>a.active {
        color: #ffa500;
        font-weight: 500;
        text-decoration: underline;
    }
`

const toolbar = (props: Props) => (
    <HEADER>
        <div>MENU</div>
        <div className="logo"><Logo /></div>
        <NAV>
            <li>
                <NavLink exact={true} to="/">Create Burger</NavLink>
            </li>
            <li>
                <NavLink to="/order">Order</NavLink>
            </li>
            <li>
                <NavLink to="/contact">Contact</NavLink>
            </li>
        </NAV>
    </HEADER>
)

export default toolbar;
