import React from "react"
import BurgerSVG from "../../../assets/svg/burger_logo.svg"

import styled from "@emotion/styled"

const DIV = styled.div(
    {
        background: '#fff',
        padding: '5px',
        width: '100%',
        boxSizing: 'border-box',
    }
)

const IMG = styled.img`
    width: 100%
`

const logo = () => (
    <DIV>
        <IMG src={BurgerSVG} alt="" />
    </DIV>
)

export default logo;