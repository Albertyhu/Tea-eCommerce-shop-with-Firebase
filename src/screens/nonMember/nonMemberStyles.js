import styled from 'styled-components'; 
import EarthToneLogo from '../../base_elements/logo/Earth Tone-black-transparent.png'

export const InputContainer = styled.div`
    margin-top: 10px;
    display: flex;
    width: 100%;    
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.3); 
    border-radius: 10px; 
    justify-content: center; 
`

export const InputField = styled.input`
    width: 100%; 
    font-family: 'Palatino Linotype';
    border: none;
    border-radius: 20px; 
    padding-left: 10px;
    &:focus {
        border: none;
        outline: none;
    }
` 

export const InputDiv = styled.div`
    margin-left: auto; 
    margin-right: auto;
    width: 90%;
    text-align: left
    margin-top: 20px;
    margin-bottom: 20px;
`
export const SubTitle = styled.h3`
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 10px;
    white-space: no-wrap;
`
export const MainSignInContainer = styled.div`
    width: 100%;
    height: 60vh;
    text-align: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #ffffff;
    font-family: serif;
    margin-top: 220px; 
   @media screen and (max-width: 540px) {
    height: 70vh;
    margin-top: 175px; 
}
`

export const OuterShell = styled.div`
    background-image: url(${require('../../base_elements/logo/Earth Tone-black-transparent.png')}); 
    top: 0px;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    height: auto;
    align-items: center;
    align-content: center;
    font-family: inherit;
    border: 1px solid rgba(0,0,0, .3); 
    border-radius: 5px; 
    margin-bottom: 20px;

   @media screen and (max-width: 540px) {
        width: 90%;
        height: 90%;
        margin-bottom: 40px;    
}
`

export const InnerShell = styled.div`
opacity: ${props => props.loading ? 0.3 : 1.0}; 
`
export const SubmitButton = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 10px;
    background-color: #25963E;
    width: 20%;
    text-align: center;
    color: #ffffff;
    font-family: Verdana;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
    text-decoration: none;

&:active{
        background-color: #b8b8b8;
        transform: translate(4px, 4px)
}
`

export const Button2 = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 10px;
    background-color: #10C135;
    width: 20%;
    text-align: center;
    color: #ffffff;
    font-family: Verdana;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
    text-decoration: none;

&:active{
        background-color: #b8b8b8;
        transform: translate(4px, 4px)
}
`

export const ETLogoContainer = styled.div`
    width: 100%; 
    height: 300px; 
   @media screen and (max-width: 540px) {
    display: none;
}
`

export const ETLogo = styled.img`
    height: 100%;
`

export const NeedAccount = styled.h2`
   @media screen and (max-width: 390px) {
     margin-left: 15px;
        margin-right: 15px;
}
`

export const LoadingContainer = styled.div`
        position: fixed;
        top: 50%;
        left: 50%;

`