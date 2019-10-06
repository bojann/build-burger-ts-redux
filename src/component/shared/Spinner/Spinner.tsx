import React from "react"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/core";

interface ClassNamesPropType {
    top?: string,
    background?: string, 
}
type ClassNamesType = {
    classNames: ClassNamesPropType,
}

const SpinAnimation= keyframes`
    {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
`
const SPINNER = styled("div")<any>`
    position: absolute;
    top: ${ (props: ClassNamesType) => props.classNames && props.classNames.top ? props.classNames.top : "initial" };
    background: ${ (props: ClassNamesType) =>  props.classNames && props.classNames.background ? props.classNames.background : "#da9c2a" };
    left: calc(50% - 50px);
    margin: 60px auto;
    font-size: 10px;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(255, 255, 255, 0.2);
    border-right: 1.1em solid rgba(255, 255, 255, 0.2);
    border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
    border-left: 1.1em solid #a96327;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: ${SpinAnimation} 1.1s infinite linear;
    animation: ${SpinAnimation} 1.1s infinite linear;
    z-index: 900;

    &, &:after {
        border-radius: 50%;
        width: 100px;
        height: 100px;
    }
`

const spinner = ({classNames}: any) => (
    <div style={{position: "relative", height: "100vh", width: "100vw" }}>
        <SPINNER classNames={classNames}>Loading...</SPINNER>
    </div>
)

export default spinner;

