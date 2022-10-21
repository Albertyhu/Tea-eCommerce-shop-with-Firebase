import React, { useEffect, useState, useCallback, useContext } from 'react';
import '../product.css'; 
import '../../../style/button.css'; 
import { useLocation, useNavigate } from 'react-router-dom';
import ImagePanel from './imagePanel.js'; 
import TextPanel from './textPanel.js'; 
import { MainSection } from './profileStyledComp.js';
import CTAPanel from './CTApanel.js'
import { TeaData } from '../../../components/teaData.js'; 
import { SecondInnerCont} from '../../../style/globalStyledComp.js';
import PageTemplate from '../../../PageTemplate.js'; 
import { PageTemplateContext } from '../../../components/pageTemplateContext.js'; 
import { MyContext } from '../../../components/contextItem.js';
import styled from 'styled-components'; 
import ReviewPanel from './reviewPanel.js'; 

const ProductProfile = props => {

    const {
        openHamburger,
        openPanel,
        accountPanel,
        addProductMessage,
    } = props;
    const location = useLocation(); 
    const {
        id,
    } = location.state;

    const { getProductReviewCol } = useContext(MyContext)


    return (<PageTemplate MainContent={MainContent}
        openHamburger={openHamburger}
        openPanel={openPanel}
        accountPanel={accountPanel}
        addProductMessage={addProductMessage}
        ProductProfileID={id}
        data={getProductReviewCol()}
    />)
}

const MainContent = props => {

    const navigate = useNavigate();
    const goHome = useCallback(() => navigate('../tea-eCommerce-shop', { replace: true }), [navigate]);

    const { ProductProfileID, getProductID, makePageAuto, makePageInherit, getData } = useContext(PageTemplateContext)

    //Acquire reviews of all products 
    const review = getData();
    const [productID, setProductID] = useState(getProductID());
    const [product, setProduct] = useState(TeaData.find(val => val.ID === productID))
    const [renderMessage, setMessage] = useState('')
    useEffect(() => {
        var item = TeaData.find(val => val.ID === productID)
        setProduct(item)
    }, [productID])

    const handleMessage = val => {
        setMessage(val)
    }

    const changeHeight = () => {
        console.log('window.innerWidth: ' + window.innerWidth)
        if (window.innerWidth <= 540) {
            makePageAuto();
        }
        else {
            makePageInherit()
        }
    }

    useEffect(() => {
        if (review) {
            makePageAuto();
        }
    }, [review])


    useEffect(() => {
       
        setProductID(ProductProfileID)
    }, [ProductProfileID])
  
    return (
        <SecondInnerCont>
            {product ?
                <ThirdInnerContainer>
                <UpperSection>
                    {product.imageArray.length > 0 ?
                        <ImagePanel imageArray={product.imageArray} initial={product.image} />
                        :
                        null
                    }
                    <TextPanel name={product.name}
                        description={product.description}
                        price={product.price}
                        amount={product.amount}
                        weight={product.weight}
                        width={product.width}
                        length={product.length}
                        height={product.height}
                        ratingCount={product.ratingCount}
                        ratingAvg={product.ratingAvg}
                    />
                    <CTAPanel price={product.price}
                    productID={productID}
                        shippingDays={product.shippingDays}
                        setMessage={handleMessage}
                    />
                    </UpperSection>
                    <ReviewSection>
                        {review ? <ReviewPanel
                            data={review}
                            productID={productID}
                        />
                            :
                            null
                        }
                    </ReviewSection>
                </ThirdInnerContainer>
                :
                null
                }
        </SecondInnerCont>
        )
}

export default ProductProfile; 

const ThirdInnerContainer = styled.div`
`

const UpperSection = styled.div`
    display: flex;
    width: 100%; 
    height: 100%;
@media screen and (max-width: 540px){
    display: contents;
}
`
const ReviewSection = styled.div``