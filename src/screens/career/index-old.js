import React, { useState, useCallback, useEffect, useContext } from 'react';
import PageTemplate from '../../PageTemplate.js';
import { PageTemplateContext } from '../../components/pageTemplateContext.js';
import { SecondInnerCont } from '../../style/globalStyledComp.js'
import styled from 'styled-components';

const CareerPage = props => {
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

export default CareerPage;

const MainContent = props => {
    const { makePageAuto, makePageInherit, getProductID } = useContext(PageTemplateContext);

    return (
        <SecondInnerCont>
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