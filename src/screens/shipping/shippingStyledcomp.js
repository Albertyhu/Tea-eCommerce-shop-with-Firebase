import styled from 'styled-components';

export const Container = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto; 
    margin-bottom: 60px;
`

export const InnerContainer = styled.div`
    width: 100; 
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 10px;
        margin-left: auto;
    margin-right: auto; 
`

export const Title = styled.h2``

export const Subtitle = styled.h3`
text-align: left;
`

export const InputField = styled.div`
    width: 90%; 
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto; 
`

export const SubCont = styled.div`
    display: flex; 
    width: 100%; 
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between; 
   & > div{
    width: 23%;
}
   & > div#stateContainer{
   
   }

@media screen and (max-width: 540px){
    display: block;
    & > div, div#stateContainer{
     width: 90%;
    }
}

`

export const Input = styled.input`
width: 100%; 
border-radius: 10px;
padding-left: 10px;
padding-right: 10px;
@media screen and (max-width: 540px){
    padding-left: 5px;
    padding-right: 5px;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
}
`

export const Select = styled.select`
margin-left: auto;
margin-right: auto;
display: block;
border-radius: 10px; 
border: none;
outline: none;
background-color: #cbcbcb;
padding-left: 10px;
padding-right: 10px;
padding-top: 3px;
padding-bottom: 3px;
width: 100%;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
@media screen and (max-width: 540px){
    width: 94%;
}
`