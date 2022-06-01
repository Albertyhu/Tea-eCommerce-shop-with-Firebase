import styled from 'styled-components'

export const HeaderTagLine = styled.div`
    color: #ffffff; 
    margin-top: auto;
    margin-bottom: auto;
    align-self: center; 
`

export const SecHeadBarCont = styled.div`
    background-color: #000000; 
    width: 100%; 
    height: 40px;
    justify-content: center; 
    vertical-align: middle; 
    display: flex;
    text-align: center;

   @media screen and (max-width: 540px) {
    display: block;
}
  @media screen and (max-width: 280px) {
    height: 80px;
}
`
export const NonMemberTag = styled.div`
    color: #ffffff; 
    margin-top: auto;
    margin-bottom: auto;
    text-decoration: none;
    position: absolute;
    right: 20px;
    top: 10px;
   @media screen and (max-width: 540px) {
    position: relative;
    text-align: center;
    right: auto;
    top: auto;
}

  @media screen and (max-width: 280px) {
    margin-top: 10px;
}
`
export const MemberTag = styled.div`
    color: #ffffff; 
    margin-top: auto;
    margin-bottom: auto;
    text-decoration: none;
    position: absolute;
    right: 20px;
    top: 10px;
    display: flex;
    cursor: pointer; 
   @media screen and (max-width: 540px) {
    position: relative;
    text-align: center;
    right: auto;
    top: auto;
}

  @media screen and (max-width: 280px) {
    margin-top: 10px;
}
`

export const WelcomeTag = styled.div`
    color: #ffffff; 
    margin-top: auto;
    margin-bottom: auto;
    text-decoration: none;
    position: absolute;
    left: 20px;
    top: 10px;
    display: flex;
   @media screen and (max-width: 540px) {
    position: relative;
    text-align: center;
    right: auto;
    top: auto;
}

  @media screen and (max-width: 280px) {
    margin-top: 10px;
}
`