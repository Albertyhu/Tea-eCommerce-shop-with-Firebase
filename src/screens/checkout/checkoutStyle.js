import styled from 'styled-components';

export const MainContainer = styled.div`
    width: 100%;
    height: 100vh;
    text-align: center;
    background-image: none;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #ffffff;
    font-family: serif;
   /* margin-top: 210px; */
`

export const InnerContainer = styled.div`
    top: 0px;
    width: 100%;
    height: inherit;
    background-color: rgba(255,255,255, 1);
`
export const OuterShell = styled.div`
    display: flex;
@media screen and (max-width: 540px){
    display: block;
}
`

export const Shell = styled.div`
    font-family: inherit;
    border: 1px solid rgba(0,0,0, 0.3); 
    border-radius: 10px; 
    margin-left: 10px;
    margin-right: 10px;
    width: 80%;
    &#rightPanel{
        width: 20%;
    }
@media screen and (max-width: 540px){
    width: 95%;

    &#rightPanel{
        width: 95%;
        margin-top: 20px;
    }
}
`

export const CheckOutContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 90%; 
`

export const ListItem = styled.div`
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: left;
    cursor: pointer; 
@media screen and (max-width: 540px){
    text-align: center;
}
`
export const ListDetails = styled.div`
    margin-left: auto;
    margin-right: auto;
    text-align: left; 
`

export const DetailTable = styled.table`
    text-align: left; 
    display: inline-block; 
    vertical-align: top;
 & > tr {
    margin-bottom: 20px;
    max-height: 10px;
}
 & > tr th {
    width: 200px;
}
& > tbody tr td{
   min-width: 120px;
}
@media only screen and (max-width: 540px) {
text-align: center;
    thead th:not(:first-child) {
        display: none;
    }
    & > tbody{
        text-align: center;
    }
    td, th {
        display: block; 
        text-align: center;
        margin-bottom: 10px;
        min-width: auto;
        width: auto;
        margin-left: auto;
        margin-right: auto;
    }

    td[data-th]:before  {
        content: attr(data-th);
    }
}
`

export const TH = styled.th`
line-height: 8px; 
text-align: right;
`

export const Image = styled.img`
    width: 200px;
    height: 200px; 
  //  margin-left: auto;
    margin-right: 10px;
    display: inline-block; 

`
export const Title = styled.h2`

`
export const SalesPrice = styled.div`
    color: #D19C4C;
    font-size: 30px; 
    display: inline-block;
    margin-left: 10px;
`

export const SecondaryLinks = styled.span`
    color: #a1a1a1; 
    cursor: pointer; 
    &:hover{
    text-decoration: underline; 
}
    &:active{
        color: #6d6d6d; 
        text-decoration: none; 
}


`
export const TDseparator = styled.td`
    border-left: 1px solid #a1a1a1; 
    width: 100px;
    padding: auto;
    text-align: center;
@media screen and (max-width: 540px){
        border: none;
        margin-top: 10px;
}
`
export const ContinueButton = styled.div``

export const LoadingContainer = styled.div`
        position: fixed;
        top: 50%;
        left: 50%;

`