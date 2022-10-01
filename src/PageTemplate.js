import React, { useEffect, useState } from 'react'; 
import Header from './base_elements/header.js';
import Footer from './base_elements/footer.js';
import RenderPanels from './components/renderPanels.js';
import RenderMessage from './screens/product_page/addProductMessage/renderMessagePanel.js';
import { PageTemplateContext } from './components/pageTemplateContext.js'; 

import {
    MainContainer,
    InnerContainer,
    Filler, 
} from './style/globalStyledComp.js'; 

//This is the template for all pages that uses the same header and footer 
//The individual page's content is rendered in the <MainContent /> tag 
const PageTemplate = props => {
    const { MainContent,
        openHamburger,
        openPanel,
        accountPanel,
        addProductMessage,
        wishlist,
        cart,
        ProductProfileID, 
        data, 
    } = props;

    const [height, setHeight] = useState("100vh")
    const [InnerContHeight, setInnerContHeight] = useState("100%");
    const [keepAuto, setKeepAuto] = useState(false)
    const [arrData, setArrData] = useState(null)
    const [message, setMessage] = useState(''); 

    //The following state component is to pass information from the page to the template. 
    const [interimData, setInterimData] = useState(null); 
    const changeHeight = change => {
        setHeight(change)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const context = {
        ProductProfileID, 
        //The following is to make sure that the footer stays in the right position by controlling the value of the height of <InnerContainer> 
        changeInnerContHeight: (val) => setInnerContHeight(val),
        setUnitForMeasure: data => { setArrData(data) },

        //makePageAuto is for screens that don't have a list but have elements that take up the full screen and can dynamically change the size of the screen.
        makePageAuto: () => {
            setInnerContHeight("auto")
        },
        makePageInherit: () => {
            setInnerContHeight("100%")
        },
        //This is pass the product ID to the Product Profile Page so that the product can be displayed on that page. 
        getProductID: () => ProductProfileID, 
        changeMessage: (mess) => {
            setMessage(mess);
        },
        getData:()=>data, 
        }

    //The following code for context and useEffect block are to help determine the value of the height of the <InnerContainer>
    //This is to prevent the footer from being positioned in the middle of the screen.
    //If there are more than one items displayed on the screen, set height of <InnerContainer> to auto
    //...so that the last product at the bottom doesn't overlap the footer. 

    return (
        <PageTemplateContext.Provider value = {context}>
        <MainContainer heightChange={height} id = "MainContainer">
                <InnerContainer heightType={InnerContHeight} id = "InnerContainer">
                <RenderPanels
                    burgerTrigger={openHamburger}
                    cartTrigger={openPanel}
                    accountTrigger={accountPanel}
                />
                <RenderMessage addProductMessage={addProductMessage} message={message} />
                <Header />
                <Filler />
                    <MainContent
                        wishlist={wishlist}
                        changeHeight={changeHeight}
                        cart={cart}
                    />
            </InnerContainer>
            <Footer />
            </MainContainer>
        </PageTemplateContext.Provider>
        )
}

export default PageTemplate; 