import React from "react";
import styled from '@emotion/styled';
import Logo from "../../shared/Logo/Logo"

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

const toolbar = (props: Props) => (
    <HEADER>
        <div>MENU</div>
        <div className="logo"><Logo /></div>
        <nav>...</nav>
    </HEADER>
)

export default toolbar;
