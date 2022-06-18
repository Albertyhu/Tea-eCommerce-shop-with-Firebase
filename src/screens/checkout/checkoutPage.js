import React, { useEffect, useState, useCallback } from 'react'; 
import { TeaData } from '../../components/teaData.js'; 
import { RenderSubtotal } from '../../components/renderTotal.js';
import {
    Title,
    CheckOutContainer,
    Shell, 
    OuterShell,
    LoadingContainer
} from './checkoutStyle.js'; 
import { TanButton, BrownButton } from '../../style/styledButton.js';
import { MyContext } from '../../components/contextItem.js'; 
import { useNavigate, Link } from 'react-router-dom'; 
import RenderList from './renderList.js'; 
import uuid from 'react-uuid'; 
import { SecondInnerCont } from '../../style/globalStyledComp.js'
import PageTemplate from '../../PageTemplate.js'; 
import { PageTemplateContext } from '../../components/pageTemplateContext.js'; 
//requires props for data, submitEvent, title
import { RenderAddress } from '../account/accountPage.js';
import RenderShippingForm from '../shipping/shippingForm.js';
import styled from 'styled-components'
import { PaymentElement, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './stripe.css';
import axios from 'axios'; 
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";

//displays shipping information
//displays order summary 
//displays Stripe 
//displays list of items in cart and allows ability to change quantity

const RenderCheckout = props => {
    const {cart, openHamburger, openPanel, accountPanel, addProductMessage, message} = props;
    const [innerContHeight, setInnerContHeight] = useState("inherit")
    useEffect(() => {
        if (cart.length > 1) {
            setInnerContHeight("auto")
        }
        else {
            setInnerContHeight("inherit")
        }
    }, [cart])

    return (<PageTemplate MainContent={MainContent}
        openHamburger={openHamburger}
        openPanel={openPanel}
        accountPanel={accountPanel}
        addProductMessage={addProductMessage}
        message={message}
        heightType={innerContHeight}
        cart={cart}
    />)

}

const MainContent = props => {
    const { cart, changeHeight } = props; 
    const { getShippingAdd,
        setShippingAdd,
        getBillingAdd,
        setBillingAdd,
        setNewOrder,
        clearCart, 
    } = React.useContext(MyContext); 
    const [ checkoutList, setCheckout] = useState(null)
    const [editShipping, setEditShipping] = useState(false)
    const [editBilling, setEditBilling] = useState(false)
    const { makePageAuto } = React.useContext(PageTemplateContext)
    const [processingIndicator, setProcessingInd] = useState(false); 
    const [finalCost, ck_setFinalCost] = useState(0)

    const loadData = () => {
        if (cart) {
            var newArr = []
            cart.forEach(item => {
                var obj = TeaData.find(val => val.ID === item.ID)
                var checkoutItem = {
                    ID: obj.ID,
                    name: obj.name, 
                    description: obj.description,
                    price: obj.price,
                    amount: obj.amount,
                    image: obj.image,
                    imageArray: obj.imageArray, 
                    weight: obj.weight, 
                    width: obj.width,
                    length: obj.length,
                    height: obj.height,
                    shippingDays: obj.shippingDays, 
                    stock: item.stock, 
                }
                newArr.push(checkoutItem)
            })
            setCheckout(newArr)
        }
    }

    const refreshList = () => {
        setCheckout(null)
        loadData()
    }

    const removeItem = prodID => {
        var arr = checkoutList.filter(val => val.ID !== prodID)
        setCheckout(arr)
    }
    const navigate = useNavigate();
    const goProductPage = useCallback(() => navigate('../product_page',
        { replace: true }), [navigate]) 

    useEffect(() => {
        loadData();
        return () => {setCheckout(null)}
    }, [])

    useEffect(() => {
        if (cart !== null && cart.length !== 0)
            makePageAuto()
    }, [cart])

    const OpenEditShippingDiv = () => {

        setEditShipping(true)

    }

    const UpdateShipping = newAdd => {
        setShippingAdd(newAdd)
        setEditShipping(false)
    }

    const OpenEditBillingDiv = () => {

        setEditBilling(true)

    }

    const UpdateBilling = newAdd => {
        setBillingAdd(newAdd)
        setEditBilling(false)
    }

    const goOrderCompletePage = useCallback(() => navigate('../order_summary', {replace: true}), [navigate])

    const confirmShipping = async (e) => {
        var shipping = getShippingAdd() 
        var isValid = true; 
        var errMessage = "Please, correct the following issues. \n "; 
        if (shipping.address1 === "") {
            errMessage += "Please, write your address on Address Line 1."; 
            isValid = false; 
        }
        if (shipping.city === "") {
            errMessage += "Please, write down your city.";
            isValid = false;
        }
        if (shipping.zipcode === "") {
            errMessage += "Please, write down your zipcode";
            isValid = false;
        }

 
        if (isValid) {
           await confirmOrder(e)
        }
        else {
            alert(errMessage)
        }

    };

    const stripe = useStripe();
    const elements = useElements();
    const confirmOrder = async (e) => {
        e.preventDefault(); 
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        var shippingData = getShippingAdd(); 
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                address: {
                    line1: `${shippingData.address1}`, 
                    line2: `${shippingData.address2}`, 
                    city: `${shippingData.city}`,
                    state: `${shippingData.state}`,
                    postal_code: `${shippingData.zipcode}`, 
                    country: `${shippingData.country}`,
                },
                email: "",
                name: "",
                phone: "", 
            },
        })

        if (!error) {
            try {
                const { id } = paymentMethod;
                const amount_to_charge = (finalCost * 100).toFixed(0);
                var dateObj = new Date();
                var newOrder = {
                    orderID: id,
                    cart,
                    amountPaid: finalCost,
                    orderDate: dateObj,
                }

                const response = await axios.post("http://localhost:4000/payment", {
                    amount: amount_to_charge,
                    id,
                }).then(setProcessingInd(true))

                if (response.data.success) {
                    setProcessingInd(false);
                    setNewOrder(newOrder);
                    goOrderCompletePage();
                    clearCart(); 
                }
            } catch (e) { console.log("[ERROR]" + e) }
        }
        else {
            console.log(error.message)
        }

    }

    return (
        <SecondInnerCont opacityVal={processingIndicator ? 0.3 : 1.0 }>
            <h1>Checkout</h1>
            {checkoutList !== null && checkoutList.length !== 0 ?
                <OuterShell id = "checkout_outershell">
                    <Shell>
                        {!editShipping ?
                            <RenderAddress
                                data={getShippingAdd()}
                                submitEvent={OpenEditShippingDiv}
                                title="Shipping Address" />
                            :
                            <RenderShippingForm initialData={getShippingAdd()}
                                submitEvent={UpdateShipping}
                                title="Update Shipping Address" />
                        }
                        {!editBilling ? 
                            <RenderAddress
                                data={getBillingAdd()}
                                submitEvent={OpenEditBillingDiv}
                                title="Billing Address" />
                            :
                            <RenderShippingForm
                                initialData={getBillingAdd()}
                                submitEvent={UpdateBilling}
                                title="Update Billing Address" />
                        }
                    </Shell >
                    <Shell id = "rightPanel">
                            <CheckOutContainer>
                            <TanButton id="ContinueButton" onClick={(e) => confirmShipping(e)}>Place Order</TanButton>
                            <TermsAndCondStatement />
                            <RenderSubtotal shippingFee={5.99}
                                salesTax={7.75}
                                ck_setFinalCost={ck_setFinalCost}
                                isCheckout={true}
                            />
                            <h2>Card</h2>
                            <CardElement className="card" options={CARD_OPTIONS}  />
                            </CheckOutContainer>
                    </Shell>
                    {processingIndicator ?
                        <LoadingContainer>
                            <Bounce />
                        </LoadingContainer>
                        :
                        null
                            } 
                </OuterShell>
                :
            <Title>There are currently no items in your cart.</Title>
            }

        </SecondInnerCont>
        )
}

export default RenderCheckout; 


const RenderCheck = props => {

    const { checkoutList, refreshList, removeItem } = props
    return (
        <CheckOutContainer>
            {checkoutList.map(itm => <RenderList {...itm}
                key={uuid()}
                refreshList={refreshList}
                removeItem={removeItem}
            />)}
        </CheckOutContainer>
    )
}

const TermsAndCondStatement = () => {
return(<Terms>By placing this order, you agree to Earth Tone's <Link to="/privacy_policy" target="_blank">privacy policy</Link>.</Terms>)
}

const Terms = styled.div`
color: #575757; 
text-align: center; 
`

const CARD_OPTIONS = {
    iconStyle: "solid",
    /*added */
    hidePostalCode: true,
    style: {
        base: {
            border: "1px solid rgba(0,0,0,05)",
            borderRadius: "15px",
            iconColor: "#c4f0ff",
            color: "#000",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}
