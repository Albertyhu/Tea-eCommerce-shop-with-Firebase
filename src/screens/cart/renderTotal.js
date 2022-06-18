import React, {useEffect, useState} from 'react'
import styled from 'styled-components';

export const RenderSubtotal = props => {

    const { subtotal, totalItems } = props;

    return (
        <Container>
            <Detail><b>Total items:</b> {totalItems}</Detail>
            <Detail><b>Subtotal before shipping and tax:</b> ${subtotal.toFixed(2)}</Detail>
        </Container>
    )
}

const Container = styled.div`
    margin-left: auto;
    margin-right: auto; 
    margin-bottom: 20px;
`

const Detail = styled.div`
text-align: left;
line-height: 20px;
justify-content: space-between;
display: flex;
&#shippingFeeInfo > span{
    border-bottom: 1px solid rgba(0,0,0, 0.4);

`
