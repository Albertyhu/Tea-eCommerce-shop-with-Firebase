import React, {useEffect} from 'react'

import styled from 'styled-components'
const RenderStockSelection = props => {
    const {
        handleStockChange,
        quantity,
        customQuan,
        setQuan,
        displayCustomStock,
        handleCustomStock,
        handleCustomSubmit,
        setDisplayCustomStock,
    } = props 
    
    const initialQuan = customQuan <= 10 ? quantity : customQuan; 

    useEffect(() => {
        if (quantity > 10) {
            setQuan(quantity)
        }
    }, [])

    useEffect(() => {
        if (quantity === "custom") {
            setDisplayCustomStock(true)
        }
        else {
            setDisplayCustomStock(false)
        }
    }, [quantity])

    return (
        <div>
           {!displayCustomStock ?
            <StockSelection>
                    <StockSelectionElement onChange={handleStockChange} value={quantity}>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    {quantity > 10 ? <option>{quantity}</option> : null}
                    <option>custom</option>
                </StockSelectionElement >
            </StockSelection>
            :
                <CustomStock>
                    <CustomStockInput onChange={handleCustomStock} value={customQuan} />
                    <GreenButton onClick={handleCustomSubmit}>Update</GreenButton>
                </CustomStock>
            }
        </div>
        )
}

export default RenderStockSelection; 

export const StockSelection = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    align-self: center;
    text-align: center;
    margin-top:5px;
    margin-bottom: 5px;


`

export const StockSelectionElement = styled.select`
margin-left: auto;
margin-right: auto;
display: block;
border-radius: 10px; 
border: none;
outline: none;
background-color: #cbcbcb;
padding: 5px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`



export const CustomStockInput = styled.input`
width: 100px; 
display: inline-block;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
margin-right: 20px;
padding: 10px;
`

export const CustomStock = styled.div`
display: flex; 
width: 100%;
height: 40px;
max-height: 40px;
margin-left: auto;
margin-right: auto;
text-align: center;
margin-top: 10px;
`

export const DarkGreenButton = styled.div`
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    padding: 5px;   
    max-width: 60px;
    background-color: #25963E;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
    text-decoration: none;
    user-select: none;
    border: none;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
&:active{
    background-color: #b8b8b8;
    transform: translate(4px, 4px)
}
`

export const GreenButton = styled.div`
    margin-left: auto;
    margin-right: 30px;
    margin-top: auto; 
    margin-bottom: auto;
    border-radius: 15px;
    padding: 10px;
    background-color: #10C135;
    max-width: 60px;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
    text-decoration: none;
    user-select: none;
    border: none;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

&:active{
    background-color: #b8b8b8;
    transform: translate(4px, 4px)
}
`