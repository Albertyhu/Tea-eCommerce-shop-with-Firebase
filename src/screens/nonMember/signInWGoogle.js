import styled from 'styled-components'
//import { app } from '../../firebase/initializeFirebase.js'; 
import { GoogleAuthProvider, signInWithPopup, getAuth  } from 'firebase/auth'

const auth = getAuth(); 

const SignInWGoogle = props => {
    const SignIn = () => {
        var provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(re => {
                console.log(re)
            })
            .catch((err) => {
                console.log("Google Sign In Error: " + err)
            })
    }


    return (
        <ButtonCont>
            <GoogleButton onClick={SignIn}>Sign In with Google</GoogleButton>
        </ButtonCont>
        )
}

export default SignInWGoogle; 

const ButtonCont = styled.div`
    margin-left: auto;
    margin-right: auto;
    text-align: center; 
    width: 100%;
    height: 40px;
    border-radius: 2px;
    background-color: $white;
    cursor: pointer; 
`
const GoogleButton = styled.div`
    margin-left: auto;
    margin-right: auto;
  width: 184px;
  height: 42px;
  background-color: $google-blue;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,.25);
  font-family: Roboto; 
  &:hover {
    box-shadow: 0 0 6px $google-blue;
  }
  &:active {
    background: $button-active-blue;
    transform: translate(4px, 4px)
  }
`