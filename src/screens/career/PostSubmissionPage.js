import React, { useState, useCallback, useEffect, useContext } from 'react';
import PageTemplate from '../../PageTemplate.js';
import { PageTemplateContext } from '../../components/pageTemplateContext.js';
import { SecondInnerCont } from '../../style/globalStyledComp.js'
import styled from 'styled-components';
import { WhiteButton } from '../../style/styledButton.js';
import { useNavigate } from 'react-router-dom';

const PostSubmissionPage = props => {
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

export default PostSubmissionPage;

const MainContent = props => {
    const { makePageAuto, makePageInherit, getProductID } = useContext(PageTemplateContext);

    const navigate = useNavigate();
    const goHome = useCallback(() => navigate('../tea-eCommerce-shop', {})[navigate])

    makePageInherit();

    return (
        <SecondInnerCont>
            <h2>Thank you for submitting your resume.</h2>
            <Block>Our staff will review your qualifications and will give you feedback soon.</Block>
            <WhiteButton onClick={goHome} id="CareerPageSubmit">Go Home</WhiteButton>
        </SecondInnerCont>
    )

}

const Block = styled.div`
width: 50%;
margin-left: auto;
margin-right: auto;
text-align: center;
`