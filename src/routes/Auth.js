import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'myBase';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
    const onSocialClick = async (event) => {
         const provider = new firebaseInstance.auth.GoogleAuthProvider();
         await authService.signInWithPopup(provider);
    }
    return (<div>
        <AuthForm/>
        <div>
            <button onClick={onSocialClick}>Google Log in</button>
        </div>
    </div>
    )
}
export default Auth;