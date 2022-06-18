import React, {useState, useContext, useEffect} from 'react'
import { MyContext } from './contextItem.js'; 
import styled from 'styled-components'; 

export const RenderSubtotal= props => {
    const { calculateTotalCost, calculateTotalItems, cart } = useContext(MyContext); 
    const [totalItems, setTotalItems] = useState(calculateTotalItems())
    const [subtotal, setSubtotal] = useState(calculateTotalCost()); 

    //isCheckout determines whether the prices to be displayed is at the shopping cart or at checkout
    //This is a necessary prop to render this component
    const { changeTotal, shippingFee, salesTax, ck_setFinalCost, isCheckout, toggle } = props; 
    const [totalBeforeTax, setTotalBeforeTax] = useState(0);
    const [estimatedTaxes, setEstimatedTaxes] = useState(0)
    const [finalCost, setFinalCost] = useState(0)
    
    const recalculate = () => {
        setTotalItems(calculateTotalItems())
        setSubtotal(calculateTotalCost())
    }
    const CalcuateSalesTax = () => {
        if (salesTax !== null && totalBeforeTax !== null) {
            setFinalCost(totalBeforeTax * (1.0 + salesTax))
        }
    }

    useEffect(() => {
        recalculate(); 
    }, [changeTotal])

    useEffect(() => {
        if (shippingFee !== null && salesTax !== null) {
            setTotalBeforeTax(subtotal + shippingFee)
        }
    }, [shippingFee, salesTax])

    useEffect(() => {
        if (salesTax !== null) {
            setEstimatedTaxes(totalBeforeTax * (salesTax/100))
        }
    }, [totalBeforeTax])

    useEffect(() => {
        if (isCheckout) {
            var total = totalBeforeTax + estimatedTaxes;
            setFinalCost(total)
            ck_setFinalCost(total)
        }
    }, [estimatedTaxes])

    useEffect(() => {
        console.log("recalculate")
        recalculate()
    }, [cart])

    return (
        <Container>
            <Detail><b>Total items:</b> {totalItems}</Detail>
            {isCheckout ? 
                <div>
                    <Block>
                        <Detail><b>Subtotal: </b>${subtotal.toFixed(2)}</Detail>
                        <Detail id="shippingFeeInfo"><b>Shipping and handling: </b><span>${shippingFee.toFixed(2) || null}</span></Detail>
                    </Block>
                    <Block>
                        <Detail><b>Subtotal before taxes: </b>${totalBeforeTax.toFixed(2) || null}</Detail>
                        <Detail id="taxInfo"><b>Estimated taxes to be collected: </b>${estimatedTaxes.toFixed(2) || null}</Detail>
                    </Block>
                    <Block>
                        <Detail><b>Total Cost: </b>${finalCost.toFixed(2) || null}</Detail>
                    </Block>
                </div>
                :
                <Detail><b>Subtotal before shipping and tax:</b> ${subtotal.toFixed(2)}</Detail> 
                }
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
}
&#taxInfo{
    border-bottom: 1px solid rgba(0,0,0, 0.4);
}
`
const Block = styled.div`
margin-top: 10px;
margin-bottom: 10px;
`