import React, { useState, useCallback, useEffect, useContext } from 'react';
import PageTemplate from '../../PageTemplate.js';
import { PageTemplateContext } from '../../components/pageTemplateContext.js';
import { SecondInnerCont } from '../../style/globalStyledComp.js'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const RenderSiteMap = props => {
    const {
        openHamburger,
        openPanel,
        accountPanel,
    } = props;

    return (<PageTemplate MainContent={MainContent}
        openHamburger={openHamburger}
        openPanel={openPanel}
        accountPanel={accountPanel}
    />)
}

export default RenderSiteMap;

const MainContent = props => {
    const { makePageAuto, makePageInherit, getProductID } = useContext(PageTemplateContext);



    return (
        <SecondInnerCont>
            <InnerCont>
                <h2>Site Map</h2>
                <Link style={LinkStyle} to="/tea-eCommerce-shop">Home</Link>
                <Link style={LinkStyle} to="/product_page">Product Page</Link>
                <Link style={LinkStyle} to="/privacy_policy">Privacy Policy</Link>
                <Link style={LinkStyle} to="/About_Us">About Us</Link>
                <Link style={LinkStyle} to="/About_Us">Career Page</Link>
                <Link style={LinkStyle} to="/return_and_refund_policy">Return and Refund Policy</Link>
                <Link style={LinkStyle} to="/terms_and_condition">Terms and Conditions</Link>
            </InnerCont>
        </SecondInnerCont>
    )

}

const Paragraph = styled.p`

`

const Block = styled.div`
width: 50%;
margin-left: auto;
margin-right: auto;
text-align: left;
`

const LinkStyle = {
    color: "#000000",
    textDecoration: "none",
    marginTop: "10px",
    marginBottom: "10px",
}

const InnerCont = styled.div`
    display: grid; 
`