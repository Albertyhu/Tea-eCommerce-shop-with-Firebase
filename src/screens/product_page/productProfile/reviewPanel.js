import React from 'react';
import styled from 'styled-components'; 
import RenderRatings from '../../../components/rating/renderRatings.js'; 
import { MdPersonPin } from 'react-icons/md';
import uuid from 'react-uuid'
const ReviewPanel = props => {
    const { data, productID } = props; 
    var reviews = data.filter(val => val.ID === productID); 
    return (
        <Panel>
            {reviews !== null && reviews.length != 0 ? <h3>Reviews about this product</h3> : null}
            {reviews ? reviews.map(val => <ReviewBlock
                {...val}
                key={uuid()}
            />) : null}
        </Panel>
        )

}

export default ReviewPanel;

const ReviewBlock = props => {
    const {rating, review} = props; 
    return (
        <Block>
            <MdPersonPin style={avatar} />
            <RenderRatings rating={rating} /> 
            <Text>{review}</Text>
        </Block>
        )
}

const Panel = styled.div`
width: 80%; 
margin-left: auto;
margin-right: auto; 
margin-top: 20px; 
margin-bottom: 20px; 
text-align: center;
`

const Block = styled.div`
text-align: left; 
margin-bottom: 20px; 
border-radius: 15px; 
border: 1px solid rgba(0,0,0,0.3);
padding: 10px;
`


const Text = styled.div``

const avatar = {
    width: "50px",
    height: "50px",

}